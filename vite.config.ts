import { defineConfig } from "vite";
import { resolve } from "node:path";

export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, "src/main.ts"),
      name: "bundle",
      fileName: "bundle",
    },
    outDir: "docs/assets/vite",
  },
});
