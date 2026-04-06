import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  server: {
    port: 3000,
  },
  build: {
    outDir: "dist",
    minify: "esbuild",
    sourcemap: false,
    rollupOptions: {
      output: {
        assetFileNames: (assetInfo) => {
          if (!assetInfo.name) return `assets/[name].[ext]`;
          const extType = assetInfo.name.split(".").pop();
          if (extType && /png|jpe?g|svg|gif|tiff|bmp|ico|webp/i.test(extType)) {
            // Keep original names for images
            return `assets/[name].[ext]`;
          }
          return `assets/[name].[ext]`;
        },
      },
    },
    assetsInlineLimit: 4096,
  },
  preview: {
    port: 4173,
  },
});
