import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import type { Plugin } from "vite";
import {
  SITE_DESCRIPTION,
  SITE_LOCALE,
  SITE_NAME,
  SITE_OG_IMAGE,
  SITE_URL,
  toAbsoluteUrl,
  toMetaDescription,
  toPageTitle,
} from "../src/lib/site";
import { readPosts } from "./posts-source";

/** Khối thẻ meta mặc định trong `index.html`, bị thay bằng thẻ của từng route. */
const SEO_BLOCK = /<!--seo:start-->[\s\S]*?<!--seo:end-->/;

const CATEGORY_LABELS: Record<string, string> = {
  "nhung-dieu-dang-nho": "Những điều đáng nhớ",
  coding: "Chia sẻ coding",
  "suu-tam": "Sưu tầm",
};

interface Page {
  description: string;
  image: string;
  /** Đường dẫn trong `dist`; rỗng nghĩa là `dist/index.html`. */
  outPath: string;
  publishedAt?: string;
  title?: string;
  type: "article" | "website";
  url: string;
}

const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

function renderTags(page: Page, siteUrl: string): string {
  const canonical = `${siteUrl}${page.url}`;
  const tags: [string, string][] = [
    ["description", page.description],
    ["og:type", page.type],
    ["og:site_name", SITE_NAME],
    ["og:locale", SITE_LOCALE],
    ["og:title", toPageTitle(page.title)],
    ["og:description", page.description],
    ["og:url", canonical],
    ["og:image", toAbsoluteUrl(page.image, siteUrl)],
    ["twitter:card", "summary_large_image"],
    ["twitter:title", toPageTitle(page.title)],
    ["twitter:description", page.description],
    ["twitter:image", toAbsoluteUrl(page.image, siteUrl)],
  ];
  if (page.publishedAt) {
    tags.push(["article:published_time", page.publishedAt]);
  }

  const rendered = tags.map(([name, content]) => {
    const attribute =
      name.startsWith("og:") || name.startsWith("article:")
        ? "property"
        : "name";
    return `    <meta ${attribute}="${name}" content="${escapeHtml(content)}" />`;
  });

  return [
    `    <title>${escapeHtml(toPageTitle(page.title))}</title>`,
    `    <link rel="canonical" href="${canonical}" />`,
    ...rendered,
  ].join("\n");
}

function renderSitemap(pages: Page[], siteUrl: string): string {
  const urls = pages
    .map((page) => {
      const lastmod = page.publishedAt
        ? `\n    <lastmod>${page.publishedAt}</lastmod>`
        : "";
      return `  <url>\n    <loc>${siteUrl}${page.url}</loc>${lastmod}\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

/**
 * Sinh `robots.txt`, `sitemap.xml`, và một shell HTML riêng cho từng route.
 *
 * Crawler của Facebook/Zalo/Twitter không chạy JavaScript, nên thẻ OG phải có sẵn
 * trong HTML thô. Mỗi shell là bản copy của `index.html` với thẻ meta của route đó;
 * phần body vẫn để SPA render như thường. Cách này không cần browser hay SSR lúc
 * build nên chạy được ở mọi môi trường CI.
 */
export function seoPlugin(): Plugin {
  let outDir = "dist";
  let root = process.cwd();

  return {
    name: "seo",
    apply: "build",
    configResolved(config) {
      root = config.root;
      outDir = path.resolve(config.root, config.build.outDir);
    },
    async closeBundle() {
      // Netlify cấp biến `URL` nên domain riêng cũng tự đúng, không cần sửa code.
      const siteUrl = (process.env.URL || SITE_URL).replace(/\/$/, "");
      const posts = await readPosts(root);

      const pages: Page[] = [
        {
          description: toMetaDescription(SITE_DESCRIPTION),
          image: SITE_OG_IMAGE,
          outPath: "",
          type: "website",
          url: "/",
        },
        ...Object.entries(CATEGORY_LABELS).map(
          ([slug, label]): Page => ({
            description: toMetaDescription(
              `Các bài viết thuộc chuyên mục ${label} trên blog của ${SITE_NAME}.`,
            ),
            image: SITE_OG_IMAGE,
            outPath: slug,
            title: label,
            type: "website",
            url: `/${slug}`,
          }),
        ),
        ...posts.map(
          (post): Page => ({
            description: toMetaDescription(post.summary),
            image: post.featuredImage || SITE_OG_IMAGE,
            outPath: `${post.category}/${post.slug}`,
            publishedAt: post.publishedAt,
            title: post.title,
            type: "article",
            url: `/${post.category}/${post.slug}`,
          }),
        ),
      ];

      const template = await readFile(path.join(outDir, "index.html"), "utf8");
      if (!SEO_BLOCK.test(template)) {
        throw new Error(
          "index.html thiếu khối <!--seo:start--> ... <!--seo:end--> để chèn thẻ meta.",
        );
      }

      for (const page of pages) {
        const html = template.replace(
          SEO_BLOCK,
          renderTags(page, siteUrl).trimStart(),
        );
        const target = path.join(outDir, page.outPath, "index.html");
        await mkdir(path.dirname(target), { recursive: true });
        await writeFile(target, html);
      }

      await writeFile(
        path.join(outDir, "sitemap.xml"),
        renderSitemap(pages, siteUrl),
      );
      await writeFile(
        path.join(outDir, "robots.txt"),
        `User-agent: *\nAllow: /\nDisallow: /admin/\n\nSitemap: ${siteUrl}/sitemap.xml\n`,
      );

      this.info(
        `Đã sinh ${pages.length} shell HTML, sitemap.xml và robots.txt (${siteUrl})`,
      );
    },
  };
}
