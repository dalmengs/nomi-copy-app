import React from 'react';

const VerifyButton = ({ onClick, text }) => (
    <button className="bg-green-500 text-white py-2 px-4 rounded mt-2 mb-5 w-full h-[45px]" onClick={onClick}>
        {text}
    </button>
);

export default VerifyButton;

