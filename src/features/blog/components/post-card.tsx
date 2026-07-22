import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { POST_CATEGORIES } from "@/content/categories";
import type { Post } from "@/content/posts";
import { formatDate } from "@/lib/format-date";
import { getArticlePath } from "@/lib/routes";

export function PostCard({ post }: { post: Post }) {
  const href = getArticlePath(post.category, post.slug);
  const categoryLabel = POST_CATEGORIES[post.category];
  const [hasImage, setHasImage] = useState(Boolean(post.featuredImage));

  return (
    <article className="post-card">
      <div className="post-card__content">
        <p className="post-card__category">
          {categoryLabel} <span />{" "}
          <time dateTime={post.publishedAt}>
            {formatDate(post.publishedAt)}
          </time>
        </p>
        <h2>
          <Link to={href}>{post.title}</Link>
        </h2>
        <p className="post-card__summary">{post.summary}</p>
        <Link className="post-card__cta" to={href}>
          Xem thêm <ArrowUpRight size={18} />
        </Link>
      </div>
      <div className="post-card__media">
        {hasImage ? (
          <Link to={href}>
            <img
              alt={post.featuredImageAlt}
              loading="lazy"
              onError={() => setHasImage(false)}
              src={post.featuredImage}
            />
          </Link>
        ) : (
          <div aria-hidden="true" className="post-card__fallback">
            <span>{categoryLabel}</span>
            <strong>{post.title.slice(0, 1)}</strong>
          </div>
        )}
      </div>
    </article>
  );
}
