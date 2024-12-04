import React from "react";
import { useLocation } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineUser,
} from "react-icons/ai";
import { AiFillHome, AiFillCreditCard, AiFillPlusCircle } from "react-icons/ai";
import TabButton from "../atoms/TabButton";

const BottomNavigation: React.FC = () => {
  const location = useLocation(); // 현재 경로 가져오기

  return (
    <div className="bottom-0 left-0 flex items-center justify-between w-full p-4 bg-white border-t-2 shadow-lg">
      {/* 각 탭 버튼들 */}
      <TabButton
        to="/"
        icon={location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
        label="Home"
        active={location.pathname === "/"}
      />
      <TabButton
        to="/logs"
        icon={
          location.pathname === "/logs" ? (
            <AiOutlineSearch />
          ) : (
            <AiOutlineSearch />
          )
        }
        label="로그"
        active={location.pathname === "/logs"}
      />
      <TabButton
        to="/worry"
        icon={
          location.pathname === "/worry" ? (
            <AiFillPlusCircle />
          ) : (
            <AiOutlinePlusCircle />
          )
        }
        label="조언"
        active={location.pathname === "/worry"}
      />
      <TabButton
        to="/meditation"
        icon={
          location.pathname === "/meditation" ? (
            <AiOutlineUser className="text-green" />
          ) : (
            <AiOutlineUser className="text-gray-600 hover:text-green" />
          )
        }
        label="명상"
        active={location.pathname === "/meditation"}
      />
      <TabButton
        to="/credit"
        icon={
          location.pathname === "/credit" ? (
            <AiFillCreditCard />
          ) : (
            <AiOutlineCreditCard />
          )
        }
        label="결제"
        active={location.pathname === "/credit"}
      />
      <TabButton
        to="/user"
        icon={
          location.pathname === "/user" ? <AiOutlineUser /> : <AiOutlineUser />
        }
        label="내정보"
        active={location.pathname === "/user"}
      />
    </div>
  );
};
export default BottomNavigation;
