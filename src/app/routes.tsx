import { lazy, useEffect } from "react";
import { Navigate, Route, Routes, useParams } from "react-router";
import { getArticlePath } from "@/lib/routes";

const ArticlePage = lazy(async () => ({
  default: (await import("@/features/blog/pages/article-page")).ArticlePage,
}));
const NotFoundPage = lazy(async () => ({
  default: (await import("@/features/blog/pages/not-found-page")).NotFoundPage,
}));
const PostListPage = lazy(async () => ({
  default: (await import("@/features/blog/pages/post-list-page")).PostListPage,
}));

/** Slug của các trang danh sách trên site HTML cũ, không phải bài viết. */
const LEGACY_LISTING_SLUGS = new Set(["index", "page-2"]);

function LegacyHtmlRedirect() {
  const { category, slug } = useParams();
  if (!category || !slug) return <Navigate replace to="/" />;
  if (LEGACY_LISTING_SLUGS.has(slug)) {
    return <Navigate replace to={`/${category}`} />;
  }

  return <Navigate replace to={getArticlePath(category, slug)} />;
}

function AdminRedirect(): null {
  useEffect(() => {
    window.location.replace("/admin/index.html");
  }, []);

  return null;
}

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<PostListPage />} path="/" />
      <Route element={<PostListPage />} path="/:category" />
      {/* URL `.html` cũ: bài viết về trang bài, `index`/`page-2` về trang danh mục. */}
      <Route element={<LegacyHtmlRedirect />} path="/:category/:slug.html" />
      <Route element={<ArticlePage />} path="/:category/:slug" />
      <Route element={<AdminRedirect />} path="/admin/*" />
      <Route element={<NotFoundPage />} path="*" />
    </Routes>
  );
}
