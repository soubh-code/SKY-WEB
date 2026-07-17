export type MetaLeadSource = "whatsapp" | "phone_call" | "contact_map";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaLead(contentName: string, leadSource: MetaLeadSource) {
  if (typeof window === "undefined") return;

  window.fbq?.("track", "Lead", {
    content_name: contentName,
    lead_source: leadSource,
  });
}
