import { useEffect } from 'react';
import { getAuth, OAuthProvider, signInWithCredential } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import useUserStore from '../../store/userStore';

const KakaoAuth = () => {
    const navigate = useNavigate();
    const setUser = useUserStore((state) => state.setUser); // 상태 업데이트 함수

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code'); // 카카오에서 반환된 'code'를 가져옴

        // code가 없으면 함수 실행을 종료
        if (!code) {
            return;
        }

        // 카카오 API로 access_token을 요청
        fetch('https://kauth.kakao.com/oauth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: import.meta.env.VITE_KAKAO_REST_API_KEY, // 환경 변수에서 카카오 API 키 가져오기
                redirect_uri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
                client_secret: import.meta.env.VITE_KAKAO_SECRET_KEY, // 환경 변수에서 카카오 비밀 키 가져오기
                code: code, // URL에서 가져온 'code'
            }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.access_token) {
                    // access_token을 Firebase와 연동
                    const auth = getAuth();
                    const provider = new OAuthProvider('kakao.com');

                    // 카카오 로그인 인증 정보로 Firebase 로그인 시도
                    signInWithCredential(
                        auth,
                        provider.credential({ idToken: data.id_token })
                    )
                        .then((result) => {
                            const user = result.user;
                            alert('환영합니다!🎉');

                            // Firebase 로그인 후 사용자 정보를 상태에 저장
                            setUser({
                                uid: user.uid,
                                displayName: user.displayName || '이름 없음',
                                email: user.email || '이메일 없음',
                                photoURL:
                                    user.photoURL ||
                                    'https://example.com/default-avatar.jpg', // 기본 아바타 URL
                            });

                            // 로그인 후 '/' (홈 페이지)로 리디렉션
                            navigate('/');
                        })
                        .catch((error) => {
                            alert('로그인에 실패하셨습니다.😭');
                            console.error('Firebase 로그인 실패:', error);
                            navigate('/auth'); // 로그인 실패 시 인증 페이지로 이동
                        });
                } else {
                    console.error(
                        'Access token이 없거나 잘못된 응답이 반환되었습니다:',
                        data
                    );
                    alert('로그인에 실패했습니다. 다시 시도해주세요.');
                }
            })
            .catch((error) => {
                console.error('카카오 로그인 실패:', error);
                alert('카카오 로그인 요청 중 오류가 발생했습니다.');
            });
    }, [navigate, setUser]); // navigate, setUser를 의존성 배열에 추가

    return <div>카카오 로그인 처리 중...</div>;
};

export default KakaoAuth;
