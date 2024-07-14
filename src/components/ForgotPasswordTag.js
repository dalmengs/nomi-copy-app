import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordTag = () => {

  const navigate = useNavigate();

  function onclickEvent() {
    navigate("/password");
  }

  return (
    <div
      className="text-gray-500 cursor-pointer hover:text-black"
      onClick={onclickEvent}
    >
     Forgot Password?
    </div>
  );
};

export default ForgotPasswordTag;