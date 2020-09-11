import "./Checkbox.css";

import { v4 } from "uuid";
import React, { FC, ChangeEvent } from "react";

interface CheckboxProps {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ label, checked, onChange }) => {
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    onChange(evt.target.checked);
  }

  const inputId = v4();

  return (
    <div className="checkbox">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        type="checkbox"
        onChange={handleChange}
        checked={checked}
      />
    </div>
  );
};
