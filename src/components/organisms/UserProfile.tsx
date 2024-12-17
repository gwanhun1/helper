import React from "react";
import ProfileImage from "../atoms/ProfileImage";
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

const UserProfile = ({
  photoURL,
  email,
  displayName,
  grade = "일반회원",
  onLogout,
  className = "",
}:UserProfileProps) => {
  return (
    <div className={`p-5 ${className}`}>
      <div className="flex items-start gap-4">
        <div className="relative">
          <ProfileImage
            size={80}
            src={photoURL ?? undefined}
            className="rounded-[16px] border-2 border-green-500"
          />
          <Badge variant="default" className="absolute -top-2 -right-2">
            {grade}
          </Badge>
        </div>
        <div className="flex-1 min-w-0">
          <Text variant="h2" weight="extrabold" className="mb-1">
            {displayName || "사용자"}
          </Text>
          <Text variant="caption" color="secondary" className="break-all">
            {email || "이메일 없음"}
          </Text>
          {onLogout && (
            <button
              onClick={onLogout}
              className="mt-2 px-3 py-1 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-[12px] text-[11px] font-bold transition-colors"
            >
              로그아웃
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
