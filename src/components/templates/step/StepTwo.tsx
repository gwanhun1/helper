import useStepStore from '../../../store/stepStore';
import Button from '../../atoms/Button';
import TitleContainer from '../../molecules/TitleContainer';

const StepTwo = () => {
    const { increase, decrease } = useStepStore();

    return (
        <div className="p-2">
            <TitleContainer
                title="누구에게 듣고싶나요?"
                subtitle="당신의 고민을 들어줄 대상을 골라주세요."
                titleColor="text-green-700"
            />

            {/* 버튼 컨테이너 */}
            <div className="flex flex-wrap gap-2 mt-3">
                <Button
                    onPress={() => decrease()}
                    text="Back"
                    color="#000"
                    bgColor="bg-slate-100"
                    outline
                />
                <Button
                    onPress={() => increase()}
                    text="Short"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="A Little Longer Text"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="Medium Text"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="Another Button with Text"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="Dynamic Button"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="Ask Me Anything"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="This is a Much Longer Button Text"
                    bgColor="bg-green-700"
                />
                <Button
                    onPress={() => increase()}
                    text="Final Button"
                    bgColor="bg-green-700"
                />
            </div>
        </div>
    );
};

export default StepTwo;
