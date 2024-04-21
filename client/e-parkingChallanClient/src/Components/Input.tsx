import { UseFormRegisterReturn } from "react-hook-form";

interface Props {
  inputId: string;
  placeholder: string;
  type: string;
  label: string;
  formRegisterReturn: UseFormRegisterReturn;
}

function Input({
  inputId,
  placeholder,
  type,
  label,
  formRegisterReturn,
}: Props) {
  return (
    <div className="mt-3 flex flex-col items-start">
      <label htmlFor={inputId}>{label}</label>
      <input
        id={inputId}
        {...formRegisterReturn}
        type={type}
        placeholder={placeholder}
        className="w-full py-1 rounded border-solid px-2 border-2 border-gray-400 mt-1"
      />
    </div>
  );
}

export default Input;
