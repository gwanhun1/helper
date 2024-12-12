import React from "react";
import { AiOutlineUser } from "react-icons/ai";

interface ProfileImageProps {
  src?: string; // 이미지 URL (선택적)
  size?: number; // 이미지 크기 (픽셀 단위)
  alt?: string; // 대체 텍스트
  className?: string;
}

const ProfileImage: React.FC<ProfileImageProps> = ({
  src,
  size = 50,
  alt = "Profile Image",
  className = "",
}) => {
  return (
    <div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: "50%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f0f0",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          style={{
            width: size,
            height: size,
            objectFit: "cover",
          }}
        />
      ) : (
        <AiOutlineUser
          style={{
            width: size,
            height: size,
            color: "#999",
          }}
        />
      )}
    </div>
  );
};

export default ProfileImage;
