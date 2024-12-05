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
import { FaYinYang } from "react-icons/fa";
import TabButton from "../atoms/TabButton";

const BottomNavigation: React.FC = () => {
  const location = useLocation();

  return (
    <nav className="sticky bottom-0 left-0 w-full bg-white border-t border-gray-200">
      <div className="flex items-center justify-between px-6 h-[56px]">
        <TabButton
          to="/"
          icon={location.pathname === "/" ? <AiFillHome className="w-6 h-6" /> : <AiOutlineHome className="w-6 h-6" />}
          label="Home"
          active={location.pathname === "/"}
        />
       
        <TabButton
          to="/meditation"
          icon={
            <FaYinYang 
              className={`w-6 h-6 ${location.pathname === "/meditation" ? "text-green" : "text-gray-600 hover:text-green"}`}
            />
          }
          label="명상"
          active={location.pathname === "/meditation"}
        />
        
        <TabButton
          to="/worry"
          icon={
            location.pathname === "/worry" ? (
              <AiFillPlusCircle className="w-6 h-6" />
            ) : (
              <AiOutlinePlusCircle className="w-6 h-6" />
            )
          }
          label="조언"
          active={location.pathname === "/worry"}
        />
        
        <TabButton
          to="/credit"
          icon={
            location.pathname === "/credit" ? (
              <AiFillCreditCard className="w-6 h-6" />
            ) : (
              <AiOutlineCreditCard className="w-6 h-6" />
            )
          }
          label="크레딧"
          active={location.pathname === "/credit"}
        />
      </div>
    </nav>
  );
};

export default BottomNavigation;
