import React from 'react';

const Input = ({ type, placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={`rounded w-full focus:outline-none ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
