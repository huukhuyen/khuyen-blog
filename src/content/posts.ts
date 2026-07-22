import { isPostCategory, type PostCategory } from "./categories";

/** Metadata của một bài viết. Nội dung markdown được tải riêng qua `loadPostBody`. */
export interface Post {
  id: string;
  title: string;
  slug: string;
  category: PostCategory;
  publishedAt: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  legacyPath: string;
  legacyAliases: string[];
  source: "original" | "curated";
  embeds: string[];
}

/** Bài `visible: false` được plugin trả về `null` nên không lọt vào bundle. */
const frontmatters = import.meta.glob<Record<string, unknown> | null>(
  "./posts/**/*.md",
  { eager: true, query: "?frontmatter", import: "default" },
);

const bodyLoaders = import.meta.glob<string>("./posts/**/*.md", {
  query: "?body",
  import: "default",
});

function getString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function getStringList(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function getCategory(value: unknown): PostCategory {
  if (!isPostCategory(value)) {
    throw new Error(`Danh mục bài viết không hợp lệ: ${String(value)}`);
  }
  return value;
}

function toPost(id: string, frontmatter: Record<string, unknown>): Post {
  const category = getCategory(frontmatter.category);
  const title = getString(frontmatter.title);
  const slug = getString(frontmatter.slug);

  return {
    id,
    title,
    slug,
    category,
    publishedAt: getString(frontmatter.publishedAt),
    summary: getString(frontmatter.summary),
    featuredImage: getString(frontmatter.featuredImage),
    featuredImageAlt: getString(frontmatter.featuredImageAlt) || title,
    legacyPath:
      getString(frontmatter.legacyPath) || `/${category}/${slug}.html`,
    legacyAliases: getStringList(frontmatter.legacyAliases),
    source: frontmatter.source === "curated" ? "curated" : "original",
    embeds: getStringList(frontmatter.embeds),
  };
}

const posts: Post[] = Object.entries(frontmatters)
  .filter(
    (entry): entry is [string, Record<string, unknown>] => entry[1] !== null,
  )
  .map(([id, frontmatter]) => toPost(id, frontmatter))
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

const postsByCategory = new Map<PostCategory, Post[]>();

/**
 * Danh sách bài viết theo danh mục. Kết quả được cache nên tham chiếu mảng ổn định
 * giữa các lần render, dùng trực tiếp làm dependency của hook được.
 */
export function getPosts(category?: PostCategory): Post[] {
  if (!category) return posts;

  let filtered = postsByCategory.get(category);
  if (!filtered) {
    filtered = posts.filter((post) => post.category === category);
    postsByCategory.set(category, filtered);
  }
  return filtered;
}

export function getPost(category: string, slug: string): Post | undefined {
  const wanted = slug.replace(/\.html$/, "");
  return posts.find(
    (post) => post.category === category && post.slug === wanted,
  );
}

/** Giải quyết các đường dẫn cũ (`legacyPath`, `legacyAliases`) về bài viết tương ứng. */
export function getPostByAlias(pathname: string): Post | undefined {
  return posts.find(
    (post) =>
      post.legacyPath === pathname || post.legacyAliases.includes(pathname),
  );
}

const bodyCache = new Map<string, Promise<string>>();

/** Tải nội dung markdown. Promise được cache để dùng được với `use()` của React. */
export function loadPostBody(post: Post): Promise<string> {
  let body = bodyCache.get(post.id);
  if (!body) {
    const load = bodyLoaders[post.id];
    if (!load) {
      throw new Error(`Không tìm thấy nội dung bài viết: ${post.id}`);
    }
    body = load();
    bodyCache.set(post.id, body);
  }
  return body;
}
