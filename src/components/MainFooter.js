import React from 'react';

import homeIcon from '../static/icon/home.svg';
import newIcon from '../static/icon/new.svg';
import chatIcon from '../static/icon/chat.svg';
import profileIcon from '../static/icon/profile.svg';
import homeFillIcon from '../static/icon/home_fill.svg';
import newFillIcon from '../static/icon/new_fill.svg';
import chatFillIcon from '../static/icon/chat_fill.svg';
import profileFillIcon from '../static/icon/profile_fill.svg';
import IconButton from './IconButton';

const MainFooter = ({ optionId }) => {
  return (
    <footer className="bg-white p-4 flex justify-around fixed bottom-0 w-full">
      <IconButton 
        icon={homeIcon} 
        filledIcon={homeFillIcon} 
        isActive={optionId === 0} 
        label="Home" 
        to="/main"
      />
      <IconButton 
        icon={newIcon} 
        filledIcon={newFillIcon} 
        isActive={optionId === 1} 
        label="New" 
        to="/new"
      />
      <IconButton 
        icon={chatIcon} 
        filledIcon={chatFillIcon} 
        isActive={optionId === 2} 
        label="Chats" 
        to="/chat"
      />
      <IconButton 
        icon={profileIcon} 
        filledIcon={profileFillIcon} 
        isActive={optionId === 3} 
        label="Profile" 
        to="/profile"
      />
    </footer>
  );
}

export default MainFooter;
