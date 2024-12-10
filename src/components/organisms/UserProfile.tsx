import React from "react";
import ProfileImage from "../atoms/ProfileImage";
import UserBadge from "../molecules/UserBadge";
import Text from "../atoms/Text";
import Badge from "../atoms/Badge";

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <ProfileImage size={100} src={photoURL ?? undefined} />
          <div className="flex flex-col gap-2">
            <Badge fontSize={10}>{grade}</Badge>
            {onLogout && (
              <Text
                className="text-red-400 text-sm font-bold hover:cursor-pointer"
                onClick={onLogout}
              >
                로그아웃
              </Text>
            )}
          </div>
        </div>
      </div>
      <UserBadge email={email} className="mt-4 mb-2" />
      <Text className="text-gray-400">{displayName}</Text>
      <Text className="text-gray-400">
        {email === "이메일 없음" ? "" : "*********"}
      </Text>
    </div>
  );
};

export default UserProfile;
