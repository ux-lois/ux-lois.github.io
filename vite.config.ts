import { defineConfig } from "vite";
import { resolve } from "node:path";

import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "bundle",
      fileName: "bundle",
    },
    outDir: "docs/assets/vite",
    sourcemap: "inline",
  },
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  define: { "process.env.NODE_ENV": '"production"' },
});
