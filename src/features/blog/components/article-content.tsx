import type { ComponentProps, ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import type { Post } from '@/types/post';

const allowedHosts = new Set(['viblo.asia', 'jsfiddle.net']);

function EmbeddedFrame({ source }: { source: string }): JSX.Element | null {
  if (!source) return null;
  const url = new URL(source, window.location.origin);
  if (!allowedHosts.has(url.hostname)) return null;
  return <iframe className="my-6 h-96 w-full rounded border" loading="lazy" sandbox="allow-scripts allow-same-origin" src={source} title="Ví dụ nhúng" />;
}

function Paragraph({ children, post, ...props }: ComponentProps<'p'> & { post: Post }): JSX.Element {
  const text = Array.isArray(children) ? children.join('') : children;
  const token = typeof text === 'string' ? text.match(/^\{\{embed:(\d+)\}\}$/) : null;
  if (token) return <EmbeddedFrame source={post.embeds[Number(token[1])]} />;
  return <p {...props}>{children as ReactNode}</p>;
}

export function ArticleContent({ post }: { post: Post }): JSX.Element {
  return <div className="article-content"><ReactMarkdown components={{ p: (props) => <Paragraph {...props} post={post} /> }} remarkPlugins={[remarkGfm]}>{post.body}</ReactMarkdown></div>;
}
