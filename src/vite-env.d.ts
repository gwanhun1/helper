/// <reference types="vite/client" />

interface ImportMetaEnv {
  VITE_KAKAO_REST_API_KEY: string;
  VITE_KAKAO_REDIRECT_URI: string;
  // 필요한 다른 환경 변수를 여기에 추가
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
