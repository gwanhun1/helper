import { initializeApp } from 'firebase/app';
import {
    getAuth,
    setPersistence,
    browserLocalPersistence,
} from 'firebase/auth';

const firebaseConfig = {
    apiKey: import.meta.env.VITE_API_KEY, // 환경 변수로 변경
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

// 인증 지속성 설정
setPersistence(auth, browserLocalPersistence).catch((error) => {
    console.error('Failed to set persistence:', error);
});

// 내보내기
export { app, auth };
