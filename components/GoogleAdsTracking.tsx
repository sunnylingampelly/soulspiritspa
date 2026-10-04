"use client";

import { useEffect } from "react";
import Script from "next/script";
import {
  isGoogleAdsIdConfigured,
  getGoogleAdsId,
  sendConversion,
  navigateAfterConversion,
  type ConversionKind,
} from "@/lib/google-ads";

// Classifies a clicked <a href> into the conversion it represents, or null
// if it's not one we track. Parsed as a real URL (not substring-matched)
// so query strings / paths can't produce false positives, with a plain
// `tel:` check first since `new URL("tel:...")` still parses fine but has
// no meaningful hostname to check.
function classifyLink(href: string): ConversionKind | null {
  if (href.startsWith("tel:")) return "phone";

  let url: URL;
  try {
    url = new URL(href, window.location.origin);
  } catch {
    return null;
  }

  const host = url.hostname.replace(/^www\./, "");

  if (host === "wa.me" || host === "api.whatsapp.com" || host === "web.whatsapp.com") {
    return "whatsapp";
  }

  // maps.google.com *is* Maps regardless of path (e.g. "maps.google.com/?q=...");
  // google.com only counts when the path is actually under /maps, so
  // www.google.com/search and the like are never misclassified.
  if (host === "maps.app.goo.gl" || host === "maps.google.com") return "directions";
  if (host === "google.com" && url.pathname.startsWith("/maps")) return "directions";

  return null;
}

function isModifiedClick(e: MouseEvent): boolean {
  return e.button === 1 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey;
}

export default function GoogleAdsTracking() {
  const configured = isGoogleAdsIdConfigured();

  useEffect(() => {
    // One delegated listener on the document, attached once for the
    // lifetime of this layout-level component (it doesn't remount on
    // App Router navigations), and removed on unmount — this is the
    // single shared handler for every tel:/WhatsApp/Maps link on the
    // site, including anything rendered dynamically after mount.
    function handleClick(e: MouseEvent) {
      if (e.defaultPrevented) return;
      const target = e.target as HTMLElement | null;
      const link = target?.closest<HTMLAnchorElement>("a[href]");
      if (!link) return;

      const href = link.getAttribute("href") || "";
      const kind = classifyLink(href);
      if (!kind) return;

      const opensNewTab = link.target === "_blank" || isModifiedClick(e);

      if (opensNewTab) {
        // New-tab / modified clicks never block current-page navigation —
        // fire and let the browser's default behavior proceed untouched.
        sendConversion(kind);
        return;
      }

      // Plain same-tab click (in practice: tel: links) — briefly hold
      // navigation so the hit has a chance to send, then navigate either
      // via gtag's own callback or a short fallback, whichever is first.
      e.preventDefault();
      navigateAfterConversion(href, kind);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  // Hooks must run unconditionally — the dev-only warning lives in its own
  // effect rather than nested under the `if (!configured)` return below.
  useEffect(() => {
    if (configured || process.env.NODE_ENV === "production") return;
    // eslint-disable-next-line no-console
    console.warn(
      "[google-ads] NEXT_PUBLIC_GOOGLE_ADS_ID is not set (or invalid). " +
        "Google Ads conversion tracking is disabled; all links still work normally."
    );
  }, [configured]);

  if (!configured) return null;

  const googleAdsId = getGoogleAdsId();

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${googleAdsId}`}
        strategy="afterInteractive"
      />
      <Script id="google-ads-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          // Consent Mode v2 — the site has no consent banner yet, so every
          // signal defaults to denied until one is added and calls
          // gtag('consent', 'update', ...) with the visitor's real choice.
          gtag('consent', 'default', {
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            analytics_storage: 'denied',
            wait_for_update: 500
          });
          gtag('config', '${googleAdsId}');
        `}
      </Script>
    </>
  );
}
