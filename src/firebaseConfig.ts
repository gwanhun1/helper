import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';

// VITE_API_KEY가 없으면 Firebase 초기화 단계에서 auth/invalid-api-key 에러가
// 발생해 앱 전체가 흰 화면으로 죽는다. 로컬에서 키 없이도 UI를 확인할 수 있도록,
// 키가 비어 있을 때는 경고만 남기고 플레이스홀더로 대체해 크래시를 막는다.
// (인증 기능은 동작하지 않으며, 실제 인증을 쓰려면 .env.local에 키를 넣어야 한다.)
const apiKey = import.meta.env.VITE_API_KEY ?? '';

if (!apiKey) {
    console.warn(
        '[firebase] VITE_API_KEY가 설정되지 않았습니다. ' +
            'UI는 정상 렌더링되지만 로그인 등 인증 기능은 동작하지 않습니다. ' +
            '.env.local에 VITE_API_KEY를 추가하고 dev 서버를 재시작하세요.'
    );
}

const firebaseConfig = {
    apiKey: apiKey || 'missing-api-key', // 비어 있으면 크래시되므로 플레이스홀더 사용
    authDomain: 'helper-8a110.firebaseapp.com',
    databaseURL:
        'https://helper-8a110-default-rtdb.asia-southeast1.firebasedatabase.app',
    projectId: 'helper-8a110',
    storageBucket: 'helper-8a110.appspot.com',
    messagingSenderId: '380253246935',
    appId: '1:380253246935:web:7824581f9dc0e1bbdce792',
    measurementId: 'G-PRM20B20JD',
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 초기화
const auth = getAuth(app);

// 인증 지속성 설정 (네트워크 호출이 아니므로 키 없이도 안전)
setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Failed to set persistence:', error);
});

// 내보내기
export { app, auth };
