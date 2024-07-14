import React from 'react';

const ResendCodeLink = ({ onResend }) => (
  <div className="text-left">
    &#40;
    <a 
      href="#resend" 
      onClick={onResend} 
      className="text-black underline"
    >
      resend code
    </a>
    &#41;
  </div>
);

export default ResendCodeLink;
