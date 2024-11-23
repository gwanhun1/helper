import useStepStore from '../../../store/stepStore';
import Button from '../../atoms/Button';
import TitleContainer from '../../molecules/TitleContainer';
import { useState } from 'react';

const StepFour = () => {
    const { increase, decrease } = useStepStore();
    const [value, setValue] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    // 입력된 텍스트의 줄 수를 계산하는 함수
    const calculateRows = (text: string) => {
        const lineCount = text.split('\n').length;
        return Math.min(lineCount, 13); // 최대 13줄까지만 늘어나도록 설정
    };

    return (
        <div className="p-2">
            <TitleContainer title="당신의 고민을 적어주세요." />
            <div className="max-w-sm px-2 mx-auto">
                <textarea
                    id="input"
                    className="w-full p-3 transition duration-200 ease-in-out border border-gray-300 rounded-md shadow-sm resize-none focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="고민을 자유롭게 적어주세요."
                    value={value}
                    onChange={handleChange}
                    rows={calculateRows(value)} // 텍스트에 맞는 줄 수 설정
                    style={{
                        borderRadius: 15,
                        height: 'auto',
                        minHeight: '120px', // 최소 높이
                        maxHeight: 'auto', // 최대 높이는 자동으로 조정
                        overflowY:
                            value.split('\n').length > 13 ? 'auto' : 'hidden', // 13줄 이상일 때 스크롤이 보이도록 설정
                    }}
                />
                <div className="grid grid-cols-2 gap-4 mt-3">
                    <Button
                        text="Cancel"
                        bgColor="bg-gray-400"
                        onPress={() => decrease()}
                    />
                    <Button
                        text="Ask"
                        bgColor="bg-green-400"
                        onPress={() => increase()}
                    />
                </div>
            </div>
        </div>
    );
};

export default StepFour;
