import React, { FC } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  labelText?: string;
  icon?: React.ReactNode;
};

const CustomInput: FC<Props> = ({ labelText, icon, ...inputProps }) => {
  return (
    <label className="block relative">
      {labelText && <span className="block text-sm font-medium text-main-light mb-1">{labelText}</span>}
      <input
        {...inputProps}
        className={
          "w-full px-4 py-2 text-main-black border-2 border-main-gray/80 rounded-md focus:border-main-black focus:outline-none placeholder:text-main-gray/80" +
          (inputProps.className ? ` ${inputProps.className}` : "")
        }
      />
      {icon && <span className="absolute right-3 top-9">{icon}</span>}
    </label>
  );
};

export default CustomInput;
