import { classNames } from "primereact/utils";
import { ButtonHTMLAttributes } from "react";

const SecondaryButton = ({
    className = "",
    disabled,
    children,
    ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button
            {...props}
            disabled={disabled}
            className={classNames(
                "px-4 py-2 border border-gray flex items-center justify-center gap-1.5 rounded-lg font-bold transition-all duration-300 hover:bg-gray/80",
                className
            )}
        >
            {children}
        </button>
    );
};

export default SecondaryButton;
