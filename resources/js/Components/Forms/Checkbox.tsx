import { classNames } from "primereact/utils";
import React from "react";

interface InputProps {
    className?: string | null;
    name: string;
    label: string;
    value: any;
    onChange: React.ChangeEventHandler<HTMLInputElement>;
    checked: boolean;
    position: "left" | "right";
}

const Checkbox = ({
    className = null,
    name,
    label,
    value,
    onChange = () => {},
    checked,
    position = "right",
}: InputProps) => {
    return (
        <div
            className={classNames(
                "flex flex-row items-center justify-center group",
                className
            )}
        >
            {position === "left" ? (
                <label
                    htmlFor={name}
                    className="me-2 text-xs font-medium text-gray transition-all duration-300 hover:text-white group-hover:text-white"
                >
                    {label}
                </label>
            ) : null}
            <input
                id={name}
                name={name}
                type="checkbox"
                value={value}
                onChange={onChange}
                checked={checked}
                className="w-4 h-4 appearance-none text-black-800 bg-black-900 border border-black-700 rounded checked:bg-green checked:hover:bg-green checked:border-0 checked:focus:bg-green focus:ring-1 focus:ring-green focus:ring-offset-1 focus:ring-offset-black-700 focus:outline-none"
            />
            {position === "right" ? (
                <label
                    htmlFor={name}
                    className="ms-2 text-sm font-medium text-gray transition-all duration-300 hover:text-white group-hover:text-white"
                >
                    {label}
                </label>
            ) : null}
        </div>
    );
};

export default Checkbox;
