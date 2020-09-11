import "./Input.css";

import { v4 } from "uuid";
import React, { FC, ChangeEvent } from "react";

interface InputProps {
  value: string;
  label: string;
  isNumber?: boolean;
  onChange: (v: string) => void;
}

export const Input: FC<InputProps> = ({
  value,
  label,
  isNumber = false,
  onChange,
}) => {
  function handleChange(evt: ChangeEvent<HTMLInputElement>) {
    onChange(evt.target.value);
  }

  const inputId = v4();

  return (
    <div className="input">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        value={value}
        onChange={handleChange}
        type={isNumber ? "number" : "text"}
      />
    </div>
  );
};
