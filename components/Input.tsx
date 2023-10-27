"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: string;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
  placeholder,
}) => {
  return (
    <div className="space-y-2 font-bold animate-pop">
      <label
        htmlFor={id}
        className="
          w-fit
          text-sm leading-6 text-neutral-800
        "
      >
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(
            `
            w-full
            rounded-xl
            px-1 py-2
            outline-none
            border border-400/10
            focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:rounded-md
            bg-white disabled:cursor-default disabled:bg-neutral-700/10
            text-neutral-800 text-sm
            placeholder:font-medium
            transition-all
          `,
            errors[id] && "focus:ring-red-500"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
