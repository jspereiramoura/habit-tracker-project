import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@/": "/src/"
    }
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/test/config.ts"],
    coverage: {
      provider: "istanbul",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*", "!src/test/**/*"],
      reportsDirectory: "src/test/coverage",
      extension: [".js", ".jsx", ".ts", ".tsx"]
    }
  }
});
