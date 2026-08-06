"use client";

import { business } from "@/lib/business";
import { sendGoogleTagEvent } from "@/lib/google-ads";
import { Check, ChevronDown, LoaderCircle, MessageCircle, X } from "lucide-react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from "react";
import styles from "./AdsPropertyLeadPopup.module.css";

const POPUP_SHOWN_KEY = "sky-ads-property-popup-shown";
const ADS_ATTRIBUTION_KEY = "sky-google-ads-attribution";
const ADS_LANDING_URL_KEY = "sky-google-ads-landing-url";

const locationOptions = [
  "Lajpat Nagar 1/2/4",
  "Lajpat Nagar 3",
  "Greater Kailash",
  "Kalkaji",
  "Defence Colony",
  "South Extension Part 1/2",
  "East Of Kailash",
  "Hauz Khas",
  "Other South Delhi Location",
] as const;

const budgetOptions = [
  "INR 1-2 Crore",
  "INR 2-3 Crore",
  "INR 3-5 Crore",
  "INR 5-8 Crore",
  "INR 8 Crore and above",
] as const;

type LocationOption = (typeof locationOptions)[number];
type FormErrors = Partial<Record<"name" | "phone" | "budget" | "locations", string>>;

const trackPopupEvent = (eventName: string) => {
  sendGoogleTagEvent(eventName, {
    event_category: "property_lead_popup",
  });
};

const readSessionValue = (key: string) => {
  try {
    return window.sessionStorage.getItem(key);
  } catch {
    return null;
  }
};

const writeSessionValue = (key: string, value: string) => {
  try {
    window.sessionStorage.setItem(key, value);
  } catch {
    // The popup can still work when storage is unavailable.
  }
};

const formatLocationList = (locations: string[]) => {
  if (locations.length <= 1) return locations[0] ?? "South Delhi";
  if (locations.length === 2) return `${locations[0]} and ${locations[1]}`;
  return `${locations.slice(0, -1).join(", ")} and ${locations.at(-1)}`;
};

const getAttribution = (params: URLSearchParams) => {
  const keys = [
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
    "gclid",
    "gbraid",
    "wbraid",
  ];

  return Object.fromEntries(
    keys.flatMap((key) => {
      const value = params.get(key)?.trim();
      return value ? [[key, value]] : [];
    }),
  );
};

const getStoredAttribution = () => {
  try {
    const stored = readSessionValue(ADS_ATTRIBUTION_KEY);
    return stored ? JSON.parse(stored) as Record<string, string> : getAttribution(new URLSearchParams(window.location.search));
  } catch {
    return getAttribution(new URLSearchParams(window.location.search));
  }
};

export function AdsPropertyLeadPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [budget, setBudget] = useState("");
  const [locations, setLocations] = useState<LocationOption[]>([]);
  const [honeypot, setHoneypot] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState("");
  const [leadId, setLeadId] = useState("");
  const [leadUpdateToken, setLeadUpdateToken] = useState("");
  const dialogRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const requestInFlightRef = useRef(false);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    writeSessionValue(
      ADS_ATTRIBUTION_KEY,
      JSON.stringify({ ...getStoredAttribution(), ...getAttribution(params) }),
    );
    if (!readSessionValue(ADS_LANDING_URL_KEY)) {
      writeSessionValue(ADS_LANDING_URL_KEY, window.location.href);
    }
    if (readSessionValue(POPUP_SHOWN_KEY) === "1") return;

    const completedProjectsSection = document.getElementById("our-projects");
    if (!completedProjectsSection) return;

    const showPopup = () => {
      writeSessionValue(POPUP_SHOWN_KEY, "1");
      setOpen(true);
      trackPopupEvent("property_popup_view");
      observer.disconnect();
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.bottom <= 0) showPopup();
    });
    observer.observe(completedProjectsSection);

    return () => observer.disconnect();
  }, [pathname]);

  useEffect(() => {
    if (!open) return;

    previousFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.requestAnimationFrame(() => nameInputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus();
    };
  }, [open]);

  useEffect(() => {
    if (!dropdownOpen) return;

    const closeOnOutsideClick = (event: MouseEvent) => {
      if (!locationRef.current?.contains(event.target as Node)) setDropdownOpen(false);
    };

    document.addEventListener("click", closeOnOutsideClick);
    return () => document.removeEventListener("click", closeOnOutsideClick);
  }, [dropdownOpen]);

  const closePopup = () => {
    setOpen(false);
    setDropdownOpen(false);
    trackPopupEvent("property_popup_close");
  };

  const handleDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Escape") {
      if (dropdownOpen) {
        setDropdownOpen(false);
      } else {
        closePopup();
      }
      return;
    }

    if (event.key !== "Tab") return;
    const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
      'button:not([disabled]), input:not([disabled]), select:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
    );
    if (!focusable?.length) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  const toggleLocation = (location: LocationOption) => {
    setLocations((current) =>
      current.includes(location) ? current.filter((item) => item !== location) : [...current, location],
    );
    setErrors((current) => ({ ...current, locations: undefined }));
  };

  const validate = () => {
    const nextErrors: FormErrors = {};
    const normalizedPhone = phone.replace(/\D/g, "").replace(/^91(?=\d{10}$)/, "");

    if (name.trim().length < 2) nextErrors.name = "Please enter your name.";
    if (!/^[6-9]\d{9}$/.test(normalizedPhone)) nextErrors.phone = "Enter a valid 10-digit Indian phone number.";
    if (!budget) nextErrors.budget = "Please select your budget.";
    if (!locations.length) nextErrors.locations = "Select at least one location.";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (requestInFlightRef.current || submitted) return;

    trackPopupEvent("property_continue_click");
    if (!validate()) return;

    requestInFlightRef.current = true;
    setSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/ads-property-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          budget,
          locations,
          website: honeypot,
          landingPageUrl: readSessionValue(ADS_LANDING_URL_KEY) || window.location.href,
          attribution: getStoredAttribution(),
        }),
      });

      if (!response.ok) throw new Error("Lead submission failed");
      const result = await response.json() as { leadId?: string; updateToken?: string };
      if (!result.leadId || !result.updateToken) throw new Error("Lead confirmation missing");

      setLeadId(result.leadId);
      setLeadUpdateToken(result.updateToken);
      setSubmitted(true);
      trackPopupEvent("property_form_success");
    } catch {
      setSubmitError("We couldn't record your details. Please try again.");
      trackPopupEvent("property_form_error");
    } finally {
      requestInFlightRef.current = false;
      setSubmitting(false);
    }
  };

  const whatsappHref = useMemo(() => {
    const message = `Hi, please provide me information about current properties in ${formatLocationList(locations)}.`;
    return `https://wa.me/${business.whatsappSchema.replace("+", "")}?text=${encodeURIComponent(message)}`;
  }, [locations]);

  const handleWhatsAppClick = () => {
    trackPopupEvent("property_whatsapp_click");
    if (!leadId || !leadUpdateToken) return;

    void fetch("/api/ads-property-lead", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ leadId, updateToken: leadUpdateToken }),
      keepalive: true,
    }).catch(() => {
      // WhatsApp should still open if the optional status update fails.
    });
  };

  if (!open) return null;

  return (
    <div className={styles.overlay} role="presentation">
      <div
        ref={dialogRef}
        className={styles.dialog}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ads-property-popup-title"
        onKeyDown={handleDialogKeyDown}
      >
        <button type="button" className={styles.closeButton} onClick={closePopup} aria-label="Close property enquiry">
          <X aria-hidden="true" size={22} />
        </button>

        <div className={styles.imagePanel}>
          <Image
            src="/assets/blogs/properties-for-sale-lajpat-nagar.webp"
            alt="Luxury South Delhi builder floor by Sky Skrabers"
            fill
            sizes="(max-width: 720px) 100vw, 38vw"
            className={styles.propertyImage}
          />
          <div className={styles.imageScrim} />
          <div className={styles.imageCopy}>
            <span>Sky Skrabers</span>
            <strong>Selected homes.<br />Current availability.</strong>
          </div>
        </div>

        <div className={styles.formPanel}>
          {submitted ? (
            <div className={styles.confirmation} role="status" aria-live="polite">
              <span className={styles.successIcon}><Check aria-hidden="true" size={26} /></span>
              <p className={styles.eyebrow}>Enquiry received</p>
              <h2 id="ads-property-popup-title">Your details have been recorded.</h2>
              <p>Get the latest available property details directly on WhatsApp.</p>
              <a
                className={styles.whatsappButton}
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleWhatsAppClick}
              >
                <MessageCircle aria-hidden="true" size={20} />
                Get Details Instantly on WhatsApp
              </a>
            </div>
          ) : (
            <>
              <p className={styles.eyebrow}>Current South Delhi inventory</p>
              <h2 id="ads-property-popup-title">Get Details of Currently Available Floors</h2>
              <p className={styles.supportingText}>
                Select your preferred locations and budget to receive the latest available property options.
              </p>

              <form
                className={styles.form}
                onSubmit={handleSubmit}
                noValidate
                data-skip-global-analytics="true"
              >
                <div className={styles.field}>
                  <label htmlFor="ads-lead-name">Name</label>
                  <input
                    ref={nameInputRef}
                    id="ads-lead-name"
                    name="name"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                      setErrors((current) => ({ ...current, name: undefined }));
                    }}
                    autoComplete="name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? "ads-lead-name-error" : undefined}
                  />
                  {errors.name && <span id="ads-lead-name-error" className={styles.error} role="alert">{errors.name}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="ads-lead-phone">Phone Number</label>
                  <input
                    id="ads-lead-phone"
                    name="phone"
                    type="tel"
                    inputMode="numeric"
                    value={phone}
                    onChange={(event) => {
                      setPhone(event.target.value);
                      setErrors((current) => ({ ...current, phone: undefined }));
                    }}
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "ads-lead-phone-error" : undefined}
                  />
                  {errors.phone && <span id="ads-lead-phone-error" className={styles.error} role="alert">{errors.phone}</span>}
                </div>

                <div className={styles.field}>
                  <label htmlFor="ads-lead-budget">Budget</label>
                  <select
                    id="ads-lead-budget"
                    name="budget"
                    value={budget}
                    onChange={(event) => {
                      setBudget(event.target.value);
                      setErrors((current) => ({ ...current, budget: undefined }));
                    }}
                    aria-invalid={Boolean(errors.budget)}
                    aria-describedby={errors.budget ? "ads-lead-budget-error" : undefined}
                  >
                    <option value="">Select your budget</option>
                    {budgetOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                  </select>
                  {errors.budget && <span id="ads-lead-budget-error" className={styles.error} role="alert">{errors.budget}</span>}
                </div>

                <div className={styles.field} ref={locationRef}>
                  <label id="ads-lead-locations-label">Select Location</label>
                  <button
                    type="button"
                    className={styles.locationTrigger}
                    onClick={() => setDropdownOpen((current) => !current)}
                    aria-expanded={dropdownOpen}
                    aria-controls="ads-lead-location-options"
                    aria-labelledby="ads-lead-locations-label ads-lead-location-value"
                  >
                    <span id="ads-lead-location-value" className={locations.length ? styles.selectedLocations : ""}>
                      {locations.length ? locations.join(", ") : "Choose one or more locations"}
                    </span>
                    <ChevronDown aria-hidden="true" size={18} />
                  </button>
                  {dropdownOpen && (
                    <div id="ads-lead-location-options" className={styles.locationOptions}>
                      {locationOptions.map((location) => (
                        <label key={location} className={styles.locationOption}>
                          <input
                            type="checkbox"
                            checked={locations.includes(location)}
                            onChange={() => toggleLocation(location)}
                          />
                          <span>{location}</span>
                        </label>
                      ))}
                    </div>
                  )}
                  {errors.locations && <span className={styles.error} role="alert">{errors.locations}</span>}
                </div>

                <div className={styles.honeypot} aria-hidden="true">
                  <label htmlFor="ads-lead-website">Website</label>
                  <input
                    id="ads-lead-website"
                    name="website"
                    value={honeypot}
                    onChange={(event) => setHoneypot(event.target.value)}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                {submitError && <p className={styles.submitError} role="alert">{submitError}</p>}

                <button type="submit" className={styles.continueButton} disabled={submitting}>
                  {submitting ? <LoaderCircle className={styles.spinner} aria-hidden="true" size={20} /> : null}
                  {submitting ? "Recording details..." : "Continue"}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
