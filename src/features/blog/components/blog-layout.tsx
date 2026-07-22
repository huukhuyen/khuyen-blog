import type { PropsWithChildren } from 'react';
import { SiteHeader } from './site-header';
import { Sidebar } from './sidebar';

type BlogLayoutProps = PropsWithChildren<{ showHero?: boolean }>;

export function BlogLayout({ children, showHero = true }: BlogLayoutProps): JSX.Element {
  return (
    <div className="blog-shell">
      <SiteHeader />
      {showHero && <section className="blog-hero">
        <div className="blog-hero__content mx-auto px-5">
          <p>Nhật ký cá nhân</p>
          <h1>Biển rộng<br />trời cao,<br />cứ vẫy vùng.</h1>
          <span>Chuyện cuộc sống · Lập trình · Những điều đáng nhớ</span>
          <a className="blog-hero__scroll" href="#stories">Khám phá bài viết <b aria-hidden="true">↓</b></a>
        </div>
      </section>}
      <main className="blog-main mx-auto grid gap-10"><section id="stories">{children}</section><Sidebar /></main>
    </div>
  );
}
