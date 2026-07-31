import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const obsoleteWordPressPaths = new Set([
  "/hello-world",
  "/residential-projects/g-46-greater-kailash-2-enclave",
  "/if-you-love-to-play-cards-the-gardens-is-your-place-to-get",
  "/for-instance-when-real-madrid-visited-guangzhou-in-2011",
  "/com-we-believe-that-everyone-deserves-to-experience-final",
  "/we-value-the-input-from-real-players",
  "/tournament-may-be-limited-to-number-of-dealers-and-tables",
  "/people-who-get-pleasure-from-solo-player-teasing-exterior",
  "/based-on-our-analysis-we-gave-this-website-a-very-low-score",
  "/we-vibe-sync-2-is-another-incredibly-resourceful",
  "/the-better-possibility-is-to-simply-speak-to-your-associate",
  "/the-robust-motor-packed-a-punch",
  "/navigating-the-wands-5-intensities-is-as-easy-as-pressing-the",
  "/this-record-was-surpassed-in-2017-when-a-white-crocodile",
  "/the-final-list-only-includes-options-that-earned-two",
  "/its-only-about-the-size-of-a-pinky-3",
  "/welcome-to-mega-pleasure",
]);

const normalizePath = (pathname: string) =>
  pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

export function proxy(request: NextRequest) {
  const pathname = normalizePath(request.nextUrl.pathname);
  const isLegacyCollection = pathname.startsWith("/author/") || pathname.startsWith("/category/");
  const isLegacyFeed = pathname === "/comments/feed" || pathname.endsWith("/feed");
  const isLegacySearch = request.nextUrl.searchParams.has("s");

  if (obsoleteWordPressPaths.has(pathname) || isLegacyCollection || isLegacyFeed || isLegacySearch) {
    return new NextResponse(null, {
      status: 410,
      headers: {
        "Cache-Control": "public, max-age=3600, s-maxage=86400",
        "X-Robots-Tag": "noindex, nofollow",
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|icon.png|apple-icon.png).*)"],
};
