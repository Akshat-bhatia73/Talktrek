"use client";

import clsx from "clsx";
import React from "react";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
  placeholder?: string;
  darkMode?: boolean;
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
  darkMode,
}) => {
  return (
    <div className="space-y-2 font-medium animate-pop">
      <label
        htmlFor={id}
        className={clsx(
          `
          w-fit
          text-sm leading-6
        `,
          darkMode ? "text-neutral-200" : "text-neutral-800"
        )}
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
            outline-none focus:outline-none foucs:border-none
            border 
            disabled:cursor-default 
            text-sm
            transition-all
          `,
            darkMode
              ? `
              px-3
              bg-neutral-800 disabled:bg-neutral-700
              text-neutral-100
              border-neutral-700/70
              `
              : `
              bg-white disabled:bg-neutral-700/10
              text-neutral-800
              border-neutral-400/10
              focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:rounded-md
              `,
            errors[id] && "focus:ring-red-500"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
