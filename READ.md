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

## Routes

- `/`, `/coding`, `/nhung-dieu-dang-nho`, `/suu-tam`
- URL bài viết chuẩn: `/:category/:slug` (không có hậu tố `.html`)
- Các URL bài viết cũ có hậu tố `.html` tự chuyển về URL chuẩn
- `/cv`, `/cv/en`

## Quản trị bài viết

- Truy cập `/admin/` sau khi website đã được deploy trên Netlify.
- Đăng nhập GitHub account có quyền ghi repository `huukhuyen/khuyen-blog` để tạo, sửa hoặc xoá post.
- Ảnh upload từ CMS được lưu tại `images/uploads/` và hiển thị tại `/images/uploads/`.
- Lần đầu, hãy import/relink repository này trong Netlify rồi hoàn tất cửa sổ uỷ quyền GitHub tại `/admin/`.
