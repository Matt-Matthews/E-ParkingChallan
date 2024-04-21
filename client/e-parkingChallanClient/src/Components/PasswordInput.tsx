import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface Props {
  inputId: string;
  placeholder: string;
  label: string;
  formRegisterReturn: UseFormRegisterReturn;
}

function PasswordInput({
  inputId,
  placeholder,
  label,
  formRegisterReturn,
}: Props) {
  const [isObscured, setIsObscured] = React.useState(true);
  return (
    <div className="mt-3 flex flex-col items-start">
      <label htmlFor={inputId}>{label}</label>
      <div className="flex items-center justify-between  relative  w-full">
        <input
          id={inputId}
          {...formRegisterReturn}
          type={isObscured ? "password" : "text"}
          placeholder={placeholder}
          className="py-1 mt-1 border-solid px-2 w-full border-2 rounded border-gray-400"
        />
        <button
        className="absolute right-2 top-3 bg-transparent outline-none py-0"
          onClick={(e) => {
            e.preventDefault();
            setIsObscured((currentValue) => !currentValue);
          }}
        >
          {isObscured ? <FaEyeSlash /> : <FaEye />}
        </button>
      </div>
    </div>
  );
}

export default PasswordInput;
