import React from 'react';

const SignInButton = ({ signInEvent }) => {
  return (
    <button
      className="bg-[#9610FF] h-14 text-white font-bold py-2 px-4 rounded w-[300px] focus:outline-none focus:shadow-outline"
      onClick={signInEvent}
    >
      Sign In
    </button>
  );
};

export default SignInButton;