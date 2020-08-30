import React, { FC, useState, ChangeEvent } from "react";

interface CustomSelectProps {
  options: {
    value: string;
    label: string;
  }[];
}

export const CustomSelect: FC<CustomSelectProps> = ({ options }) => {
  const [value, select] = useState<string>("");

  function handleChange(event: ChangeEvent<HTMLSelectElement>) {
    select(event.target.value);
  }

  return (
    <div className="custom-select">
      <select
        className="custom-select__select"
        value={value}
        onChange={handleChange}
      >
        {options.map(({ value, label }) => (
          <option value={value}>{label}</option>
        ))}
      </select>
      <div className="custom-select__"></div>
    </div>
  );
};
