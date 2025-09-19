import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import { nodePolyfills } from "vite-plugin-node-polyfills";

export default defineConfig({
  test: {
    globals: true,
  },
  plugins: [
    react(),
    nodePolyfills({
      include: ["events"],
      globals: {
        Buffer: false,
        global: false,
        process: true,
      },
    }),
  ],
});
