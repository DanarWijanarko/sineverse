import { Tooltip, TooltipProps, TooltipPassThroughMethodOptions } from "primereact/tooltip";
import { PropsWithChildren } from "react";
import { classNames } from "primereact/utils";

const CustomTooltip = ({
	target,
	position,
	event,
	mouseTrack,
	mouseTrackTop,
	children,
}: PropsWithChildren<TooltipProps>) => {
	const passThroughOptions = {
		root: ({ context }: TooltipPassThroughMethodOptions) => {
			return {
				className: classNames("absolute", {
					"py-0 px-1":
						context.right ||
						context.left ||
						(!context.right && !context.left && !context.top && !context.bottom),
					"py-1.5 px-0": context.top || context.bottom,
				}),
			};
		},
		arrow: ({ context }: TooltipPassThroughMethodOptions) => ({
			className: classNames("absolute w-0 h-0 border-green/0 border-solid", {
				"-mt-2 border-y-[0.5rem] border-r-[0.5rem] border-l-0 border-r-green":
					context.right,
				"-mt-2 border-y-[0.5rem] border-l-[0.5rem] border-r-0 border-l-green": context.left,
				"-ml-2 border-x-[0.5rem] border-t-[0.5rem] border-b-0 border-t-green": context.top,
				"-ml-2 border-x-[0.5rem] border-b-[0.5rem] border-t-0 border-b-green":
					context.bottom,
			}),
		}),
		text: {
			className: "px-2 py-1 bg-green text-white rounded-md font-medium",
		},
	};
	return (
		<Tooltip
			target={target}
			position={position}
			event={event}
			mouseTrack={mouseTrack}
			mouseTrackTop={mouseTrackTop}
			pt={passThroughOptions}
		>
			{children}
		</Tooltip>
	);
};

export default CustomTooltip;
