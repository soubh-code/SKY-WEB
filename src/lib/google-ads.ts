export const googleAdsId = "AW-7897857435";

const whatsappConversionLabel =
  process.env.NEXT_PUBLIC_GOOGLE_ADS_WHATSAPP_CONVERSION_LABEL?.trim() ?? "";

const trackedClickEvents = new WeakSet<Event>();

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const sendGtagCommand = (...args: unknown[]) => {
  if (window.gtag) {
    window.gtag(...args);
    return;
  }

  window.dataLayer ??= [];
  const command = (function (...queuedArgs: unknown[]) {
    void queuedArgs;
    // gtag.js queues an Arguments object rather than a standard array.
    // eslint-disable-next-line prefer-rest-params
    return arguments;
  })(...args);
  window.dataLayer.push(command);
};

export function sendGoogleTagEvent(eventName: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  sendGtagCommand("event", eventName, params);
}

export function isWhatsAppUrl(href: string) {
  try {
    const url = new URL(href, window.location.href);
    const hostname = url.hostname.toLowerCase();

    return (
      url.protocol === "whatsapp:" ||
      hostname === "wa.me" ||
      hostname === "whatsapp.com" ||
      hostname.endsWith(".whatsapp.com")
    );
  } catch {
    return false;
  }
}

export function trackWhatsAppConversion(clickEvent?: Event) {
  if (typeof window === "undefined") return;

  if (clickEvent) {
    if (trackedClickEvents.has(clickEvent)) return;
    trackedClickEvents.add(clickEvent);
  }

  sendGtagCommand("event", "whatsapp_lead", {
    event_category: "lead",
    event_label: "WhatsApp Enquiry",
  });

  if (!whatsappConversionLabel) return;

  sendGtagCommand("event", "conversion", {
    send_to: `${googleAdsId}/${whatsappConversionLabel}`,
  });
}
