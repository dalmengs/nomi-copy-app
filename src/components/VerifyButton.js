import React from 'react';

const VerifyButton = ({ onClick, text, loading }) => (
    <button
        className={`bg-green-500 text-white py-2 px-4 rounded mt-2 mb-5 w-full h-[45px] flex items-center justify-center ${loading ? 'cursor-not-allowed opacity-50' : ''}`}
        onClick={onClick}
        disabled={loading}
    >
        {loading ? (
            <svg
                className="animate-spin h-5 w-5 text-white"
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
        ) : (
            text
        )}
    </button>
);

export default VerifyButton;
