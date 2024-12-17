import React from "react";
import { useLocation } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  // AiOutlineSearch,
  AiOutlineHome,
  AiOutlineCreditCard,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import {
  AiFillHome,
  AiFillCreditCard,
  AiFillPlusCircle,
  AiFillMessage,
} from "react-icons/ai";
import TabButton from "../atoms/TabButton";

const BottomNavigation= () => {
  const location = useLocation();

  return (
    <div className="bottom-0 left-0 flex items-center justify-between w-full p-2 pb-0 bg-white border-t-2 shadow-lg">
      <TabButton
        to="/"
        icon={location.pathname === "/" ? <AiFillHome /> : <AiOutlineHome />}
        label="홈"
        active={location.pathname === "/"}
      />

      <TabButton
        to="/advice"
        icon={
          location.pathname === "/advice" ? (
            <AiFillMessage />
          ) : (
            <AiOutlineMessage />
          )
        }
        label="고민"
        active={location.pathname === "/advice"}
      />
      {/* <TabButton
        to="/meditation"
        icon={
          <FaYinYang className={location.pathname === "/meditation" ? "text-green" : "text-gray-600 hover:text-green"} />
        }
        label="명상"
        active={location.pathname === "/meditation"}
      /> */}

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
        icon={<AiOutlineUser />}
        label="내정보"
        active={location.pathname === "/user"}
      />
    </div>
  );
};

export default BottomNavigation;
