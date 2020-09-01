import React, { FC, ChangeEvent } from "react";

interface InputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Input: FC<InputProps> = ({ value, onChange }) => {
  return <input value={value} onChange={onChange}></input>;
};
