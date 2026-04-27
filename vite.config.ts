import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
// GitHub Pages project URL: /SilverLink/ (https://<user>.github.io/SilverLink/)
const repoBase = "/SilverLink/";

export default defineConfig(({ mode }) => ({
  base: mode === "development" ? "/" : repoBase,
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@data": path.resolve(__dirname, "./data"),
    },
  },
}));
