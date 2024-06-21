import { defineConfig } from "vite";

/**
 * Path to exercise folder
 */
const exercisePath = "src";

/**
 * Don't change those lines below
 */
export default defineConfig((config) => ({
  base: config.mode === "production" ? "/bestshop" : "/",
  root: exercisePath,
  server: {
    port: 3000,
  },
  build: {
    outDir: "../dist",
  },
}));