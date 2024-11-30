import useUserStore from "../../store/userStore";
import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import ProfileImage from "../atoms/ProfileImage";

const UserInfo = () => {
  const user = useUserStore((state) => state.user);
  console.log(user);
  return (
    <div className="p-2">
      <ProfileImage size={100} src={user?.photoURL ?? undefined} />
      <div className="flex items-center my-2">
        <div className="text-xl font-semibold">
          {user?.email === "이메일 없음"
            ? "카카오로 로그인한 계정입니다."
            : user?.email}
        </div>
        <div className="w-1/4 ml-2">
          <Badge fontSize={10}>일반회원</Badge>
        </div>
      </div>
      <div className="text-gray-400 ">{user?.displayName}</div>
      <div className="text-gray-400 ">
        {user?.email === "이메일 없음" ? "" : "*********"}
      </div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <Button text="Change image" bgColor="bg-gray-400" />
        <Button text="Edit profile" bgColor="bg-green-400" />
      </div>
    </div>
  );
};
export default UserInfo;
