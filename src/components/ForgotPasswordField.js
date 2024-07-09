import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordField = () => {

  const navigate = useNavigate();

  function onclickEvent() {
    navigate("/password");
  }

  return (
    <div
      className="font-bold"
      onClick={onclickEvent}
    >
     Forgot Password?
    </div>
  );
};

export default ForgotPasswordField;