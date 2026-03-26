export function resolveSiteHref(pathname: string, href: string): string {
  if (href.startsWith("#")) {
    return pathname === "/" ? href : `/${href}`;
  }

  return href;
}
