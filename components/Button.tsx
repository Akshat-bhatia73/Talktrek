"use client";
import clsx from "clsx";
import React from "react";
interface ButtonProps {
  type: "button" | "submit" | "reset" | undefined;
  fullWidth?: boolean;
  children?: React.ReactNode;
  onClick?: () => void;
  secondary?: boolean;
  danger?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  type,
  fullWidth,
  children,
  onClick,
  secondary,
  danger,
  disabled,
  isLoading,
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={clsx(
        `
        flex justify-center items-center
        rounded-xl
        px-3 py-2
        text-sm font-bold
        hover:rounded-md
        focus-visible:rounded-md
        transition-all
      `,
        disabled && "opacity-70 cursor-default",
        fullWidth && "w-full",
        secondary
          ? "text-neutral-900 border-2 hover:bg-neutral-300/20"
          : "text-neutral-100",
        danger && "bg-red-600 hover:bg-red-500",
        !secondary && !danger && "bg-blue-700 hover:bg-blue-600"
      )}
    >
      {isLoading ? "Loading..." : children}
    </button>
  );
};

export default Button;
