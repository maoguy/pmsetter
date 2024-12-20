import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: '0.0.0.0'
  },
  optimizeDeps: {
    exclude: ['js-big-decimal']
  },
  plugins: [react()],
  base: "./",
});
