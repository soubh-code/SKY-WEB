"use client";

import config from "../../../../sanity.config";
import { NextStudio } from "next-sanity/studio";

const isSanityConfigured = Boolean(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID && process.env.NEXT_PUBLIC_SANITY_DATASET,
);

export function StudioPage() {
  if (!isSanityConfigured) {
    return (
      <main className="sanity-setup-page">
        <section className="glass-card">
          <p className="eyebrow">Sanity CMS</p>
          <h1>Connect Sanity To Start Posting Blogs.</h1>
          <p>
            Add your Sanity project values to the environment variables, then restart the preview. The website will keep
            using the current local blogs until Sanity is connected.
          </p>
          <code>NEXT_PUBLIC_SANITY_PROJECT_ID</code>
          <code>NEXT_PUBLIC_SANITY_DATASET</code>
          <code>NEXT_PUBLIC_SANITY_API_VERSION</code>
        </section>
      </main>
    );
  }

  return <NextStudio config={config} />;
}
