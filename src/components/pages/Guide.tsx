import { Link } from "react-router-dom";
import PageLayout from "../organisms/PageLayout";
const entries = [
  [
    "어떻게 시작하나요?",
    "카카오로 로그인한 뒤 ‘마음 기록하기’를 누르세요. 고민과 지금 기분을 적으면 AI 조언과 함께 마음의 숲에 저장됩니다. 상담 대상과 말투는 원하는 경우 바꿀 수 있어요.",
  ],
  [
    "기록은 누가 볼 수 있나요?",
    "새 기록은 기본 비공개입니다. 공유를 직접 선택하면 고민과 AI 조언이 익명으로 공개됩니다. 공개된 글은 로그인 없이 볼 수 있어요. 이름·연락처 등 개인 정보는 적지 마세요. 내 기록에서 언제든 비공개로 바꾸거나 삭제할 수 있습니다.",
  ],
  [
    "AI는 어떤 정보를 받나요?",
    "조언을 생성할 때 고민 내용과 선택한 상담 대상·말투를 외부 AI 서비스(Dify)에 전달합니다. 공개 여부와 별개로 조언 생성에 사용되므로 민감한 개인 정보는 입력하지 마세요. AI 조언은 전문 상담이나 진단을 대신하지 않습니다.",
  ],
  [
    "기분 리포트는 어떻게 만들어지나요?",
    "사용자가 직접 선택한 1~5단계 기분을 모아 보여줍니다. 기분은 실제 진단이나 AI 분석 결과가 아닙니다. 과거에 자동 생성된 점수는 리포트에서 제외됩니다.",
  ],
  [
    "상담 횟수는 언제 갱신되나요?",
    "하루 10회 무료로 이용할 수 있으며 한국 시간 오전 0시에 다음 날 한도로 갱신됩니다. 조언 생성에 실패하면 횟수를 복구합니다. 기록 저장 재시도에는 같은 요청 ID를 사용해 추가 차감을 막습니다.",
  ],
  [
    "감정 풀기는 저장되나요?",
    "감정 풀기에 입력한 내용은 서버로 보내거나 저장하지 않습니다. 화면에서 잠시 보여준 뒤 사라집니다. 페이지를 떠나면 내용이 없어집니다.",
  ],
  [
    "과거 기록이 달라졌어요",
    "기록 공개 안내를 개선하면서 소유자를 확인할 수 있는 과거 기록은 비공개로 옮겼습니다. 과거 자동 생성 기분 점수는 통계에서 제외됩니다.",
  ],
];
const Guide = () => (
  <PageLayout>
    <div className="max-w-2xl mx-auto p-5 pb-10">
      <Link to="/" className="text-sm text-emerald-800 underline">
        홈으로 돌아가기
      </Link>
      <h1 className="mt-5 text-2xl font-bold text-slate-800">
        이용 방법과 기록 안내
      </h1>
      <p className="mt-3 text-sm text-slate-600">
        마음을 편하게 기록할 수 있도록 알아두세요.
      </p>
      <div className="mt-6 space-y-3">
        {entries.map(([title, description]) => (
          <details
            key={title}
            className="p-4 rounded-xl bg-white border border-slate-200"
          >
            <summary className="cursor-pointer text-base font-semibold text-slate-800">
              {title}
            </summary>
            <p className="mt-3 text-sm text-slate-600 leading-relaxed">
              {description}
            </p>
          </details>
        ))}
      </div>
    </div>
  </PageLayout>
);
export default Guide;
