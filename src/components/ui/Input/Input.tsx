import React, { FC } from "react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
  type?: string;
  name?: string;
  labelText: string;
  icon?: React.ReactNode;
};

const Input: FC<Props> = ({ value, onChange, placeholder, required = false, type = "text", name, labelText, icon }) => {
  return (
    <label className="block relative">
      <span className="block text-sm font-medium text-main-light mb-1">{labelText}</span>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-white text-main-black border-2 border-main-gray/80 rounded-xl focus:border-main-black focus:outline-none placeholder:text-main-gray/80"
        required={required}
      />
      {icon && <span className="absolute right-3 top-9">{icon}</span>}
    </label>
  );
};

export default Input;
