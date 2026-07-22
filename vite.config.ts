import path from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import { viteStaticCopy } from "vite-plugin-static-copy";
import { postsPlugin } from "./vite/posts-plugin";
import { seoPlugin } from "./vite/seo-plugin";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    postsPlugin(),
    seoPlugin(),
    viteStaticCopy({
      // `stripBase: 1` chỉ bỏ đúng đoạn thư mục gốc nên cấu trúc con được giữ nguyên.
      targets: [
        { src: "images/**/*", dest: "images", rename: { stripBase: 1 } },
        { src: "cv/**/*", dest: "cv", rename: { stripBase: 1 } },
        { src: "favicon.ico", dest: "." },
      ],
    }),
  ],
  resolve: { alias: { "@": path.resolve(__dirname, "./src") } },
});
