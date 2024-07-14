import React from 'react';

const TagButton = ({ label, icon, onClick, selected }) => {
    return (
        <button 
            className={`flex items-center justify-center p-2 pl-[20px] pr-[20px] m-1 rounded-full ${
                selected ? 'bg-[#9610FF] text-white' : 'bg-white text-[#9610FF] border border-[#9610FF]'
            }`}
            onClick={onClick}
        >
            {icon && <img src={icon} alt="" className="w-4 h-4 mr-2" />}
            <span>{label}</span>
        </button>
    );
};

export default TagButton;
