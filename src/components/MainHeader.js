import React from 'react';

const MainHeader = ({ username }) => {
  return (
    <header className="p-4 flex items-center justify-between m-[5px]">
      <div className="flex items-center">
        <div className="flex flex-col ml-[15px]">
          <div className='text-gray-400 font-light'>Hi there! 😋</div>
          <div className="font-bold text-xl text-[25px]">{username}</div>
        </div>
      </div>
    </header>
  );
}

export default MainHeader;
