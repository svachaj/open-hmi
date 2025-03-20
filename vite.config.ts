/// <reference types="vitest" />
import { defineConfig } from "vitest/config";
import path from "path";

export default defineConfig({
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      // Global name for UMD/IIFE builds (if needed)
      name: "HmiWebComponents",
      // File name pattern for different module formats
      fileName: (format) => `open-hmi.${format}.js`,
    },
    rollupOptions: {
      // Specify external dependencies if any; for pure web components you may not need this.
      // external: [],
      output: {
        // Provide global variable names if external dependencies are specified.
        // globals: {}
      },
    },
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      exclude: ["node_modules/"],
    },
  },
});
