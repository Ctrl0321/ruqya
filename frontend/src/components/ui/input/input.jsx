import React from 'react';

const Input = ({ type, placeholder, className, value, onChange, name }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      name={name}
      className={`rounded w-full focus:outline-none ${className}`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;
