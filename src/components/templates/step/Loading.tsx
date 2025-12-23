import Lottie from "lottie-react";
import loadingAnimation from "../../../assets/loading.json";

const Loading = ({ textStep }: { textStep: number }) => {
    const TextArea = [
        '조언자 구하는 중 😌',
        '컨셉 잡는 중 😂',
        '수수료 내는 중 🥺',
        '조합하는 중 😍',
    ];

    return (
        <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="w-48 h-48">
                <Lottie animationData={loadingAnimation} loop={true} />
            </div>
            <p className="text-[#4abd9d] text-xl font-bold whitespace-pre-line mt-4 animate-pulse">
                {TextArea[textStep]}
            </p>
        </div>
    );
};

export default Loading;
