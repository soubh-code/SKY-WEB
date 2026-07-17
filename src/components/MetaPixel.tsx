"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Script from "next/script";
import { Suspense, useEffect, useRef } from "react";
import { trackMetaLead } from "@/lib/meta-pixel";

const metaPixelId = "1009592428341379";

function MetaPixelPageViews() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const hasTrackedInitialPage = useRef(false);

  useEffect(() => {
    if (!pathname) return;

    if (!hasTrackedInitialPage.current) {
      hasTrackedInitialPage.current = true;
      return;
    }

    window.fbq?.("track", "PageView");
  }, [pathname, searchParams]);

  return null;
}

function MetaPixelLeadEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>("a[href]");
      if (!anchor) return;

      if (anchor.dataset.metaLeadSource === "contact_map") {
        trackMetaLead("Contact Location View", "contact_map");
        return;
      }

      const url = new URL(anchor.href, window.location.href);
      if (url.protocol === "tel:") {
        trackMetaLead("Phone Call Enquiry", "phone_call");
        return;
      }

      if (url.hostname === "wa.me" || url.hostname === "api.whatsapp.com") {
        trackMetaLead("WhatsApp Enquiry", "whatsapp");
      }
    };

    document.addEventListener("click", handleClick, true);
    return () => document.removeEventListener("click", handleClick, true);
  }, []);

  return null;
}

export function MetaPixel() {
  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${metaPixelId}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src={`https://www.facebook.com/tr?id=${metaPixelId}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
      <Suspense fallback={null}>
        <MetaPixelPageViews />
      </Suspense>
      <MetaPixelLeadEvents />
    </>
  );
}
