import React from 'react';

export const Input = ({ type, placeholder, name, className, value, onChange }) => {
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

export const BorderInput = ({ label, type, name, placeholder, className, value, onChange }) => {
  return (
      <div className="relative mb-4">
      <label className="text-sm text-gray-600 absolute -top-3 left-8 bg-white px-1">{label}</label>
      <div className="flex justify-center items-center rounded-full border px-2 py-1 border-teal-500 focus:ring-teal-500">
        <Input type={type} name={name} placeholder={placeholder} className={className} value={value} onChange={onChange} />
      </div>
    </div>
  )
}


