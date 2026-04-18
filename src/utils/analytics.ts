"use client";

import { sendGAEvent } from "@next/third-parties/google";

interface TrackCtaClickOptions {
  ctaLabel: string;
  ctaLocation: string;
  destinationUrl?: string;
  siteName?: string;
}

export function trackCtaClick({
  ctaLabel,
  ctaLocation,
  destinationUrl,
  siteName,
}: TrackCtaClickOptions) {
  sendGAEvent("event", "cta_click", {
    cta_label: ctaLabel,
    cta_location: ctaLocation,
    ...(destinationUrl ? { destination_url: destinationUrl } : {}),
    ...(siteName ? { site_name: siteName } : {}),
  });
}
