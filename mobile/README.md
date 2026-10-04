# WorryHelper 마음 지도 프로토타입

React Native CLI 기반의 별도 네이티브 데모입니다. 화면의 지도·고민·답장·통계는 seed 예시 데이터이며, 실제 카카오 로그인·작성 저장·답장 전송은 연결되어 있지 않습니다. 데모 버튼을 인증 성공이나 저장 성공으로 안내하지 않습니다. 운영 웹 서비스는 https://worryhelper.shop 입니다.

```sh
npm ci
npm start
# 다른 터미널
npm run ios
# 또는
npm run android
```

iOS는 Xcode와 CocoaPods, Android는 Android Studio/JDK 및 네이버 지도 SDK 설정이 필요합니다. 설치·권한 설정은 해당 네이티브 프로젝트의 구성을 확인하세요. `npm run lint`와 `npx tsc --noEmit`으로 소스를 확인할 수 있습니다. 웹의 배포와 네이티브 앱 배포는 별개입니다.
