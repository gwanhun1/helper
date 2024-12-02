import Filter from "bad-words";
import BadWordsFilter from "korean-bad-words";

const useFiltering = () => {
  // 필터 인스턴스 생성
  const englishFilter = new Filter();
  const koreanFilter = new BadWordsFilter();

  // 텍스트 필터링 함수
  const filterText = (text: string): string => {
    try {
      // 영어 비속어 필터링 후 한국어 비속어 필터링 순차 적용
      const filteredEnglish = englishFilter.clean(text);
      const filteredAll = koreanFilter.filter(filteredEnglish);

      return filteredAll;
    } catch (error) {
      console.error("필터링 중 오류 발생:", error);
      return text; // 오류 발생시 원본 텍스트 반환
    }
  };

  return { filterText };
};

export default useFiltering;
