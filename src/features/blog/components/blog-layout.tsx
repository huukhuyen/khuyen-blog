import type { PropsWithChildren } from "react";
import { useLocation } from "react-router";
import { BlogHero } from "./blog-hero";
import { Sidebar } from "./sidebar";
import { SiteFooter } from "./site-footer";
import { SiteHeader } from "./site-header";

type BlogLayoutProps = PropsWithChildren<{
  /** Tiêu đề cấp 1 cho các trang không có hero (ví dụ trang danh mục). */
  heading?: string;
  showFooter?: boolean;
}>;

export function BlogLayout({
  children,
  heading,
  showFooter = true,
}: BlogLayoutProps) {
  const { pathname } = useLocation();

  return (
    <div className="blog-shell">
      <SiteHeader />
      {pathname === "/" && <BlogHero />}
      <main className="blog-main mx-auto grid gap-10">
        <section className="blog-stories" id="stories">
          {heading && <h1 className="blog-stories__heading">{heading}</h1>}
          {children}
        </section>
        <Sidebar />
      </main>
      {showFooter && <SiteFooter />}
    </div>
  );
}
