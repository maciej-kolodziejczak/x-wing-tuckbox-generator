import React, { FC, ChangeEvent } from "react";

interface SelectProps {
  options: {
    value: string;
    label: string;
  }[];
  selected: string[];
  onChange: (v: string[]) => void;
}

export const Select: FC<SelectProps> = ({ options, selected, onChange }) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const options = Array.from(event.target.options);
    console.log(options);
    const value = options
      .filter((option) => option.selected)
      .map((option) => option.value);
    onChange(value);
  }
  return (
    <div className="custom-select">
      <select
        className="custom-select__select"
        value={selected}
        onChange={handleChange}
        multiple
      >
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
      <div className="custom-select__"></div>
    </div>
  );
};
