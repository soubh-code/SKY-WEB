export const HOME_SECTION_TARGET_KEY = "sky-home-section-target";
const homeSectionHashPattern = /^#[a-z][a-z0-9-]*$/i;

export function getHomeSectionHash(href: string) {
  try {
    const target = new URL(href, window.location.href);
    const isHomeSection =
      target.origin === window.location.origin &&
      target.pathname === "/" &&
      homeSectionHashPattern.test(target.hash);
    return isHomeSection ? target.hash : null;
  } catch {
    return null;
  }
}

export function saveHomeSectionTarget(hash: string) {
  window.sessionStorage.setItem(HOME_SECTION_TARGET_KEY, hash);
}

export function takeHomeSectionTarget() {
  const target = window.sessionStorage.getItem(HOME_SECTION_TARGET_KEY);
  window.sessionStorage.removeItem(HOME_SECTION_TARGET_KEY);
  return target;
}

export function removeLocationHash() {
  if (!window.location.hash) return;
  window.history.replaceState(null, "", `${window.location.pathname}${window.location.search}`);
}
