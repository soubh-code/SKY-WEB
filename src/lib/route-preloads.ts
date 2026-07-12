const constructionComparisonImages = [
  "/assets/construction/facade-renewal-before.webp",
  "/assets/construction/facade-renewal-after.webp",
  "/assets/construction/interior-before.webp",
  "/assets/construction/interior-after.webp",
  "/assets/construction/builder-floor-before.webp",
  "/assets/construction/builder-floor-after.webp",
  "/assets/construction/property-renewal-before.webp",
  "/assets/construction/property-renewal-after.webp",
] as const;

const assetPreloadCache = new Map<string, Promise<void>>();

function preloadImage(src: string) {
  if (typeof window === "undefined") return Promise.resolve();

  const cached = assetPreloadCache.get(src);
  if (cached) return cached;

  const promise = new Promise<void>((resolve) => {
    const image = new window.Image();
    image.decoding = "async";
    image.onload = () => {
      if ("decode" in image) {
        image.decode().then(resolve).catch(resolve);
        return;
      }

      resolve();
    };
    image.onerror = () => resolve();
    image.src = src;
  });

  assetPreloadCache.set(src, promise);
  return promise;
}

export function preloadConstructionComparisonImages() {
  return Promise.all(constructionComparisonImages.map((src) => preloadImage(src))).then(() => undefined);
}

export function preloadAssetsForHref(href: string) {
  if (typeof window === "undefined") return Promise.resolve();

  try {
    const target = new URL(href, window.location.href);
    if (target.origin === window.location.origin && target.pathname === "/construction") {
      return preloadConstructionComparisonImages();
    }
  } catch {
    // Navigation can continue normally if the href is not parseable.
  }

  return Promise.resolve();
}
