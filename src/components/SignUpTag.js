import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUpTag = () => {

  const navigate = useNavigate();

  function onclickEvent() {
    navigate("/signup");
  }

  return (
    <div
      className="text-gray-500 cursor-pointer hover:text-black mr-[15px]"
      onClick={onclickEvent}
    >
     Sign Up
    </div>
  );
};

export default SignUpTag;