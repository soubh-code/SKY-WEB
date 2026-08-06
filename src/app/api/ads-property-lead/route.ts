import { createHash, randomBytes } from "node:crypto";
import { getHostingerDbPool } from "@/lib/hostinger-db";
import type { ResultSetHeader } from "mysql2";
import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const allowedLocations = new Set([
  "Lajpat Nagar 1/2/4",
  "Lajpat Nagar 3",
  "Greater Kailash",
  "Kalkaji",
  "Defence Colony",
  "South Extension Part 1/2",
  "East Of Kailash",
  "Hauz Khas",
  "Other South Delhi Location",
]);

const allowedBudgets = new Set([
  "INR 1-2 Crore",
  "INR 2-3 Crore",
  "INR 3-5 Crore",
  "INR 5-8 Crore",
  "INR 8 Crore and above",
]);

const attributionKeys = new Set([
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
  "gclid",
  "gbraid",
  "wbraid",
]);

const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 5;
const rateLimitStore = new Map<string, number[]>();

type LeadPayload = {
  name?: unknown;
  phone?: unknown;
  budget?: unknown;
  locations?: unknown;
  website?: unknown;
  landingPageUrl?: unknown;
  attribution?: unknown;
};

type WhatsAppPayload = {
  leadId?: unknown;
  updateToken?: unknown;
};

const getClientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (key: string) => {
  const now = Date.now();
  const recentRequests = (rateLimitStore.get(key) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(key, recentRequests);

  if (rateLimitStore.size > 1000) {
    for (const [storedKey, timestamps] of rateLimitStore) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) rateLimitStore.delete(storedKey);
    }
  }

  return false;
};

const cleanText = (value: unknown, maxLength: number) =>
  typeof value === "string"
    ? value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim().slice(0, maxLength)
    : "";

const cleanUrl = (value: unknown) => {
  const candidate = cleanText(value, 2048);
  try {
    const url = new URL(candidate);
    return url.protocol === "http:" || url.protocol === "https:" ? url.toString() : "";
  } catch {
    return "";
  }
};

const hashUpdateToken = (token: string) => createHash("sha256").update(token).digest("hex");

export async function POST(request: NextRequest) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (cleanText(payload.website, 200)) {
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(`submit:${getClientIp(request)}`)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const name = cleanText(payload.name, 100);
  const phone = cleanText(payload.phone, 30).replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const budget = cleanText(payload.budget, 50);
  const locations = Array.isArray(payload.locations)
    ? [...new Set(payload.locations.filter((value): value is string => typeof value === "string" && allowedLocations.has(value)))]
    : [];
  const landingPage = cleanUrl(payload.landingPageUrl);
  const referrer = cleanUrl(request.headers.get("referer"));
  const rawAttribution = payload.attribution && typeof payload.attribution === "object"
    ? payload.attribution as Record<string, unknown>
    : {};
  const attribution = Object.fromEntries(
    Object.entries(rawAttribution).flatMap(([key, value]) => {
      const cleanedValue = cleanText(value, 500);
      return attributionKeys.has(key) && cleanedValue ? [[key, cleanedValue]] : [];
    }),
  );
  if (
    name.length < 2 ||
    !/^[6-9]\d{9}$/.test(phone) ||
    !allowedBudgets.has(budget) ||
    !locations.length
  ) {
    return NextResponse.json({ error: "Please check the submitted details." }, { status: 400 });
  }

  const updateToken = randomBytes(32).toString("hex");
  const updateTokenHash = hashUpdateToken(updateToken);

  try {
    const [result] = await getHostingerDbPool().execute<ResultSetHeader>(
      `INSERT INTO google_ads_property_leads (
        name,
        phone,
        budget,
        locations,
        gclid,
        gbraid,
        wbraid,
        utm_source,
        utm_medium,
        utm_campaign,
        utm_term,
        utm_content,
        landing_page,
        referrer,
        whatsapp_update_token_hash
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        name,
        phone,
        budget,
        JSON.stringify(locations),
        attribution.gclid || null,
        attribution.gbraid || null,
        attribution.wbraid || null,
        attribution.utm_source || null,
        attribution.utm_medium || null,
        attribution.utm_campaign || null,
        attribution.utm_term || null,
        attribution.utm_content || null,
        landingPage || null,
        referrer || null,
        updateTokenHash,
      ],
    );

    return NextResponse.json({
      ok: true,
      leadId: String(result.insertId),
      updateToken,
    });
  } catch (error) {
    console.error("Could not store Google Ads property lead in MySQL:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Lead could not be stored." }, { status: 503 });
  }
}

export async function PATCH(request: NextRequest) {
  let payload: WhatsAppPayload;
  try {
    payload = (await request.json()) as WhatsAppPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const leadId = cleanText(payload.leadId, 20);
  const updateToken = cleanText(payload.updateToken, 64);
  if (!/^\d{1,20}$/.test(leadId) || !/^[a-f0-9]{64}$/.test(updateToken)) {
    return NextResponse.json({ error: "Invalid lead." }, { status: 400 });
  }

  if (isRateLimited(`whatsapp:${getClientIp(request)}`)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  try {
    const [result] = await getHostingerDbPool().execute<ResultSetHeader>(
      `UPDATE google_ads_property_leads
       SET whatsapp_clicked = 1, whatsapp_clicked_at = CURRENT_TIMESTAMP
       WHERE id = ? AND whatsapp_update_token_hash = ?`,
      [leadId, hashUpdateToken(updateToken)],
    );

    if (result.affectedRows !== 1) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Could not mark Google Ads property lead WhatsApp click:", error instanceof Error ? error.message : "Unknown error");
    return NextResponse.json({ error: "Lead could not be updated." }, { status: 503 });
  }
}
