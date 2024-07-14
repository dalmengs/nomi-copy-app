import React from 'react';

const SelectionButton = ({ icon, label, selected, onClick }) => {
    return (
        <button 
            className={`flex flex-col items-center justify-center p-4 w-[150px] h-[150px] rounded-[30px] border-[2px] ${selected ? 'bg-[#F7ECFF] text-[#9813FF] border-[#9813FF]' : 'bg-transparent text-black border-transparent'}`} 
            onClick={onClick}
        >
            <div className="flex items-center justify-center w-16 h-16 rounded-full bg-[#EFDBFF]">
                <img src={icon} alt={label} className="w-8 h-8" />
            </div>
            <span className={`mt-2 font-medium ${selected ? 'text-purple-500' : 'text-black'}`}>{label}</span>
        </button>
    );
};

export default SelectionButton;
