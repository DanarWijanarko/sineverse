import {
	Calendar,
	CalendarBaseProps,
	CalendarPassThroughMethodOptions,
	CalendarPassThroughOptions,
	CalendarPassThroughType,
	CalendarProps,
} from "primereact/calendar";
import { Nullable } from "primereact/ts-helpers";
import { PassThroughType, classNames } from "primereact/utils";
import React, { HTMLAttributes } from "react";

interface IDateSelect {
	id: string;
	value: Nullable<Date>;
	onChange: (event: any) => void;
	className: string;
}

const DateSelect = ({ id, value, onChange, className }: IDateSelect) => {
	const passThroughOptions = {
		input: {
			root: ({ parent }: any) => ({
				className: classNames(
					"text-sm relative text-white bg-black-800 px-4 py-1.5 border border-black-700 transition-colors duration-200 appearance-none",
					"hover:border-white",
					"focus:ring-0 focus:border-white",
					{
						"rounded-lg": !parent.props.showIcon,
						"border-r-0 rounded-l-lg": parent.props.showIcon,
					},
				),
			}),
		},
		dropdownButton: {
			root: ({ props }: CalendarPassThroughMethodOptions) => ({
				className: classNames(
					"bg-black-800 px-3 py-1.5 border border-black-700 rounded-r-lg transition-colors duration-200 appearance-none",
					{
						"rounded-l-none hover:border-white": props.icon,
					},
				),
			}),
		},
		header: {
			className: classNames(
				"flex items-center justify-between",
				"p-2 text-gray bg-black-900 font-semibold m-0 border-b border-black-700 rounded-t-lg",
			),
		},
		previousButton: {
			className: classNames(
				"flex items-center justify-center cursor-pointer overflow-hidden relative",
				"w-8 h-8 text-gray border-0 bg-black-900/0 rounded-full transition-colors duration-200 ease-in-out",
				"hover:text-white hover:bg-black-700",
			),
		},
		title: {
			className: "mx-auto flex flex-row justify-center gap-2 py-1.5",
		},
		monthTitle: {
			className: classNames(
				"text-gray transition duration-300 font-semibold",
				"hover:text-white",
			),
		},
		yearTitle: {
			className: classNames(
				"text-gray transition duration-300 font-semibold",
				"hover:text-white",
			),
		},
		nextButton: {
			className: classNames(
				"flex items-center justify-center cursor-pointer overflow-hidden relative",
				"w-8 h-8 text-gray border-0 bg-black-900/0 rounded-full transition-colors duration-200 ease-in-out",
				"hover:text-white hover:bg-black-700",
			),
		},
		table: {
			className: classNames("w-full", "my-2"),
		},
		tableHeaderCell: {
			className: "p-2",
		},
		weekday: {
			className: "text-gray",
		},
		day: {
			className: "p-2",
		},
		dayLabel: ({ context }: CalendarPassThroughMethodOptions) => ({
			className: classNames(
				"w-7 h-7 rounded-full transition-all duration-300 border-black-900/0 border",
				"flex items-center justify-center mx-auto overflow-hidden relative text-sm",
				{
					"opacity-30 cursor-default": context.disabled,
					"cursor-pointer": !context.disabled,
				},
				{
					"text-gray bg-black-900/0 hover:bg-black-700":
						!context.selected && !context.disabled,
					"text-white bg-black-700 border-white": context.selected && !context.disabled,
				},
			),
		}),
		monthPicker: {
			className: "my-2",
		},
		month: ({ context }: CalendarPassThroughMethodOptions) => ({
			className: classNames(
				"inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
				"p-2 transition-shadow duration-300 rounded-lg",
				{
					"text-gray bg-black-900/0 hover:bg-black-700":
						!context.selected && !context.disabled,
					"text-white bg-black-700": context.selected && !context.disabled,
				},
			),
		}),
		yearPicker: {
			className: classNames("my-2"),
		},
		year: ({ context }: CalendarPassThroughMethodOptions) => ({
			className: classNames(
				"w-1/2 inline-flex items-center justify-center cursor-pointer overflow-hidden relative",
				"p-2 transition-shadow duration-200 rounded-lg",
				{
					"text-gray bg-black-900/0 hover:bg-black-700":
						!context.selected && !context.disabled,
					"text-white bg-black-700": context.selected && !context.disabled,
				},
			),
		}),
		group: {
			className: "flex-1 w-fit bg-black-900 my-1 border border-black-700 rounded-lg",
		},
		transition: {
			timeout: 150,
			classNames: {
				enter: "opacity-0 scale-75",
				enterActive:
					"opacity-100 !scale-100 transition-transform transition-opacity duration-150 ease-in",
				exit: "opacity-100",
				exitActive: "!opacity-0 transition-opacity duration-150 ease-linear",
			},
		},
	};

	return (
		<Calendar
			inputId={id}
			name={id}
			value={value}
			onChange={onChange}
			className={className}
			dateFormat="mm-dd-yy"
			showIcon={true}
			pt={passThroughOptions}
		/>
	);
};

export default DateSelect;
