import {
    StepFive,
    StepFour,
    StepOne,
    StepThree,
    StepTwo,
} from '../templates/step';
import useStepStore from '../../store/stepStore';

const Worry = () => {
    const { step } = useStepStore();

    // stepFrom의 타입을 { [key: number]: JSX.Element }로 정의
    const stepFrom: { [key: number]: JSX.Element } = {
        1: <StepOne />,
        2: <StepTwo />,
        3: <StepThree />,
        4: <StepFour />,
        5: <StepFive />,
    };

    return <div className="">{stepFrom[step]}</div>;
};

export default Worry;
