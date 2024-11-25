const Loading = ({ textStep }: { textStep: number }) => {
    const TextArea = [
        '조언자 구하는 중 😌',
        '컨셉 잡는 중 😂',
        '수수료 내는 중 🥺',
        '조합하는 중 😍',
    ];

    return (
        <div className="flex items-center justify-center bg-white">
            <p className="text-[#4abd9d] text-2xl font-bold whitespace-pre-line">
                {TextArea[textStep]}
            </p>
        </div>
    );
};

export default Loading;
