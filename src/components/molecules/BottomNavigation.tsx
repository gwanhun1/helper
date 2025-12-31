import React from "react";
import { useLocation } from "react-router-dom";
import {
  AiOutlinePlusCircle,
  AiOutlineHome,
  AiOutlineUser,
  AiOutlineMessage,
} from "react-icons/ai";
import { AiFillHome, AiFillPlusCircle, AiFillMessage } from "react-icons/ai";
import { FaRegGrinTongueSquint } from "react-icons/fa";
import TabButton from "../atoms/TabButton";

const BottomNavigation = () => {
  const location = useLocation();

  return (
    <div className="flex bottom-0 left-0 justify-between items-center p-2 pb-0 w-full bg-white border-t-2 shadow-lg">
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
        to="/vent"
        icon={<FaRegGrinTongueSquint />}
        label="풀기"
        active={location.pathname === "/vent"}
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
