import type { RefObject } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

interface InfiniteList<T> {
  hasMore: boolean;
  isLoading: boolean;
  /** Gắn vào phần tử canh dưới danh sách để kích hoạt lần tải tiếp theo. */
  sentinelRef: RefObject<HTMLDivElement | null>;
  visibleItems: T[];
}

/**
 * Hiển thị dần một mảng đã có sẵn trong bộ nhớ theo từng trang khi người dùng
 * cuộn tới cuối danh sách.
 *
 * Observer được ngắt trong lúc đang tải nên không cần cờ chống gọi trùng;
 * danh sách mới (đổi danh mục) sẽ tự reset về trang đầu.
 */
export function useInfiniteList<T>(
  items: T[],
  pageSize: number,
  loadDelayMs: number,
): InfiniteList<T> {
  const [visibleCount, setVisibleCount] = useState(pageSize);
  const [isLoading, setIsLoading] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<number | undefined>(undefined);

  const hasMore = visibleCount < items.length;

  useEffect(() => {
    window.clearTimeout(timerRef.current);
    setVisibleCount(pageSize);
    setIsLoading(false);
  }, [items, pageSize]);

  useEffect(() => () => window.clearTimeout(timerRef.current), []);

  const loadMore = useCallback(() => {
    setIsLoading(true);
    timerRef.current = window.setTimeout(() => {
      setVisibleCount((count) => Math.min(count + pageSize, items.length));
      setIsLoading(false);
    }, loadDelayMs);
  }, [items.length, loadDelayMs, pageSize]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) loadMore();
      },
      { rootMargin: "240px 0px" },
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isLoading, loadMore]);

  return {
    hasMore,
    isLoading,
    sentinelRef,
    visibleItems: items.slice(0, visibleCount),
  };
}
