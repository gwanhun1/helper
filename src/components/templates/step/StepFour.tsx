import useStepStore from '../../../store/stepStore';
import Button from '../../atoms/Button';
import TitleContainer from '../../atoms/TitleContainer';
import Textarea from '../../molecules/Textarea';
import { useState } from 'react';
import Loading from './Loading';

const StepFour = () => {
    const { increase, decrease } = useStepStore();
    const [value, setValue] = useState('');
    const [textStep, setTextStep] = useState<number>(0);

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setValue(e.target.value);
    };

    const handleAsk = () => {
        let step = 0;

        const interval = setInterval(() => {
            step += 1;
            setTextStep(step);

            if (step === 4) {
                clearInterval(interval);
                setTextStep(0);
                increase(); // 마지막에 increase() 호출
            }
        }, 1000); // 1초마다 textStep 업데이트
    };

    return (
        <>
            {textStep !== 0 ? (
                <Loading textStep={textStep} />
            ) : (
                <div className="p-2">
                    <TitleContainer title="당신의 고민을 적어주세요." />
                    <div className="max-w-sm px-2 mx-auto">
                        <Textarea
                            id="input"
                            value={value}
                            onChange={handleChange}
                            placeholder="고민을 자유롭게 적어주세요."
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
                                onPress={handleAsk}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default StepFour;
