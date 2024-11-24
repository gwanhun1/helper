import React from 'react';
import { AiOutlineUser } from 'react-icons/ai';

interface ProfileImageProps {
    src?: string; // 이미지 URL (선택적)
    size?: number; // 이미지 크기 (픽셀 단위)
    alt?: string; // 대체 텍스트
}

const ProfileImage: React.FC<ProfileImageProps> = ({
    src,
    size = 50,
    alt = 'Profile Image',
}) => {
    return (
        <div
            style={{
                width: size,
                height: size,
                borderRadius: '50%', // 동그라미 모양
                overflow: 'hidden', // 이미지가 컨테이너를 벗어나지 않도록
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#f0f0f0', // 기본 배경색
            }}
        >
            {src ? (
                <img
                    src={src}
                    alt={alt}
                    style={{
                        width: size,
                        height: size,
                        objectFit: 'cover', // 이미지를 컨테이너에 맞게 잘라서 채움
                    }}
                />
            ) : (
                <AiOutlineUser
                    style={{
                        width: size,
                        height: size,
                        color: '#999', // 기본 아이콘 색상
                    }}
                />
            )}
        </div>
    );
};

export default ProfileImage;
