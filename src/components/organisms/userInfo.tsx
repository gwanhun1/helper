import Badge from "../atoms/Badge";
import Button from "../atoms/Button";
import ProfileImage from "../atoms/ProfileImage";

const UserInfo = () => {
  return (
    <div className="p-2">
      <ProfileImage size={100} />
      <div className="flex items-center my-2">
        <div className="text-2xl font-semibold">UserId</div>
        <div className="w-1/4 ml-2">
          <Badge fontSize={10}>일반회원</Badge>
        </div>
      </div>
      <div className="text-gray-400 ">UserName</div>
      <div className="text-gray-400 ">PassWord</div>
      <div className="grid grid-cols-2 gap-4 mt-3">
        <Button text="Change image" bgColor="bg-gray-400" />
        <Button text="Edit profile" bgColor="bg-green-400" />
      </div>
    </div>
  );
};
export default UserInfo;
