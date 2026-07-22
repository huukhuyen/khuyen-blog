import { lazy, useEffect } from 'react';
import { Navigate, Route, Routes, useParams } from 'react-router-dom';

const ArticlePage = lazy(async () => ({
  default: (await import('@/features/blog/pages/article-page')).ArticlePage,
}));
const NotFoundPage = lazy(async () => ({
  default: (await import('@/features/blog/pages/not-found-page')).NotFoundPage,
}));
const PostListPage = lazy(async () => ({
  default: (await import('@/features/blog/pages/post-list-page')).PostListPage,
}));

export function getArticlePath(category: string, slug: string): string {
  return `/${category}/${slug}`;
}

function LegacyArticleRedirect(): JSX.Element {
  const { category, slug } = useParams();
  if (!category || !slug) return <Navigate replace to="/" />;

  return <Navigate replace to={getArticlePath(category, slug)} />;
}

function AdminRedirect(): null {
  useEffect(() => {
    window.location.replace('/admin/index.html');
  }, []);

  return null;
}

export function AppRoutes(): JSX.Element {
  return (
    <Routes>
      <Route element={<PostListPage />} path="/" />
      <Route element={<Navigate replace to="/page-2" />} path="/page-2.html" />
      <Route element={<PostListPage />} path="/page-2" />
      <Route element={<PostListPage />} path="/:category" />
      <Route element={<PostListPage />} path="/:category/" />
      <Route element={<LegacyArticleRedirect />} path="/:category/:slug.html" />
      <Route element={<ArticlePage />} path="/:category/:slug" />
      {/* <Route element={<Navigate replace to="/cv/index.html" />} path="/cv" />
      <Route element={<Navigate replace to="/cv/en.html" />} path="/cv/en" /> */}
      <Route element={<AdminRedirect />} path="/admin/*" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
