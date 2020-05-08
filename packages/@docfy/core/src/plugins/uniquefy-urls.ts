import { Context } from '../types';

function generateUniqueUrl(
  seenUrls: string[],
  url: string,
  count?: number
): string {
  let candidate = url;
  if (!count) {
    count = 1;
  }

  if (url[url.length - 1] === '/') {
    candidate = `${url}index-${count}`;
  } else {
    candidate = `${url}-${count}`;
  }

  if (seenUrls.indexOf(candidate) > -1) {
    return generateUniqueUrl(seenUrls, url, count + 1);
  }
  return candidate;
}

/**
 * This plugin makes sure that all the urls are unique. If there is a
 * duplicated url, we will modify it to make unique.
 */
export function uniquefyUrls(ctx: Context): void {
  const seenUrls: string[] = [];
  ctx.pages.forEach((page) => {
    if (seenUrls.indexOf(page.metadata.url) > -1) {
      page.metadata.url = generateUniqueUrl(seenUrls, page.metadata.url);
    }
    seenUrls.push(page.metadata.url);
  });
}
