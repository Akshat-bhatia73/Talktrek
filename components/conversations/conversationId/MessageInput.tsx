"use client";

import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface MessageInputProps {
  id: string;
  placeholder?: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
}

const MessageInput: React.FC<MessageInputProps> = ({
  id,
  type,
  required,
  placeholder,
  register,
  errors,
}) => {
  return (
    <div className="relative w-full">
      <input
        type={type}
        id={id}
        autoComplete={id}
        {...register(id, { required })}
        placeholder={placeholder}
        className="
            bg-neutral-800 lg:bg-neutral-700
            text-neutral-100 font-semibold
            placeholder:text-neutral-400 placeholder:italic
            px-4 py-2
            w-full rounded-xl
            border-none outline-none
            focus:rounded-md
            transition-all
        "
      />
    </div>
  );
};

export default MessageInput;
