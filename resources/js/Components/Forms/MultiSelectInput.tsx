import {
	MultiSelect,
	MultiSelectChangeEvent,
	MultiSelectPassThroughMethodOptions,
	MultiSelectPassThroughOptions,
} from "primereact/multiselect";
import { classNames } from "primereact/utils";
import React from "react";

interface InputProps {
	value: any;
	onChange: (event: MultiSelectChangeEvent) => void;
	options: Array<any> | undefined;
	optionLabel: string;
	placeholder?: string | undefined;
	filter?: boolean;
	isLoading: boolean;
	itemTemplate: React.ReactNode | ((option: any) => React.ReactNode);
	className?: string | undefined;
}

const MultiSelectInput = ({
	value,
	onChange,
	options,
	optionLabel,
	placeholder,
	filter = true,
	isLoading,
	itemTemplate,
	className = "",
}: InputProps) => {
	const passThroughOptions = {
		root: ({ props }: MultiSelectPassThroughMethodOptions) => ({
			className: classNames(
				"inline-flex h-10 cursor-pointer select-none flex items-center",
				"bg-black-900 border border-black-700 transition-all duration-300 ease-in-out rounded-lg",
				"w-full hover:border-white",
				{
					"opacity-60 select-none pointer-events-none cursor-default": props.disabled,
				},
			),
		}),
		labelContainer: {
			className: "overflow-hidden flex flex-auto cursor-pointer",
		},
		label: ({ props }: MultiSelectPassThroughMethodOptions) => ({
			className: classNames(
				"block overflow-hidden whitespace-nowrap cursor-pointer overflow-ellipsis",
				"text-gray text-sm",
				"px-4 py-2 transition duration-300",
				{
					"!p-3":
						props.display !== "chip" &&
						(props.value == null || props.value == undefined),
					"!py-1.5 px-3": props.display === "chip" && props.value !== null,
				},
			),
		}),
		token: {
			className: classNames(
				"py-0.5 px-2 mr-2 bg-black-700 text-white text-sm rounded-full",
				"cursor-default inline-flex items-center",
			),
		},
		removeTokenIcon: {
			className: "ml-2",
		},
		trigger: {
			className: classNames(
				"flex items-center justify-center",
				"text-gray w-12 rounded-tr-lg rounded-br-lg",
			),
		},
		panel: {
			className: classNames(
				"my-1 bg-black-900 text-white border border-black-700 rounded-lg",
			),
		},
		header: {
			className: classNames(
				"pl-4 pr-3 py-1.5 border-b border-black-700 text-gray bg-black-900 rounded-t-lg",
				"flex items-center justify-between",
			),
		},
		headerCheckboxContainer: {
			className: "hidden",
		},
		headerSelectAllLabel: {
			className: "bg-green",
		},
		headerCheckboxIcon: {
			className: "w-0 h-0",
		},
		filterContainer: {
			className: "relative mr-2",
		},
		filterInput: {
			root: {
				className: classNames(
					"w-full",
					"text-sm text-white bg-black-900 py-1.5 px-2 border border-black-700 transition duration-300 rounded-lg appearance-none",
					"hover:border-white focus:outline-none focus:ring-0 focus:border-white",
				),
			},
		},
		filterIcon: {
			className: "-mt-2 absolute top-1/2 right-2.5",
		},
		closeButton: {
			className: classNames(
				"flex items-center justify-center overflow-hidden relative",
				"w-6 h-6 text-gray border-0 bg-black-900/0 rounded-full transition duration-300 ease-in-out mr-2 last:mr-0",
				"hover:text-white hover:border-black-900/0 hover:bg-black-700",
				"focus:outline-none focus:ring-0 focus:border-white",
			),
		},
		closeIcon: {
			className: "w-3 h-3 inline-block",
		},
		wrapper: {
			className: classNames(
				"max-h-[200px] overflow-auto w-full",
				"bg-black-900 border border-black-700 text-gray border-0 rounded-md shadow-lg",
			),
		},
		list: {
			className: "py-1 list-none m-0 w-full",
		},
		item: ({ context }: MultiSelectPassThroughMethodOptions) => ({
			className: classNames(
				"cursor-pointer w-full font-normal overflow-hidden whitespace-nowrap",
				"text-sm hover:bg-black-700",
				"mx-0 my-0.5 px-4 py-2 border-0 transition duration-300 rounded-none",
				{
					"text-white hover:text-white hover:bg-black-700": !context.selected,
					"text-white bg-black-700": context.selected,
				},
			),
		}),
		checkboxContainer: {
			className: "hidden",
		},
		// transition: {
		// 	enterFromClass: "opacity-0 scale-75",
		// 	enterActiveClass: "transition-transform transition-opacity duration-150 ease-in",
		// 	leaveActiveClass: "transition-transform transition-opacity duration-150 ease-linear",
		// 	leaveToClass: "opacity-0 scale-75",
		// },
	};

	const virtualScrollerOptions = {
		itemSize: 35,
		autoSize: false,
		scrollHeight: "200px",
		className: classNames(
			"h-[200px] w-full overflow-auto",
			"bg-black-900 border border-black-700 rounded-b-lg",
		),
	};

	return (
		<MultiSelect
			value={value}
			onChange={onChange}
			options={options}
			optionLabel={optionLabel}
			display="chip"
			placeholder={placeholder}
			inputId={placeholder}
			name={placeholder}
			maxSelectedLabels={3}
			filter={filter}
			loading={isLoading}
			itemTemplate={itemTemplate}
			className={className}
			pt={passThroughOptions}
			virtualScrollerOptions={virtualScrollerOptions}
		/>
	);
};

export default MultiSelectInput;
