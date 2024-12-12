/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_KAKAO_REST_API_KEY: string;
  VITE_KAKAO_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
