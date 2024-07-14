import React from 'react';

const DeleteAccountButton = ({ onClick, loading, disabled, content }) => (
  <button 
    className={`bg-white border border-red-600 rounded-full p-4 pl-[25px] pr-[25px] my-4 mx-auto block w-full max-w-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    onClick={onClick}
    disabled={disabled || loading}
    style={{ 
      boxShadow: '0px 8px 20px 0px rgba(167, 56, 254, 0.5)',
    }}
  >
    {loading ? (
      <div className="flex justify-center items-center">
        <svg
          className="animate-spin h-5 w-5 text-purple-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    ) : (
        content
    )}
  </button>
);

export default DeleteAccountButton;
