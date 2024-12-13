import {
  StepFive,
  StepFour,
  StepOne,
  StepThree,
  StepTwo,
} from "../templates/step";
import useStepStore from "../../store/stepStore";

const Worry = () => {
  const { step } = useStepStore();

  const stepFrom: { [key: number]: JSX.Element } = {
    1: <StepOne />,
    2: <StepTwo />,
    3: <StepThree />,
    4: <StepFour />,
    5: <StepFive />,
  };

  return <div className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">{stepFrom[step]}</div>;
};

export default Worry;
