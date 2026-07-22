export function BlogHero() {
  return (
    <section className="blog-hero">
      <div className="blog-hero__content mx-auto px-5">
        <p>Nhật ký cá nhân</p>
        <h1>
          Biển rộng
          <br />
          trời cao,
          <br />
          cứ vẫy vùng.
        </h1>
        <span>Chuyện cuộc sống · Lập trình · Những điều đáng nhớ</span>
        <a className="blog-hero__scroll" href="#stories">
          Khám phá bài viết <b aria-hidden="true">↓</b>
        </a>
      </div>
    </section>
  );
}
