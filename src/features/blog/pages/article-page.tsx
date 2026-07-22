import { CalendarDays } from 'lucide-react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { getPost, getPostByAlias } from '@/content/posts';
import { BlogLayout } from '../components/blog-layout';
import { ArticleContent } from '../components/article-content';

export function ArticlePage(): JSX.Element {
  const { category = '', slug = '' } = useParams();
  const location = useLocation();
  const post = getPost(category, slug) ?? getPostByAlias(location.pathname);
  if (!post) return <Navigate replace to="/" />;
  return <BlogLayout showHero={false}><article className="article-panel"><p className="article-panel__category">{post.category.replaceAll('-', ' ')}</p><h1>{post.title}</h1><p className="article-panel__date mt-5 flex items-center gap-2"><CalendarDays size={16} />{post.publishedAt}</p>
    {/* {post.featuredImage && <img alt={post.featuredImageAlt} className="article-panel__image my-8 max-h-[32rem] w-full object-cover" src={post.featuredImage} />} */}
    <ArticleContent post={post} />
  </article></BlogLayout>;
}
