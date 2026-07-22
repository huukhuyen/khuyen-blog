import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const FRONTMATTER_PATTERN = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/;

export interface ParsedMarkdown {
  data: Record<string, unknown>;
  body: string;
}

export function parseMarkdown(raw: string, file: string): ParsedMarkdown {
  const match = FRONTMATTER_PATTERN.exec(raw);
  if (!match) throw new Error(`Bài viết thiếu frontmatter: ${file}`);

  const data = parseYaml(match[1]);
  if (!data || Array.isArray(data) || typeof data !== "object") {
    throw new Error(`Frontmatter không hợp lệ: ${file}`);
  }

  return { data: data as Record<string, unknown>, body: match[2].trim() };
}

export interface PostSource {
  category: string;
  featuredImage: string;
  publishedAt: string;
  slug: string;
  summary: string;
  title: string;
}

const text = (value: unknown): string =>
  typeof value === "string" ? value : "";

/** Đọc frontmatter của mọi bài viết. Dùng lúc build để sinh sitemap và shell HTML. */
export async function readPosts(root: string): Promise<PostSource[]> {
  const postsDir = path.join(root, "src/content/posts");
  const entries = await readdir(postsDir, { recursive: true });
  const posts: PostSource[] = [];

  for (const entry of entries) {
    if (!entry.endsWith(".md")) continue;

    const file = path.join(postsDir, entry);
    const { data } = parseMarkdown(await readFile(file, "utf8"), file);
    if (data.visible === false) continue;

    posts.push({
      category: text(data.category),
      featuredImage: text(data.featuredImage),
      publishedAt: text(data.publishedAt),
      slug: text(data.slug),
      summary: text(data.summary),
      title: text(data.title),
    });
  }

  return posts.sort((left, right) =>
    right.publishedAt.localeCompare(left.publishedAt),
  );
}
