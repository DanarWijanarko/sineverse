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
		<div className={classNames("group flex flex-row items-center justify-center", className)}>
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
				className="h-4 w-4 appearance-none rounded border border-black-700 bg-black-900 text-black-800 checked:border-0 checked:bg-green checked:hover:bg-green focus:outline-none focus:ring-1 focus:ring-green focus:ring-offset-1 focus:ring-offset-black-700 checked:focus:bg-green"
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
