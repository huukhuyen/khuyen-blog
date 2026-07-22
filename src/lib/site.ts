/**
 * Hằng số và helper thuần cho metadata của site.
 *
 * File này được import từ cả phía client và vite plugin lúc build, nên không được
 * dùng API riêng của browser hay của Node.
 */
export const SITE_NAME = "Nguyễn Hữu Khuyên";
export const SITE_URL = "https://huukhuyen.netlify.app";
export const SITE_LOCALE = "vi_VN";
export const SITE_DESCRIPTION =
  "Nhật ký cá nhân của Nguyễn Hữu Khuyên - Frontend Developer đến từ Đà Nẵng. Chuyện cuộc sống, chia sẻ lập trình và những điều đáng nhớ.";
export const SITE_OG_IMAGE = "/images/HY8A3869.jpg";

const META_DESCRIPTION_LIMIT = 160;

/** Cắt mô tả về độ dài các search engine thường hiển thị, không cắt giữa từ. */
export function toMetaDescription(text: string): string {
  const flat = text.replace(/\s+/g, " ").trim();
  if (flat.length <= META_DESCRIPTION_LIMIT) return flat;

  const clipped = flat.slice(0, META_DESCRIPTION_LIMIT);
  const lastSpace = clipped.lastIndexOf(" ");
  return `${(lastSpace > 0 ? clipped.slice(0, lastSpace) : clipped).replace(/[,.;:]$/, "")}...`;
}

export function toAbsoluteUrl(pathOrUrl: string, siteUrl = SITE_URL): string {
  if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
  return `${siteUrl}${pathOrUrl.startsWith("/") ? "" : "/"}${pathOrUrl}`;
}

export function toPageTitle(title?: string): string {
  return title ? `${title} — ${SITE_NAME}` : SITE_NAME;
}
