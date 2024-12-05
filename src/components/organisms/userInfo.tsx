import React, { useRef } from "react";
import useUserStore from "../../store/userStore";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import ProfileImage from "../atoms/ProfileImage";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      alert("개발 중입니다.")
      // 이미지 업로드 처리 로직 추가
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleLogOut = async () => {
    try {
      await signOut(auth);
      localStorage.clear(); // 로컬스토리지 정리
      window.location.href = "/"; // 홈페이지로 리다이렉트
    } catch (error) {
      console.error("로그아웃 중 에러 발생:", error);
    }
  };

  return (
    <div className="p-2"><div className="flex items-end">
      <ProfileImage size={100} src={user?.photoURL ?? undefined} /><div className="text-red-400 text-sm font-bold ml-2 hover:cursor-pointer" onClick={handleLogOut}>로그아웃</div></div>
      <div className="flex items-center my-2">
        <div className="text-xl font-semibold">
          {user?.email === "이메일 없음"||user?.email === null
            ? "카카오로 로그인한 계정입니다."
            : user?.email}
        </div>
        <div className="w-1/4 ml-2">
          <Badge fontSize={10}>일반회원</Badge>
        </div>
      </div>
      <div className="text-gray-400">{user?.displayName}</div>
      <div className="text-gray-400">
        {user?.email === "이메일 없음" ? "" : "*********"}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <Button
          text="Change image"
          bgColor="bg-gray-400"
          onPress={handleClick}
        />
        <Button
          text="Edit profile"
          bgColor="bg-green-400"
          onPress={() => alert("개발 중입니다.")}
        />
      </div>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
    </div>
  );
};

export default UserInfo;
