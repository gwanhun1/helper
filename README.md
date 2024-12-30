# HELPER
OPEN AI 기반 고민 상담 서비스(고민지우개 마이그레이션)  
HELPER는 최신 JavaScript 프레임워크와 라이브러리로 구축된 웹 애플리케이션입니다. 생산성과 사용자 경험을 향상시키기 위한 다양한 기능을 제공합니다.

## 기능

- **React & TypeScript**: React의 강력함을 활용하여 동적 사용자 인터페이스를 구축하고 TypeScript로 타입 안전성을 제공합니다.
- **라우팅**: `react-router-dom`을 사용하여 원활한 네비게이션을 구현했습니다.
- **상태 관리**: `zustand`를 사용하여 효율적이고 확장 가능한 상태 관리를 수행합니다.
- **데이터 시각화**: `chart.js` 및 `react-chartjs-2`와 통합하여 인터랙티브한 차트와 데이터 시각화를 제공합니다.
- **애니메이션**: `framer-motion` 및 `lottie-react`로 매끄러운 애니메이션과 전환을 강화했습니다.
- **알림**: `react-hot-toast`를 사용하여 실시간 알림을 제공합니다.
- **API 통합**: `axios`를 사용하여 외부 서비스와 통신합니다.

## 기술 스택
- **Frontend**: ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)  
- **State Management**: ![Zustand](https://img.shields.io/badge/Zustand-ffc107?style=flat&logo=redux&logoColor=white)  
- **API**: ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white)  
- **Animation**: ![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat&logo=framer&logoColor=white)  

## 프로젝트 구조

- **src**: 소스 코드가 위치한 디렉토리
  - **components**: UI 컴포넌트들이 모여 있는 디렉토리
    - **atoms**: 기본 UI 요소들
    - **molecules**: 조합된 UI 요소들
    - **organisms**: 복잡한 UI 구성 요소들
    - **pages**: 각 페이지 컴포넌트들
    - **templates**: 페이지 레이아웃 템플릿
  - **constants**: 상수 값들이 정의된 디렉토리
  - **data**: 데이터 관련 파일
  - **hooks**: 커스텀 훅
  - **router**: 라우팅 관련 파일
  - **store**: 상태 관리 관련 파일
  - **styles**: 스타일 파일
  - **types**: 타입 정의 파일
  - **utils**: 유틸리티 함수

## 배포
- **호스팅 플랫폼**: Vercel  
- **인증**: Firebase Authentication  
- **데이터베이스**: Firebase Realtime Database  

## 페이지 기능

- **HomePage**: 애플리케이션의 메인 페이지로, 사용자에게 주요 기능과 정보를 제공합니다.
- **UserPage**: 사용자 정보와 관련된 페이지로, 인증된 사용자만 접근 가능합니다.
- **WorryPage**: 사용자의 고민을 기록하고 관리하는 페이지입니다.
- **CreditPage**: 애플리케이션의 크레딧 정보를 표시합니다.
- **AuthPage**: 사용자 인증을 위한 페이지입니다.
- **AdvicePage**: 사용자에게 조언을 제공하는 페이지로, 인증된 사용자만 접근 가능합니다.
- **ErrorPage**: 잘못된 경로로 접근 시 표시되는 에러 페이지입니다.
- **KakaoAuthSection**: 카카오 인증을 위한 콜백 페이지입니다.

## 설치

프로젝트를 시작하려면, 저장소를 클론하고 종속성을 설치하세요:

```bash
git clone <repository-url>
cd helper
npm install
```

## 사용법

### 개발 서버 실행

다음 명령어로 개발 서버를 실행할 수 있습니다:

```bash
npm run dev
```

### 프로덕션 빌드

프로덕션 환경용 빌드를 생성하려면 다음 명령어를 사용하세요:

```bash
npm run build
```

## 향후 업데이트
- **사용자 맞춤형 알림 기능 추가**: 각 사용자별 맞춤화된 알림 제공  
- **관리자 페이지 구축**: 관리 기능을 위한 관리자 인터페이스 개발  
- **UI/UX 디자인 최적화**: 사용자 경험을 개선하기 위한 디자인 업데이트  

## 시연
| 페이지            | 설명                        | 데모                                                                                                                |
|-------------------|-----------------------------|---------------------------------------------------------------------------------------------------------------------|
| **HomePage**      | 메인 페이지의 주요 기능과 정보 탐색 | <img src="https://github.com/user-attachments/assets/0ff3125d-80e8-4cef-af64-14d6410bda7b" style="width:300px;">    |
| **WorryPage**     | 고민 기록 및 관리 기능        | <img src="https://github.com/user-attachments/assets/0836c633-dabf-441b-bdf3-1123c8dd1b3c" style="width:300px;">   |
| **AdvicePage**    | 조언 제공 및 상호작용        | <img src="https://github.com/user-attachments/assets/e78c8c30-b370-4580-99e4-e8b2d7f5a624" style="width:300px;">   |
| **AdviceListPage**| 조언 리스트 페이지           | <img src="https://github.com/user-attachments/assets/81eb12d0-d3bc-4e7b-83e6-668dfb1f1d59" style="width:300px;">   |
| **AuthPage**      | 로그인 및 회원가입 프로세스   | <img src="https://github.com/user-attachments/assets/07e61615-479c-4f35-96e5-6bc6fc0b1e1a" style="width:300px;">   |
| **MyPage**        | 마이페이지                  | <img src="https://github.com/user-attachments/assets/1d4d1dc4-e430-4504-923a-090aa2063ca2" style="width:300px;">   |

# 사이트 주소
[https://worryhelper.store/](https://worryhelper.store/)
