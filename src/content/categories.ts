/**
 * Nguồn duy nhất cho danh mục bài viết: slug → nhãn hiển thị.
 * Thứ tự khai báo cũng là thứ tự hiển thị trên menu.
 */
export const POST_CATEGORIES = {
  "nhung-dieu-dang-nho": "Những điều đáng nhớ",
  coding: "Chia sẻ coding",
  "suu-tam": "Sưu tầm",
} as const;

export type PostCategory = keyof typeof POST_CATEGORIES;

export function isPostCategory(value: unknown): value is PostCategory {
  return typeof value === "string" && Object.hasOwn(POST_CATEGORIES, value);
}
