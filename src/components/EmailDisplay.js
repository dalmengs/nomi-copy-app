import React from 'react';
import EmailIcon from '../static/icon/mail.svg';

const EmailDisplay = ({ email }) => (
  <div className="flex items-center p-4 bg-gray-100 rounded-lg mt-4 mx-4">
    <img src={EmailIcon} alt="Email Icon" className="w-6 h-6 mr-4" />
    <span className="text-[#868e96]">{email}</span>
  </div>
);

export default EmailDisplay;
