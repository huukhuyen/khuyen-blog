import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";
import { parseMarkdown } from "./posts-source";

/**
 * Tách mỗi file markdown thành hai module độc lập:
 *
 * - `bai-viet.md?frontmatter` → metadata đã parse, import eager cho trang danh sách.
 * - `bai-viet.md?body`        → nội dung markdown, import lazy khi mở bài viết.
 *
 * Nhờ vậy body không bị gom vào chunk chung (trước đây trang chủ phải tải toàn bộ
 * nội dung mọi bài chỉ để render vài card), và `yaml` chỉ chạy lúc build thay vì
 * đi kèm bundle phía client.
 */
export function postsPlugin(): Plugin {
  return {
    name: "posts",
    async load(id) {
      const [file, search = ""] = id.split("?");
      if (!file.endsWith(".md")) return null;

      const params = new URLSearchParams(search);
      const wantsBody = params.has("body");
      if (!wantsBody && !params.has("frontmatter")) return null;

      const parsed = parseMarkdown(await readFile(file, "utf8"), file);
      // Bài `visible: false` không được ship xuống client, kể cả metadata.
      if (parsed.data.visible === false) {
        return `export default ${wantsBody ? '""' : "null"};`;
      }

      const value = wantsBody ? parsed.body : parsed.data;
      return `export default ${JSON.stringify(value)};`;
    },
  };
}
