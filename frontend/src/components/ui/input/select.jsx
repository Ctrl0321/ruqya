'use client'
import Select from "react-select";

const CustomSelect = ({ options, value, onChange, name }) => (
    <Select
      options={options}
      value={options.find(option => option.value === value)}
      onChange={selectedOption => onChange({ target: { name, value: selectedOption.value } })}
      className="text-sm w-full bg-transparent "
      styles={{
        control: (base) => ({
          ...base,
          border: 'none',
          boxShadow: 'none',
          '&:hover': { border: 'none' }
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: 'none'
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: 'none'
        })
      }}
    />
  );

export default CustomSelect;