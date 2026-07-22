import { ArrowUpRight } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { getArticlePath } from '@/app/routes';
import type { Post } from '@/types/post';

function formatDate(date: string): string {
  return new Intl.DateTimeFormat('vi-VN', { dateStyle: 'long' }).format(new Date(`${date}T00:00:00`));
}

export function PostCard({ post }: { post: Post }): JSX.Element {
  const href = getArticlePath(post.category, post.slug);
  const [imageUnavailable, setImageUnavailable] = useState(!post.featuredImage);

  return (
    <article className="post-card">
      <div className="post-card__content">
        <p className="post-card__category">{post.category.replaceAll('-', ' ')} <span /> {formatDate(post.publishedAt)}</p>
        <h2><Link to={href}>{post.title}</Link></h2>
        <p className="post-card__summary">{post.summary}</p>
        <Link className="post-card__cta" to={href}>Xem thêm <ArrowUpRight size={18} /></Link>
      </div>
      <div className="post-card__media">
        {imageUnavailable ? (
          <div aria-hidden="true" className="post-card__fallback"><span>{post.category.replaceAll('-', ' ')}</span><strong>{post.title.slice(0, 1)}</strong></div>
        ) : (
          <Link to={href}><img alt={post.featuredImageAlt} loading="lazy" onError={() => setImageUnavailable(true)} src={post.featuredImage} /></Link>
        )}
      </div>
    </article>
  );
}
