import React from "react";
import {
  FaUser,
  FaUserFriends,
  FaChalkboardTeacher,
  FaDumbbell,
  FaTree,
  FaDog,
  FaCat,
  FaBookOpen,
  FaCut,
  FaChild,
  FaBrain,
  FaWater,
  FaUserTie,
  FaRocket,
  FaClock,
  FaMask,
  FaHatWizard,
  FaMicrophone,
  FaRobot,
  FaBolt,
} from "react-icons/fa";

type IconProps = {
  className?: string;
};

export const getPersonaIcon = (
  who: string | undefined,
  className: string = "text-white text-lg"
): React.ReactNode => {
  if (!who) return <FaRobot className={className} />;

  const target = who.trim();

  switch (target) {
    case "엄마":
    case "아빠":
    case "할머니":
    case "할아버지":
      return <FaUser className={className} />;
    case "형/오빠":
    case "동생":
    case "친구":
      return <FaUserFriends className={className} />;
    case "선생님":
      return <FaChalkboardTeacher className={className} />;
    case "헬스트레이너":
      return <FaDumbbell className={className} />;
    case "조선시대 선비":
    case "현자 소크라테스":
      return <FaBookOpen className={className} />;
    case "지혜로운 나무":
      return <FaTree className={className} />;
    case "고민 상담 강아지":
      return <FaDog className={className} />;
    case "시니컬한 고양이":
      return <FaCat className={className} />;
    case "동네 미용실 원장님":
      return <FaCut className={className} />;
    case "천진난만한 아이":
    case "인생 2회차 초딩":
      return <FaChild className={className} />;
    case "이성적인 T":
      return <FaBrain className={className} />;
    case "산전수전 해녀 할머니":
      return <FaWater className={className} />;
    case "재벌 회장님":
    case "CEO":
      return <FaUserTie className={className} />;
    case "외계인":
      return <FaRocket className={className} />;
    case "타임머신 여행자":
      return <FaClock className={className} />;
    case "슈퍼히어로":
      return <FaBolt className={className} />;
    case "악당":
      return <FaMask className={className} />;
    case "마법사":
      return <FaHatWizard className={className} />;
    case "아이돌":
      return <FaMicrophone className={className} />;
    default:
      return <FaRobot className={className} />;
  }
};

export const getPersonaColor = (who: string | undefined): string => {
  if (!who) return "from-blue-100 to-blue-200 text-blue-500";

  const target = who.trim();

  if (
    ["엄마", "아빠", "할머니", "할아버지", "가족"].some((k) =>
      target.includes(k)
    )
  ) {
    return "from-orange-100 to-orange-200 text-orange-500";
  }
  if (["선생님", "소크라테스", "선비", "책"].some((k) => target.includes(k))) {
    return "from-emerald-100 to-emerald-200 text-emerald-600";
  }
  if (["악당", "시니컬", "T"].some((k) => target.includes(k))) {
    return "from-gray-700 to-gray-900 text-white";
  }
  if (["아이돌", "슈퍼히어로", "마법사"].some((k) => target.includes(k))) {
    return "from-purple-100 to-purple-200 text-purple-500";
  }
  if (["강아지", "고양이", "나무"].some((k) => target.includes(k))) {
    return "from-amber-100 to-amber-200 text-amber-600";
  }

  return "from-blue-100 to-blue-200 text-blue-500";
};
