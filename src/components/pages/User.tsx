import UserAccount from "../organisms/UserAccount";
import UserInfo from "../organisms/userInfo";
import UserNotice from "../organisms/UserNotice";

const User = () => {
  return (
    <>
      <UserInfo />
      <div className="p-4 bg-white rounded-lg shadow-md">
        <UserAccount />
        <UserNotice />
      </div>
    </>
  );
};

export default User;
