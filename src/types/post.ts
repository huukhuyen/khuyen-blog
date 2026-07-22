export type PostCategory = 'coding' | 'nhung-dieu-dang-nho' | 'suu-tam';

export interface PostFrontmatter {
  title: string;
  slug: string;
  category: PostCategory;
  publishedAt: string;
  summary: string;
  featuredImage: string;
  featuredImageAlt: string;
  legacyPath: string;
  legacyAliases: string[];
  source: 'original' | 'curated';
  embeds: string[];
}

export interface Post extends PostFrontmatter {
  body: string;
}
