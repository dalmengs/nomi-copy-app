import React from 'react';
import { Link } from 'react-router-dom';

import ArrowBackIcon from '../static/icon/arrow_back.svg';
import MoreIcon from '../static/icon/more.svg';

const ChatHeader = ({ title, to }) => (
  <header className="text-2xl font-bold px-4 py-2 ">
    <div className="flex items-center justify-between">
        <Link to={to} className="flex items-center text-purple-800 mr-2">
            <img src={ArrowBackIcon} alt="Go to Back" className="w-6 h-6" />
        </Link>
      <span className="flex-grow text-center">{title}</span>
      <div className="flex items-center justify-center w-6 h-6 border border-black rounded-full">
        <img src={MoreIcon} alt="More Options" className="w-6 h-6" />
      </div>
    </div>
  </header>
);

export default ChatHeader;
