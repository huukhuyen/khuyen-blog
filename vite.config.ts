import path from 'node:path';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        { src: 'images/*.*', dest: 'images', rename: { stripBase: true } },
        { src: 'images/ccs/*', dest: 'images/ccs', rename: { stripBase: true } },
        { src: 'images/kn/*', dest: 'images/kn', rename: { stripBase: true } },
        { src: 'images/uploads/*', dest: 'images/uploads', rename: { stripBase: true } },
        { src: 'images/signature/*', dest: 'images/signature', rename: { stripBase: true } },
        { src: 'cv/images/*', dest: 'cv/images', rename: { stripBase: true } },
        { src: 'cv/images/clients/*', dest: 'cv/images/clients', rename: { stripBase: true } },
        { src: 'cv/css/*.css', dest: 'cv/css', rename: { stripBase: true } },
        { src: 'cv/css/template-colors/*.css', dest: 'cv/css/template-colors', rename: { stripBase: true } },
        { src: 'cv/js/*.js', dest: 'cv/js', rename: { stripBase: true } },
        { src: 'cv/index.html', dest: 'cv', rename: { stripBase: true } },
        { src: 'cv/en.html', dest: 'cv', rename: { stripBase: true } },
        { src: 'favicon.ico', dest: '.', rename: { stripBase: true } },
        { src: 'cv/logo.ico', dest: 'cv', rename: { stripBase: true } },
      ],
    }),
  ],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
});
