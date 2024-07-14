import React from 'react';
import { Link } from 'react-router-dom';

const IconButton = ({ icon, filledIcon, isActive, label, to }) => {
  return (
    <Link to={to} className="flex flex-col items-center text-purple-800">
      <img src={isActive ? filledIcon : icon} alt={label} className="w-6 h-6 mb-1" />
      <span className='text-gray-500'>{label}</span>
    </Link>
  );
}

export default IconButton;
