import type { Post, PostCategory } from '@/types/post';
import { parse as parseYaml } from 'yaml';

const files = import.meta.glob<string>('@/content/posts/**/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

function parsePost(raw: string): Post {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) throw new Error('Markdown post is missing frontmatter.');

  const frontmatter = parseFrontmatter(match[1]);
  const category = getCategory(frontmatter.category);
  const title = getString(frontmatter.title);
  const slug = getString(frontmatter.slug);

  return {
    title,
    slug,
    category,
    publishedAt: getString(frontmatter.publishedAt),
    summary: getString(frontmatter.summary),
    featuredImage: getString(frontmatter.featuredImage),
    featuredImageAlt: getString(frontmatter.featuredImageAlt) || title,
    legacyPath: getString(frontmatter.legacyPath) || `/${category}/${slug}.html`,
    legacyAliases: getStringList(frontmatter.legacyAliases),
    source: frontmatter.source === 'curated' ? 'curated' : 'original',
    embeds: getStringList(frontmatter.embeds),
    body: match[2].trim(),
  };
}

function parseFrontmatter(raw: string): Record<string, unknown> {
  const frontmatter = parseYaml(raw);
  if (!frontmatter || Array.isArray(frontmatter) || typeof frontmatter !== 'object') {
    throw new Error('Markdown post has invalid frontmatter.');
  }

  return frontmatter as Record<string, unknown>;
}

function getCategory(value: unknown): PostCategory {
  if (value === 'coding' || value === 'nhung-dieu-dang-nho' || value === 'suu-tam') return value;
  throw new Error(`Invalid post category: ${String(value)}`);
}

function getString(value: unknown): string {
  return typeof value === 'string' ? value : '';
}

function getStringList(value: unknown): string[] {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : [];
}

const posts = Object.values(files)
  .map(parsePost)
  .sort((left, right) => right.publishedAt.localeCompare(left.publishedAt));

export function getPosts(category?: PostCategory): Post[] {
  return category ? posts.filter((post) => post.category === category) : posts;
}

export function getPost(category: string, slug: string): Post | undefined {
  return posts.find((post) => post.category === category && post.slug === slug.replace(/\.html$/, ''));
}

export function getPostByAlias(pathname: string): Post | undefined {
  return posts.find((post) => post.legacyPath === pathname || post.legacyAliases.includes(pathname));
}

export const categories: Record<PostCategory, string> = {
  coding: 'Chia sẻ coding',
  'nhung-dieu-dang-nho': 'Những điều đáng nhớ',
  'suu-tam': 'Sưu tầm',
};
