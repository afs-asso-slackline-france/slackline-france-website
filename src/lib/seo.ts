import { SITE_ORIGIN } from "./site";

const ROOT_PATH = "/";

export function absoluteUrl(path: string): string {
  if (!path.startsWith(ROOT_PATH)) {
    throw new Error(`Expected a path starting with "/", received "${path}".`);
  }
  return `${SITE_ORIGIN}${path}`;
}

export function robotsDirective(isIndexable: boolean): string {
  return isIndexable ? "index, follow" : "noindex, nofollow";
}
