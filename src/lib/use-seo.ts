import { useEffect } from "react";
import { toPageTitle } from "./site";

function setMetaContent(selector: string, content: string): void {
  const element = document.head.querySelector(selector);
  if (element) element.setAttribute("content", content);
}

/**
 * Cập nhật tiêu đề và mô tả khi điều hướng trong SPA.
 *
 * Thẻ meta đầy đủ (canonical, OG, Twitter) do shell HTML tĩnh của từng route cung
 * cấp lúc build — crawler chỉ đọc HTML thô nên không cần cập nhật chúng ở client.
 * Hook này sửa trực tiếp thẻ có sẵn thay vì thêm thẻ mới để không bị trùng.
 */
export function useSeo(title: string | undefined, description: string): void {
  useEffect(() => {
    document.title = toPageTitle(title);
    setMetaContent('meta[name="description"]', description);
  }, [description, title]);
}
