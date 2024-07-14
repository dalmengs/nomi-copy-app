import React from 'react';
import { Link } from 'react-router-dom';
import ArrowIcon from '../static/icon/arrow_forward.svg';

const MenuItem = ({ label, icon, to }) => {
  return (
    <Link to={to} className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-100">
        <div className="flex items-center">
            <img src={icon} className="mr-4 text-lg w-[30px]" alt="menu icon" />
            <span className="text-base">{label}</span>
        </div>
        <img src={ArrowIcon} className="w-[20px]" alt="arrow icon" />
    </Link>
  );
};

export default MenuItem;
