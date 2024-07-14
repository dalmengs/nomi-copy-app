import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '../static/icon/arrow_back.svg';

const BackHeader = ({ title, to }) => (
  <header className="text-2xl font-bold ml-[20px] mt-[15px]">
    <div className="flex items-center">
      <Link to={to} className="flex items-center text-purple-800 mr-2">
        <img src={ArrowBackIcon} alt="Go to Back" className="w-6 h-6" />
      </Link>
      <span>{title}</span>
    </div>
  </header>
);

export default BackHeader;
