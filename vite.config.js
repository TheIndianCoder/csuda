import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  chunkSizeWarningLimit: 1000,
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
  server: {
    watch: {
      usePolling: true,
    },
    host: true, // needed for the Docker Container port mapping to work
    strictPort: true,
    port: 80, // you can replace this port with any port
  },
  preview: {
    port: 80,
  },
});
