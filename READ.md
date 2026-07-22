# Huu Khuyen Portfolio

Portfolio/blog được chuyển sang React + Vite + TypeScript. Bài viết nằm trong `src/content/posts/` dưới dạng Markdown; UI dùng Tailwind và các primitive theo cấu trúc shadcn/ui.

## Yêu cầu

- Node.js 22.12+ (Vite 8)
- pnpm 10+

## Chạy local

```bash
pnpm install
pnpm dev
```

Mở `http://localhost:5173`.

## Kiểm tra và build

```bash
pnpm lint
pnpm build
pnpm preview
```

## Cấu trúc chính

- `src/content/posts/`: 22 bài viết Markdown.
- `src/features/blog/`: layout, danh sách và trang bài viết.
- `cv/`: CV Việt/Anh giữ nguyên template gốc.
- `src/components/ui/`: primitive UI theo shadcn/ui.
- `scripts/migrate-posts.mjs`: chuyển HTML cũ thành Markdown.
- `vite/posts-plugin.ts`: tách mỗi file `.md` thành hai module — `?frontmatter`
  (metadata, import eager cho trang danh sách) và `?body` (nội dung, import lazy
  khi mở bài viết). Nhờ vậy trang chủ không phải tải nội dung của mọi bài viết.
  Bài `visible: false` không được ship xuống client.
- `vite/seo-plugin.ts`: lúc build sinh `robots.txt`, `sitemap.xml`, và một shell
  HTML riêng cho từng route (`dist/coding/<slug>/index.html`) chứa thẻ
  title/description/canonical/OG. Xem mục **SEO** bên dưới.

## Routes

- `/`, `/coding`, `/nhung-dieu-dang-nho`, `/suu-tam`
- URL bài viết chuẩn: `/:category/:slug` (không có hậu tố `.html`)
- Các URL bài viết cũ có hậu tố `.html` tự chuyển về URL chuẩn
- `/cv`, `/cv/en`: hiện đang tắt trong `src/app/routes.tsx`

## SEO

Crawler của Facebook/Zalo/Twitter không chạy JavaScript, nên thẻ meta phải có sẵn
trong HTML thô. `vite/seo-plugin.ts` giải quyết bằng cách sinh một shell HTML cho
mỗi route lúc build — body vẫn để SPA render như thường.

- Sửa tên site, mô tả, ảnh OG mặc định tại `src/lib/site.ts`.
- Domain lấy từ biến môi trường `URL` (Netlify tự cấp), fallback về `SITE_URL`.
  Thêm domain riêng thì không cần sửa code.
- Khối `<!--seo:start--> ... <!--seo:end-->` trong `index.html` là chỗ plugin chèn
  thẻ; giá trị bên trong là mặc định dùng cho `pnpm dev`.
- Khi điều hướng trong SPA, `src/lib/use-seo.ts` cập nhật `<title>` và
  `description` (sửa thẻ có sẵn, không thêm thẻ mới).
- Bài `visible: false` bị loại khỏi sitemap và không có shell.

## Quản trị bài viết

- Truy cập `/admin/` sau khi website đã được deploy trên Netlify.
- Đăng nhập GitHub account có quyền ghi repository `huukhuyen/khuyen-blog` để tạo, sửa hoặc xoá post.
- Ảnh upload từ CMS được lưu tại `images/uploads/` và hiển thị tại `/images/uploads/`.
- Lần đầu, hãy import/relink repository này trong Netlify rồi hoàn tất cửa sổ uỷ quyền GitHub tại `/admin/`.
