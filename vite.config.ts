import { defineConfig, loadEnv } from "vite";
import { localApi } from "./server/vite-api";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  for (const key of [
    "FIREBASE_SERVICE_ACCOUNT",
    "DIFY_API_KEY",
    "DIFY_BASE_URL",
    "KAKAO_REST_API_KEY",
    "KAKAO_SECRET_KEY",
  ]) {
    if (env[key]) process.env[key] = env[key];
  }
  return {
    plugins: [react(), localApi()],
    envPrefix: ["VITE_API_KEY"],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        "@utils": path.resolve(__dirname, "./src/utils"),
        "@components": path.resolve(__dirname, "./src/components"),
        "@hooks": path.resolve(__dirname, "./src/hooks"),
        "@types": path.resolve(__dirname, "./src/types"),
      },
      dedupe: ["react", "react-dom"],
      mainFields: ["module", "main", "browser"],
    },
    optimizeDeps: {
      include: [
        "firebase/app",
        "firebase/auth",
        "firebase/firestore",
        "firebase/storage",
      ],
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ["react", "react-dom", "zustand"],
            firebase: [
              "firebase/app",
              "firebase/auth",
              "firebase/firestore",
              "firebase/storage",
            ],
            utils: ["./src/utils/index"],
          },
        },
      },
      sourcemap: false,
      commonjsOptions: {
        include: [/node_modules/],
        transformMixedEsModules: true,
      },
    },
  };
});
