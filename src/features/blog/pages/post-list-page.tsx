import { useParams } from "react-router";
import type { PostCategory } from "@/content/categories";
import { isPostCategory, POST_CATEGORIES } from "@/content/categories";
import { getPosts } from "@/content/posts";
import { SITE_DESCRIPTION, SITE_NAME, toMetaDescription } from "@/lib/site";
import { useSeo } from "@/lib/use-seo";
import { BlogLayout } from "../components/blog-layout";
import { InlineLoader } from "../components/inline-loader";
import { PostCard } from "../components/post-card";
import { useInfiniteList } from "../hooks/use-infinite-list";
import { NotFoundPage } from "./not-found-page";

const POSTS_PER_PAGE = 5;
const LOAD_DELAY_MS = 350;

function PostList({ category }: { category?: PostCategory }) {
  const posts = getPosts(category);
  const label = category && POST_CATEGORIES[category];
  useSeo(
    label,
    toMetaDescription(
      label
        ? `Các bài viết thuộc chuyên mục ${label} trên blog của ${SITE_NAME}.`
        : SITE_DESCRIPTION,
    ),
  );
  const { hasMore, isLoading, sentinelRef, visibleItems } = useInfiniteList(
    posts,
    POSTS_PER_PAGE,
    LOAD_DELAY_MS,
  );

  return (
    <BlogLayout heading={label} showFooter={!hasMore && !isLoading}>
      <div className="post-list">
        {visibleItems.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {(hasMore || isLoading) && (
        <InlineLoader
          label={isLoading ? "Đang tải thêm bài viết" : undefined}
          ref={sentinelRef}
        />
      )}
    </BlogLayout>
  );
}

export function PostListPage() {
  const { category } = useParams();
  // Route `/:category` khớp mọi path một đoạn, nên slug lạ phải là 404 thật
  // thay vì lặng lẽ render lại danh sách của trang chủ.
  if (category !== undefined && !isPostCategory(category)) {
    return <NotFoundPage />;
  }

  return <PostList category={category} />;
}
