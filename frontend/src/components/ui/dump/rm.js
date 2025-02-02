import React from 'react';

const Input = ({ type, placeholder, className }) => {
  return (
    <input type={type} placeholder={placeholder} className={`p-2 rounded w-full focus:outline-none ${className}`} />
  );
};

export default Input;
