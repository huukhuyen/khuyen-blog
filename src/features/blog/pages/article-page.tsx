import { CalendarDays } from "lucide-react";
import { Suspense, use } from "react";
import { useLocation, useParams } from "react-router";
import { POST_CATEGORIES } from "@/content/categories";
import type { Post } from "@/content/posts";
import { getPost, getPostByAlias, loadPostBody } from "@/content/posts";
import { formatDate } from "@/lib/format-date";
import { toMetaDescription } from "@/lib/site";
import { useSeo } from "@/lib/use-seo";
import { ArticleContent } from "../components/article-content";
import { BlogLayout } from "../components/blog-layout";
import { InlineLoader } from "../components/inline-loader";
import { NotFoundPage } from "./not-found-page";

function Article({ post }: { post: Post }) {
  useSeo(post.title, toMetaDescription(post.summary));

  return (
    <BlogLayout>
      <article className="article-panel">
        <p className="article-panel__category">
          {POST_CATEGORIES[post.category]}
        </p>
        <h1>{post.title}</h1>
        <p className="article-panel__date mt-5 flex items-center gap-2">
          <CalendarDays size={16} />
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </p>
        <Suspense fallback={<InlineLoader label="Đang tải nội dung" />}>
          <ArticleBody post={post} />
        </Suspense>
      </article>
    </BlogLayout>
  );
}

function ArticleBody({ post }: { post: Post }) {
  const body = use(loadPostBody(post));

  return <ArticleContent body={body} embeds={post.embeds} />;
}

export function ArticlePage() {
  const { category = "", slug = "" } = useParams();
  const { pathname } = useLocation();
  const post = getPost(category, slug) ?? getPostByAlias(pathname);
  if (!post) return <NotFoundPage />;

  return <Article post={post} />;
}
