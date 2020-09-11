import "./Select.css";

import { v4 } from "uuid";
import React, { FC, ChangeEvent } from "react";

interface SelectProps {
  label: string;
  options: {
    value: string;
    label: string;
  }[];
  selected: string[];
  onChange: (v: string[]) => void;
}

export const Select: FC<SelectProps> = ({
  options,
  selected,
  label,
  onChange,
}) => {
  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const options = Array.from(event.target.options);
    const value = options
      .filter((option) => option.selected)
      .map((option) => option.value);

    onChange(value);
  }

  const inputId = v4();

  return (
    <div className="custom-select">
      <label htmlFor={inputId}>{label}</label>
      <select
        id={inputId}
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
