import React from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const InputField = ({ id, type, placeholder, value, onChange, icon, isDate, isSelect, options, readOnly=false }) => {

  if (isDate) {
    return (
      <div className="relative mb-4 w-full">
        <DatePicker
          className="h-14 border rounded-lg border-solid border-gray-300 w-full p-4 pl-10"
          dateFormat='yyyy.MM.dd'
          selected={value}
          onChange={onChange}
          placeholderText={placeholder}
          maxDate={new Date()}
          shouldCloseOnSelect
          readOnly={readOnly}
        />
        {icon && <img src={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2" />}
      </div>
    );
  }

  if (isSelect) {
    return (
      <div className="relative mb-4 w-full">
        <select
          id={id}
          className="h-14 border rounded-lg border-solid border-gray-300 w-full p-4 pl-10"
          value={value}
          onChange={onChange}
          readOnly={readOnly}
        >
          <option value="" disabled>{placeholder}</option>
          {options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        {icon && <img src={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2" />}
      </div>
    );
  }

  return (
    <div className="relative mb-4 w-full">
      <input
        className="h-14 border rounded-lg border-solid border-gray-300 w-full p-4 pl-10"
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
      />
      {icon && <img src={icon} className="absolute left-3 top-1/2 transform -translate-y-1/2" />}
    </div>
  );
};

export default InputField;