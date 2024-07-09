import React from 'react';

const ContinueButton = ({ onClick, disabled, text }) => (
  <button
  className={`bg-purple-600 text-white font-bold py-4 px-8 rounded-full w-full mt-10 ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled}
  >
    {text}
  </button>
);

export default ContinueButton;
