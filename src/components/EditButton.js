import React from 'react';

import EditIcon from '../static/icon/edit.svg'

const EditButton = ({ onClick }) => {
    return (
        <button 
            className="flex items-center justify-center p-2 pl-[20px] pr-[20px] m-1 border-[2px] border-[#9813FF] rounded-full"
            onClick={onClick}
        >
            <img src={EditIcon} alt="Edit" className="w-4 h-4" />
        </button>
    );
};

export default EditButton;
