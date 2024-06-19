import { classNames } from "primereact/utils";
import { ButtonHTMLAttributes } from "react";

const PrimaryButton = ({
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
                className,
                "px-4 py-2 border border-green bg-green flex flex-row items-center justify-center gap-1.5 rounded-lg font-bold transition-all duration-300 hover:bg-green/80"
            )}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
