import LoadingSpinner from "../../atoms/Loading";
const messages = ["이야기를 읽고 있어요", "조언을 준비하고 있어요", "당신을 위한 메시지를 적고 있어요", "잠시만 기다려주세요"];
const Loading = ({ textStep }: { textStep: number }) => <div role="status" aria-live="polite" className="h-full flex flex-col items-center justify-center gap-6 bg-white px-6 text-center"><LoadingSpinner size={48} /><h2 className="text-lg font-semibold text-slate-800">{messages[textStep]}</h2><p className="text-sm text-slate-600 leading-relaxed">조언을 받아 기록을 저장하는 중이에요.<br />최대 1분 정도 걸릴 수 있어요.</p></div>;
export default Loading;
