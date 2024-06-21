import { Slider, SliderChangeEvent, SliderPassThroughMethodOptions } from "primereact/slider";
import React from "react";
import CustomTooltip from "../Common/Tooltip";
import { classNames } from "primereact/utils";

interface ICustomSlider {
	value: number | [number, number];
	onChange: (event: SliderChangeEvent) => void;
	range: boolean;
	min: number;
	max: number;
	step: number;
	tooltipTarget: string;
}

const CustomSlider = ({
	value,
	onChange,
	range = true,
	min = 0,
	max = 100,
	step = 15,
	tooltipTarget,
}: ICustomSlider) => {
	const passThroughOptions = {
		root: ({ props }: SliderPassThroughMethodOptions) => ({
			className: classNames(
				"relative",
				"bg-black-700 border-0 rounded-full",
				{
					"h-1 w-full": props.orientation == "horizontal",
					"w-1 h-56": props.orientation == "vertical",
				},
				{
					"opacity-60 select-none pointer-events-none cursor-default": props.disabled,
				},
			),
		}),
		range: ({ props }: SliderPassThroughMethodOptions) => ({
			className: classNames("bg-green", "block absolute", {
				"top-0 left-0 h-full": props.orientation == "horizontal",
				"bottom-0 left-0 w-full": props.orientation == "vertical",
			}),
		}),
		handle: ({ props }: SliderPassThroughMethodOptions) => ({
			className: classNames(
				"h-4 w-4 bg-gray border-[3px] border-green rounded-full transition duration-300",
				"cursor-grab touch-action-none block",
				"focus:outline-none focus:outline-offset-0",
				"hover:bg-green",
				{
					"top-[50%] mt-[-0.5715rem] ml-[-0.5715rem]": props.orientation == "horizontal",
					"left-[50%] mb-[-0.5715rem] ml-[-0.4715rem]": props.orientation == "vertical",
				},
			),
		}),
	};

	return (
		<>
			<CustomTooltip target={tooltipTarget} position="top" mouseTrack={true}>
				<p className="text-sm">
					{typeof value !== "number"
						? `${value[0]} minutes - ${value[1]} minutes`
						: value}
				</p>
			</CustomTooltip>

			<div className="mt-1 px-3">
				<Slider
					value={value}
					onChange={onChange}
					range={range}
					min={min}
					max={max}
					step={step}
					pt={passThroughOptions}
				/>
			</div>
		</>
	);
};

export default CustomSlider;
