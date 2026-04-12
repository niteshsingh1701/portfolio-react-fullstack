import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  
  return {
    plugins: [react()],
    server: {
      port: 4500,
      proxy: {
        // Proxy all /api requests to Express backend
        "/api": {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          secure: false,
        },
      },
    },
    build: {
      // Use esbuild for faster minification (default in Vite 5)
      minify: "esbuild",
      // Split CSS into separate files per chunk
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          // Split large vendor libraries into separate chunks
          manualChunks: {
            "vendor-react": ["react", "react-dom", "react-router-dom"],
            "vendor-gsap": ["gsap"],
            "vendor-axios": ["axios"],
          },
        },
      },
    },
  };
});
