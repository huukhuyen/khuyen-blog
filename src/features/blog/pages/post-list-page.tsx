import { useCallback, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPosts } from '@/content/posts';
import { BlogLayout } from '../components/blog-layout';
import { PostCard } from '../components/post-card';

const POSTS_PER_PAGE = 5;
const LOAD_DELAY_MS = 350;

export function PostListPage(): JSX.Element {
  const { category } = useParams();
  const isCategory =
    category === 'coding' ||
    category === 'nhung-dieu-dang-nho' ||
    category === 'suu-tam';
  const posts = getPosts(isCategory ? category : undefined);
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingTimerRef = useRef<number | undefined>(undefined);
  const isLoadingRef = useRef(false);
  const hasMore = visibleCount < posts.length;
  const visiblePosts = posts.slice(0, visibleCount);

  useEffect(() => {
    window.clearTimeout(loadingTimerRef.current);
    isLoadingRef.current = false;
    setVisibleCount(POSTS_PER_PAGE);
    setIsLoading(false);
  }, [category]);

  useEffect(() => () => window.clearTimeout(loadingTimerRef.current), []);

  const loadMore = useCallback(() => {
    if (isLoadingRef.current || !hasMore) return;

    isLoadingRef.current = true;
    setIsLoading(true);
    loadingTimerRef.current = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + POSTS_PER_PAGE, posts.length));
      isLoadingRef.current = false;
      setIsLoading(false);
    }, LOAD_DELAY_MS);
  }, [hasMore, posts.length]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore) return;

    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && loadMore(),
      { rootMargin: '240px 0px' },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, loadMore]);
  // const title = isCategory ? categories[category] : 'Bài viết yêu thích';

  return (
    <BlogLayout>
      <div className="post-list">
        {visiblePosts.map((post) => (
          <PostCard key={post.legacyPath} post={post} />
        ))}
      </div>
      {(hasMore || isLoading) && (
        <div aria-live="polite" className="post-list-loader" ref={sentinelRef} role="status">
          {isLoading && <><span aria-hidden="true" className="post-list-loader__spinner" />Đang tải thêm bài viết</>}
        </div>
      )}
    </BlogLayout>
  );
}
