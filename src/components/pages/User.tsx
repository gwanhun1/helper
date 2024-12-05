import UserAccount from "../organisms/UserAccount";
import UserInfo from "../organisms/UserInfo";
import UserNotice from "../organisms/UserNotice";

const User = () => {
  return (
    <>
      <UserInfo />
      <div className="p-4">
        <UserAccount />
        <UserNotice />
      </div>
    </>
  );
};

export default User;
