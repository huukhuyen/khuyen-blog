import type { Ref } from "react";

interface InlineLoaderProps {
  /** Bỏ trống để giữ chỗ mà chưa hiện spinner (dùng làm sentinel cuộn). */
  label?: string;
  ref?: Ref<HTMLDivElement>;
}

export function InlineLoader({ label, ref }: InlineLoaderProps) {
  return (
    <div
      aria-live="polite"
      className="post-list-loader"
      ref={ref}
      role="status"
    >
      {label && (
        <>
          <span aria-hidden="true" className="post-list-loader__spinner" />
          {label}
        </>
      )}
    </div>
  );
}
