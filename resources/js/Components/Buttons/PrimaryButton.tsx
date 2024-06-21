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
				"flex flex-row items-center justify-center gap-1.5 rounded-lg border border-green bg-green px-4 py-2 font-bold transition-all duration-300 hover:bg-green/80",
			)}
		>
			{children}s
		</button>
	);
};

export default PrimaryButton;
