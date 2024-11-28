import { AiOutlineMail } from 'react-icons/ai';
import IconRow from '../molecules/IconRow';

const UserNotice = () => {
    return (
        <div className="p-4 mt-5 bg-white rounded-lg shadow-md">
            <h2 className="my-4 text-lg font-bold text-gray-900">Notice</h2>
            <IconRow
                icon={<AiOutlineMail className="w-6 h-6 text-gray-500" />}
                mainText="공지1"
                subText="공지1"
            />
        </div>
    );
};
export default UserNotice;
