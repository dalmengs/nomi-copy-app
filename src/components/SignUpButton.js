import React from 'react';

const ContinueButton = ({ onClick, disabled }) => (
  <button
    className={`font-bold py-4 px-8 rounded-full w-full mt-10 ${disabled ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-purple-600 text-white'}`}
    onClick={onClick}
    disabled={disabled}
  >
    Continue
  </button>
);

export default ContinueButton;
