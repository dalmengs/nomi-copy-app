import React from 'react';
import ArrowIcon from '../static/icon/arrow_forward.svg';
import { Link } from 'react-router-dom';

const LogoutItem = ({ label, icon }) => {
  return (
    <Link to={"/signin"} className="flex items-center justify-between p-4 cursor-pointer text-[#F55455] hover:bg-red-100">
        <div className="flex items-center">
            <img src={icon} className="mr-4 text-lg w-[30px]" alt="logout icon" />
            <span className="text-base">{label}</span>
        </div>
        <img src={ArrowIcon} className="w-[20px]" alt="arrow icon" />
    </Link>
  );
};

export default LogoutItem;
