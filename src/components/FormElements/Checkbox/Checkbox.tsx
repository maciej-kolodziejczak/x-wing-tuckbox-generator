import React, { FC, ChangeEvent } from "react";

interface CheckboxProps {
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export const Checkbox: FC<CheckboxProps> = ({ checked, onChange }) => {
  return <input type="checkbox" onChange={onChange} checked={checked} />;
};
