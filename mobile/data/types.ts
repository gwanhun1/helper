export type WorryCategory = "관계" | "일" | "마음" | "일상";

export type Worry = {
  id: string;
  nickname: string;
  category: WorryCategory;
  body: string;
  /** 지도 SDK 붙기 전 — 화면 비율 좌표(0~1) */
  x: number;
  y: number;
  /** 실제 좌표 — 지도 SDK 연결 후 사용 */
  lat?: number;
  lng?: number;
  /** 작성 시각 — 표시는 timeAgo 가공 */
  createdAt: string;
  /** 작성자 본인 글 여부 */
  isMine: boolean;
  /** 받은 답장 수 (제3자도 카운트는 볼 수 있음) */
  replyCount: number;
};

export type Reply = {
  id: string;
  worryId: string;
  body: string;
  fromNickname: string;
  createdAt: string;
  /** 작성자가 ♥를 보냈는지 */
  hearted?: boolean;
};
