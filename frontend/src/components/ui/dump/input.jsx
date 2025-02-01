'use client'
const Input = ({ type, placeholder, className, value, onChange }) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      className={className +` bg-white`}
      value={value}
      onChange={onChange}
    />
  );
};

export default Input;