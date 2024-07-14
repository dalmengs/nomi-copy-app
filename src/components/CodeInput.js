import React, { useRef } from 'react';

const CodeInput = ({ code, handleCodeChange }) => {
  const inputs = useRef([]);

  const handleChange = (index, value) => {
    const newCode = [...code];
    newCode[index] = value;
    handleCodeChange(newCode);

    // Move to the next input field
    if (value.length === 1 && index < inputs.current.length - 1) {
      inputs.current[index + 1].focus();
    }
  };

  return (
    <div className="flex justify-center mb-4">
      {code.map((char, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={char}
          onChange={(e) => handleChange(index, e.target.value)}
          className="w-12 h-14 text-center border-[2px] border-black rounded-[15px] text-xl focus:outline-none focus:ring-2 focus:ring-purple-600 mx-1"
          ref={el => inputs.current[index] = el}
        />
      ))}
    </div>
  );
};

export default CodeInput;
