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
}: UserProfileProps) => {
  return (
    <div className={`p-6 relative overflow-hidden ${className}`}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-green/3 blur-[100px] rounded-full" />
      </div>
      <div className="relative z-10 flex items-start gap-5">
        <div className="relative group">
          <ProfileImage
            size={88}
            src={photoURL ?? undefined}
            className="rounded-[20px] border-2 border-white shadow-[0_8px_24px_rgba(122,196,167,0.12)] group-hover:shadow-[0_12px_32px_rgba(122,196,167,0.18)] transition-all duration-500"
          />
          <Badge
            variant="default"
            className="absolute -top-1 -right-1 shadow-lg"
          >
            {grade}
          </Badge>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <Text variant="h2" weight="extrabold" className="mb-1 text-slate-800">
            {displayName || "사용자"}
          </Text>
          <Text
            variant="caption"
            color="secondary"
            className="break-all text-slate-500 text-[12px] font-medium mb-3"
          >
            {email || "이메일 없음"}
          </Text>
          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3 py-1.5 bg-rose-50 text-rose-600 hover:bg-rose-100 rounded-[12px] text-[11px] font-bold transition-all duration-300 hover:shadow-md"
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
