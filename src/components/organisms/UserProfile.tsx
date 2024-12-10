import React from "react";
import ProfileImage from "../atoms/ProfileImage";
import UserBadge from "../molecules/UserBadge";
import Text from "../atoms/Text";

interface UserProfileProps {
  photoURL?: string | null;
  email?: string | null;
  displayName?: string | null;
  grade?: string;
  onLogout?: () => void;
  className?: string;
}

const UserProfile: React.FC<UserProfileProps> = ({
  photoURL,
  email,
  displayName,
  grade = "일반회원",
  onLogout,
  className = "",
}) => {
  return (
    <div className={`p-2 px-4 ${className}`}>
      <div className="flex items-end">
        <ProfileImage size={100} src={photoURL ?? undefined} />
        {onLogout && (
          <Text
            className="text-red-400 text-sm font-bold ml-2 hover:cursor-pointer"
            onClick={onLogout}
          >
            로그아웃
          </Text>
        )}
      </div>
      <UserBadge email={email} grade={grade} className="my-2" />
      <Text className="text-gray-400">{displayName}</Text>
      <Text className="text-gray-400">
        {email === "이메일 없음" ? "" : "*********"}
      </Text>
    </div>
  );
};

export default UserProfile;
