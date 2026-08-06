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

const escapeHtml = (value: string) =>
  value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    };
    return entities[character];
  });

const getClientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

const isRateLimited = (ip: string) => {
  const now = Date.now();
  const recentRequests = (rateLimitStore.get(ip) ?? []).filter((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS);

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, recentRequests);
    return true;
  }

  recentRequests.push(now);
  rateLimitStore.set(ip, recentRequests);

  if (rateLimitStore.size > 1000) {
    for (const [key, timestamps] of rateLimitStore) {
      if (!timestamps.some((timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS)) rateLimitStore.delete(key);
    }
  }

  return false;
};

export async function POST(request: NextRequest) {
  let payload: LeadPayload;
  try {
    payload = (await request.json()) as LeadPayload;
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  if (typeof payload.website === "string" && payload.website.trim()) {
    return NextResponse.json({ ok: true });
  }

  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ error: "Too many requests. Please try again later." }, { status: 429 });
  }

  const name = typeof payload.name === "string" ? payload.name.trim().slice(0, 100) : "";
  const rawPhone = typeof payload.phone === "string" ? payload.phone : "";
  const phone = rawPhone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");
  const budget = typeof payload.budget === "string" ? payload.budget : "";
  const locations = Array.isArray(payload.locations)
    ? [...new Set(payload.locations.filter((value): value is string => typeof value === "string" && allowedLocations.has(value)))]
    : [];
  const landingPageUrl = typeof payload.landingPageUrl === "string" ? payload.landingPageUrl.slice(0, 2048) : "";
  const rawAttribution = payload.attribution && typeof payload.attribution === "object"
    ? payload.attribution as Record<string, unknown>
    : {};
  const attribution = Object.fromEntries(
    Object.entries(rawAttribution).flatMap(([key, value]) =>
      attributionKeys.has(key) && typeof value === "string" && value.trim()
        ? [[key, value.trim().slice(0, 500)]]
        : [],
    ),
  );

  if (name.length < 2 || !/^[6-9]\d{9}$/.test(phone) || !allowedBudgets.has(budget) || !locations.length) {
    return NextResponse.json({ error: "Please check the submitted details." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const recipient = process.env.ADS_LEAD_NOTIFICATION_EMAIL;
  const sender = process.env.RESEND_FROM_EMAIL;
  if (!apiKey || !recipient || !sender) {
    console.error("Ads property lead email environment variables are not configured.");
    return NextResponse.json({ error: "Lead service is unavailable." }, { status: 503 });
  }

  const submittedAt = new Date().toISOString();
  const attributionRows = Object.entries(attribution)
    .map(([key, value]) => `<tr><td style="padding:6px 12px 6px 0"><strong>${escapeHtml(key)}</strong></td><td>${escapeHtml(value)}</td></tr>`)
    .join("");

  const emailResponse = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: sender,
      to: [recipient],
      subject: "New Google Ads property enquiry",
      html: `
        <div style="font-family:Arial,sans-serif;color:#182433;line-height:1.5">
          <h1 style="color:#08111f">New Google Ads property enquiry</h1>
          <table style="border-collapse:collapse">
            <tr><td style="padding:6px 12px 6px 0"><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0"><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0"><strong>Budget</strong></td><td>${escapeHtml(budget)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0"><strong>Locations</strong></td><td>${escapeHtml(locations.join(", "))}</td></tr>
            <tr><td style="padding:6px 12px 6px 0"><strong>Submitted</strong></td><td>${escapeHtml(submittedAt)}</td></tr>
            <tr><td style="padding:6px 12px 6px 0"><strong>Landing page</strong></td><td>${escapeHtml(landingPageUrl)}</td></tr>
            ${attributionRows}
          </table>
        </div>
      `,
      text: [
        "New Google Ads property enquiry",
        `Name: ${name}`,
        `Phone: ${phone}`,
        `Budget: ${budget}`,
        `Locations: ${locations.join(", ")}`,
        `Submitted: ${submittedAt}`,
        `Landing page: ${landingPageUrl}`,
        ...Object.entries(attribution).map(([key, value]) => `${key}: ${value}`),
      ].join("\n"),
    }),
  });

  if (!emailResponse.ok) {
    const errorText = await emailResponse.text();
    console.error("Resend rejected an ads property lead email:", emailResponse.status, errorText.slice(0, 500));
    return NextResponse.json({ error: "Lead email could not be sent." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
