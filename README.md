# WorryHelper

AI 조언과 함께 고민을 기본 비공개로 기록하는 모바일 중심 웹 서비스입니다. 기록은 마음의 숲에 쌓이고, 직접 선택한 기분만 리포트에 표시합니다. 원할 때만 고민과 조언을 커뮤니티에 익명으로 공유할 수 있습니다.

운영 주소: https://worryhelper.shop

## 주요 흐름

- 카카오 로그인 → 고민·기분 작성 → AI 조언 → 저장 확인 → 내 숲의 기록 상세
- 내 기록에서 공유·비공개 전환·삭제
- 로그인 없이 공개된 고민 열람, 로그인 후 응원·댓글
- 감정 풀기는 서버 전송과 저장 없이 화면에서만 사용
- 하루 10회 무료 상담, 한국 시간 오전 0시에 일일 한도 갱신

기분 리포트는 사용자의 1~5단계 선택 기록이며 진단이나 AI 감정 분석이 아닙니다. 과거 자동 생성 점수는 통계에서 제외합니다. AI 조언은 전문 상담이나 진단을 대신하지 않습니다.

## 개발과 검증

Node.js 22를 사용합니다. 운영 Vercel 프로젝트도 Node.js 22로 고정합니다.

```sh
npm ci
cp .env.example .env.local
# 필요한 환경변수 입력
npm run dev
npm run typecheck
npm run lint
npm test
npm run build
```

`npm run dev`는 Vite 안에서 운영과 같은 API 핸들러를 실행합니다. UI만 보는 경우 공개 Firebase 키만 있으면 되지만, 로그인·상담·서버 변경 작업에는 서버 환경변수도 필요합니다. `npm run preview`는 정적 빌드 확인용이며 API를 실행하지 않습니다.

## 환경변수

- `VITE_API_KEY`: 공개 Firebase 웹 API 키. 브라우저에 전달하는 유일한 환경변수입니다.
- `FIREBASE_SERVICE_ACCOUNT`: 서버 전용 Firebase 서비스 계정 JSON. 로컬 `.env.local`에는 압축 JSON 전체를 작은따옴표로 감싸 저장하세요.
- `KAKAO_REST_API_KEY`, `KAKAO_SECRET_KEY`: 서버 전용 OAuth 설정.
- `DIFY_API_KEY`, `DIFY_BASE_URL`: 서버 전용 AI 설정.

비밀값은 `VITE_` 접두사로 설정하지 않습니다. Vite 환경변수 공개 범위도 `VITE_API_KEY`로 제한했습니다. 카카오 리다이렉트 허용 주소는 각 origin의 `/auth/kakao/callback`입니다. OAuth는 서버에서 state 쿠키를 검증하고 코드를 교환합니다.

## 데이터와 접근 권한

- `privateRecords/{uid}/{id}`: 소유자만 읽을 수 있는 개인 기록.
- `publicContents/{id}`: 공유 동의를 한 고민과 조언. 공개 피드에는 기분 점수·프로필 이름·이메일을 넣지 않습니다.
- `users/{uid}/counseling`: 서버가 관리하는 일일 이용량.
- `users/{uid}/requests/{requestId}`: 중복 요청과 저장 재시도를 위한 상태. 완료 시 응답 복사본을 제거하고 삭제 요청은 다시 생성하지 못하도록 표시합니다.

브라우저 쓰기는 DB 규칙으로 차단합니다. `/api/chat`, `/api/records`, `/api/community`는 Firebase ID 토큰을 검증한 후 서버에서 변경합니다. 기록별 잠금으로 공개 설정과 삭제·저장 재시도의 충돌을 막습니다. `database.rules.json`이 운영 권한의 원본입니다.

## 배포와 이전

```sh
vercel link --project helper
vercel env ls
# 필요한 값은 안전한 stdin 또는 Vercel 설정에서 입력
npm run build
vercel deploy --yes --archive=tgz
# 프리뷰 검증 후 main 병합과 운영 배포
vercel deploy --prod --yes --archive=tgz
```

기존 데이터 이전은 `scripts/migrate-records.mjs`로 수행합니다. 기본 실행은 백업과 dry-run만 수행하며 `--apply`가 있어야 실제 이전합니다. `HELPER_SERVICE_ACCOUNT_PATH`로 개인 서비스 계정 파일 경로를 지정합니다. 소유자는 기존 사용자의 contentIds 인덱스로만 확인하며 이름으로 추측하지 않습니다. 소유자를 확인한 과거 기록은 비공개로 옮깁니다. 확인할 수 없는 원본은 접근을 차단한 legacy 경로와 로컬 백업에 보존합니다.

Firebase 규칙 배포:

```sh
npx firebase-tools deploy --only database --project helper-8a110
```

규칙 변경과 웹 배포는 함께 수행해야 합니다. 공개·개인 경로를 분리한 이후에는 예전 웹 버전으로 단순 롤백하면 데이터 읽기가 실패합니다. 장애 시 보호 규칙을 유지하고 수정 배포를 우선하며, 이전 규칙을 복구해 개인 기록을 노출하지 않습니다.

## 네이티브 프로토타입

`mobile/`은 지도와 답장 중심의 별도 React Native CLI 데모입니다. 운영 웹과 연결된 앱이 아닙니다. 데모 범위와 실행 방법은 [mobile/README.md](mobile/README.md)를 참고하세요.
