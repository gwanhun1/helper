import React from "react";
import { AiOutlineUser } from "react-icons/ai";

interface ProfileImageProps {
  src?: string; 
  size?: number; 
  alt?: string; 
  className?: string;
}

const ProfileImage = ({
  src,
  size = 50,
  alt = "Profile Image",
  className = "",
}:ProfileImageProps) => {
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
