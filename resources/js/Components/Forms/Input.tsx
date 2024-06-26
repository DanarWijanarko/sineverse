import { classNames } from "primereact/utils";
import React, { useState } from "react";

interface InputProps {
	className?: string | null;
	type: "text" | "password";
	name: string;
	label?: string;
	placeholder: string;
	autoComplete?: string;
	value?: string;
	onChange: React.ChangeEventHandler<HTMLInputElement>;
	error?: string | undefined;
}

const Input = ({
	className,
	type,
	name,
	label,
	placeholder,
	autoComplete,
	value,
	onChange,
	error,
}: InputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleShowPassword = () => {
		setShowPassword((prev) => !prev);
	};

	return (
		<div className={classNames("flex flex-col items-start gap-1.5", className)}>
			{label && (
				<label htmlFor="email" className="text-base font-bold text-white">
					{label}
				</label>
			)}
			<div className="relative w-full">
				<input
					type={showPassword ? "text" : type}
					id={name}
					placeholder={placeholder}
					autoComplete={autoComplete}
					defaultValue={value}
					// value={value}
					onChange={onChange}
					className={classNames(
						"w-full rounded-md border border-black-700 bg-black-900 pb-2.5 text-sm text-white shadow-none transition-all placeholder:font-light placeholder:text-gray focus:border-white focus:ring-[0.5px] focus:ring-white",
						error ? "border-red ring-red" : null,
					)}
				/>
				{type === "password" ? (
					<button
						type="button"
						onClick={handleShowPassword}
						className="absolute right-3 top-1/2 -translate-y-1/2 text-gray transition-all hover:text-white"
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
							strokeLinecap="round"
							strokeLinejoin="round"
							className="w-5"
						>
							{showPassword ? (
								<>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M10.585 10.587a2 2 0 0 0 2.829 2.828" />
									<path d="M16.681 16.673a8.717 8.717 0 0 1 -4.681 1.327c-3.6 0 -6.6 -2 -9 -6c1.272 -2.12 2.712 -3.678 4.32 -4.674m2.86 -1.146a9.055 9.055 0 0 1 1.82 -.18c3.6 0 6.6 2 9 6c-.666 1.11 -1.379 2.067 -2.138 2.87" />
									<path d="M3 3l18 18" />
								</>
							) : (
								<>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" />
									<path d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6" />
								</>
							)}
						</svg>
					</button>
				) : null}
			</div>
			{error && <p className="transform-gpu text-xs font-medium text-red">{error}</p>}
		</div>
	);
};

export default Input;
