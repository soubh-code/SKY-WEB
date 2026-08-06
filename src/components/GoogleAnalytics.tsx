"use client";

import { googleAnalyticsId } from "@/lib/business";
import { googleAdsId, isWhatsAppUrl, trackWhatsAppConversion } from "@/lib/google-ads";
import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef, useState } from "react";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const sendEvent = (eventName: string, params: Record<string, unknown> = {}) => {
  window.gtag?.("event", eventName, params);
};

function AnalyticsPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!pathname || !window.gtag) return;
    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    const query = searchParams.toString();
    const pagePath = query ? `${pathname}?${query}` : pathname;

    window.gtag("config", googleAnalyticsId, {
      page_path: pagePath,
    });
  }, [pathname, searchParams]);

  return null;
}

function AnalyticsEvents() {
  const [thankYouVisible, setThankYouVisible] = useState(false);

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const element = target?.closest<HTMLElement>("a, button");
      if (!element) return;

      const anchor = element instanceof HTMLAnchorElement ? element : element.closest<HTMLAnchorElement>("a");
      const href = anchor?.href || "";
      const text = element.textContent?.trim() || anchor?.ariaLabel || "";

      if (anchor && isWhatsAppUrl(href)) {
        trackWhatsAppConversion(event);
      }

      const explicitEvent = element.dataset.analyticsEvent;
      const explicitLabel = element.dataset.analyticsLabel || element.textContent?.trim() || undefined;

      if (explicitEvent) {
        sendEvent(explicitEvent, {
          event_category: "engagement",
          event_label: explicitLabel,
        });
        return;
      }

      if (href.includes("wa.me") || href.toLowerCase().includes("whatsapp")) {
        sendEvent("whatsapp_click", {
          event_category: "lead",
          event_label: text || href,
        });
        return;
      }

      if (href.startsWith("tel:")) {
        sendEvent("phone_call_click", {
          event_category: "lead",
          event_label: href.replace("tel:", ""),
        });
        return;
      }

      if (href.includes("/projects/")) {
        sendEvent("project_enquiry_click", {
          event_category: "project",
          event_label: text || href,
        });
        return;
      }

      if (anchor?.hasAttribute("download") || /brochure|download/i.test(href + " " + text)) {
        sendEvent("brochure_download_click", {
          event_category: "download",
          event_label: text || href,
        });
        return;
      }

      if (element.classList.contains("ongoing-card") || element.classList.contains("circular-gallery__item")) {
        sendEvent("property_card_click", {
          event_category: "project",
          event_label: text || element.getAttribute("aria-label") || "Project card",
        });
      }
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target instanceof HTMLFormElement ? event.target : null;
      if (form?.dataset.skipGlobalAnalytics === "true") return;
      sendEvent("contact_form_submit", {
        event_category: "lead",
        event_label: form?.getAttribute("name") || form?.id || "Contact form",
      });
      sendEvent("generate_lead", {
        event_category: "conversion",
        event_label: form?.getAttribute("name") || form?.id || "Contact form",
      });
      setThankYouVisible(true);
      window.setTimeout(() => setThankYouVisible(false), 6000);
    };

    document.addEventListener("click", handleClick, true);
    document.addEventListener("submit", handleSubmit, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
      document.removeEventListener("submit", handleSubmit, true);
    };
  }, []);

  return (
    <div className={thankYouVisible ? "analytics-thank-you analytics-thank-you--visible" : "analytics-thank-you"} role="status" aria-live="polite">
      Thank you. Sky Skrabers has received your enquiry.
    </div>
  );
}

export function GoogleAnalytics() {
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} strategy="afterInteractive" />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${googleAnalyticsId}');
          gtag('config', '${googleAdsId}');
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsPageViews />
      </Suspense>
      <AnalyticsEvents />
    </>
  );
}
