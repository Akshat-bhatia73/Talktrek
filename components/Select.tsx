"use client";

import ReactSelect from "react-select";

interface SelectProps {
  disabled?: boolean;
  options: Record<string, any>[];
  label: string;
  onChange: (value: Record<string, any>) => void;
  value?: Record<string, any>;
}

const Select: React.FC<SelectProps> = ({
  disabled,
  options,
  value,
  label,
  onChange,
}) => {
  return (
    <div className="z-[100]">
      <label className="block text-sm font-medium leading-6 text-neutral-100">
        {label}
      </label>
      <div className="mt-2">
        <ReactSelect
          isDisabled={disabled}
          value={value}
          onChange={onChange}
          isMulti
          options={options}
          menuPortalTarget={document.body}
          styles={{
            menuPortal: (base) => ({
              ...base,
              zIndex: 9999,
            }),
            control: (styles) => ({
              ...styles,
              background: "rgb(38, 38, 38)",
              borderColor: "#40404070",
              borderRadius: "10px",
              ":hover": {
                borderColor: "#404040",
              },
            }),
            option: (styles) => ({
              ...styles,
              background: "rgb(38, 38, 38)",
              color: "rgb(245, 245, 245)",
              fontSize: "14px",
              ":hover": {
                background: "rgb(64, 64, 64)",
              },
              transition: "ease-in-out 0.2s",
            }),
            menu: (styles) => ({
              ...styles,
              background: "rgb(38, 38, 38)",
            }),
            singleValue: (styles) => ({
              ...styles,
              color: "rgb(245, 245, 245)",
              background: "rgb(64, 64, 64)",
            }),
            multiValue: (styles) => ({
              ...styles,
              background: "rgb(64, 64, 64)",
              color: "rgb(245, 245, 245)",
            }),
            multiValueLabel: (styles) => ({
              ...styles,
              color: "rgb(245, 245, 245)",
            }),
            multiValueRemove: (styles) => ({
              ...styles,
              transition: "ease-in-out 0.1s",
              color: "#f87171",
              ":hover": {
                backgroundColor: "#f8717150",
              },
            }),
            indicatorSeparator: (styles) => ({
              ...styles,
              background: "#404040",
            }),
          }}
          className="animate-pop"
        />
      </div>
    </div>
  );
};

export default Select;
