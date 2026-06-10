import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: process.env.GITHUB_PAGES === "true" ? "/AtomKit-UI/" : "/",
  root: "docs-app",
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5173,
  },
  build: {
    emptyOutDir: true,
    outDir: "../docs-static",
  },
});
