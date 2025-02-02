import Select from "react-select";

const CustomSelect = ({ options, value, onChange, name, placeholder }) => (
    <Select
      options={options}
      value={options.find(option => option.value === value)}
      onChange={selectedOption => onChange({ target: { name, value: selectedOption.value} })}
      placeholder={`  ${placeholder}`}
      className="text-sm w-full bg-transparent"
      styles={{
        control: (base, state) => ({
          ...base,
          border: 'none',
          boxShadow: 'none',
          backgroundColor: state.isFocused ? 'white' : 'transparent'
        }),
        dropdownIndicator: (base) => ({
          ...base,
          display: 'none'
        }),
        indicatorSeparator: (base) => ({
          ...base,
          display: 'none'
        }),
        placeholder: (base) => ({
          ...base,
          color: '#a0aec0', 
          paddingLeft: '8px'
        }),
        singleValue: (base) => ({
          ...base,
          paddingLeft: '8px'
        }),
        menu: (base) => ({
          ...base,
          position: 'absolute',
          zIndex: 9999
        })
      }}
      onMenuOpen={() => window.scrollTo(0, 0)}
    />
  );

export default CustomSelect;