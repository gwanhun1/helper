import { AiOutlineCreditCard, AiOutlineMail } from 'react-icons/ai';
import Badge from '../atoms/Badge';
import Button from '../atoms/Button';
import ProfileImage from '../atoms/ProfileImage';
import IconRow from '../molecules/IconRow';

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

            <div className="p-4 bg-white rounded-lg shadow-md">
                <h2 className="my-4 text-lg font-bold text-gray-900">
                    Account details
                </h2>
                <IconRow
                    icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
                    mainText="catherinemeyer@gmail.com"
                    subText="Personal email"
                />
                <div className="my-4 border-t border-gray-200"></div>
                <IconRow
                    icon={
                        <AiOutlineCreditCard className="w-6 h-6 text-gray-500" />
                    }
                    mainText="*********"
                    subText="**** 07"
                />

                <h2 className="my-4 text-lg font-bold text-gray-900">Notice</h2>
                <IconRow mainText="공지1" subText="공지1" />
            </div>
        </div>
    );
};
export default UserInfo;
