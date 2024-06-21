import {
	Carousel,
	CarouselPassThroughMethodOptions,
	CarouselResponsiveOption,
} from "primereact/carousel";
import { Link } from "@inertiajs/react";
import React, { ReactNode, useState } from "react";

import CarouselIcon from "../Icons/CarouselIcon";
import ChevronIcon from "../Icons/ChevronIcon";
import { classNames } from "primereact/utils";
import Skeleton from "../Common/Skeleton";

interface IMultiCarousel {
	className?: string | undefined;
	value: Array<ICinemas> | undefined;
	header: string;
	isLoading: boolean;
	numScroll: number;
	numVisible: number;
	showNavigators: boolean;
	showIndicators: boolean;
	verticalViewPortHeight?: string;
	itemTemplate: (item: ICinemas) => ReactNode;
	orientation: "horizontal" | "vertical";
}

interface IHeaderProps {
	header: React.ReactNode;
}

const MultiCarousel = ({
	className,
	value,
	header,
	isLoading,
	numScroll,
	numVisible,
	showNavigators,
	showIndicators,
	verticalViewPortHeight,
	itemTemplate,
	orientation = "horizontal",
}: IMultiCarousel) => {
	const [hover, setHover] = useState<boolean>(false);
	const skeletonArr = Array.from(Array(numVisible).keys());

	const passThroughOptions = {
		root: {
			className: classNames(className, "relative flex flex-col gap-2"),
		},
		header: {
			className: classNames({ "mx-1.5": className !== undefined }),
		},
		container: ({ props }: CarouselPassThroughMethodOptions) => ({
			className: classNames("flex overflow-hidden", {
				"flex-row relative": props.orientation == "horizontal",
				"flex-col": props.orientation == "vertical",
			}),
		}),
		previousButton: ({ props }: CarouselPassThroughMethodOptions) => ({
			className: classNames("opacity-100 transition-all duration-500", {
				"absolute left-0 z-10 top-0 h-full w-20 justify-center pl-2 bg-gradient-to-r from-black-800 to-black-800/0":
					props.orientation == "horizontal",
				"absolute top-0.5 right-9": props.orientation == "vertical",
				"disabled:opacity-0": props.orientation == "horizontal",
				"disabled:opacity-60": props.orientation == "vertical",
				"translate-x-0": hover == true && props.orientation == "horizontal",
				"-translate-x-full": hover == false && props.orientation == "horizontal",
			}),
		}),
		nextButton: ({ props }: CarouselPassThroughMethodOptions) => ({
			className: classNames("opacity-100 transition-all duration-500", {
				"absolute right-0 z-10 top-0 h-full w-20 justify-center pr-2 bg-gradient-to-l from-black-800 to-black-800/0":
					props.orientation == "horizontal",
				"absolute top-0.5 right-0": props.orientation == "vertical",
				"disabled:opacity-0": props.orientation == "horizontal",
				"disabled:opacity-60": props.orientation == "vertical",
				"translate-x-0": hover == true && props.orientation == "horizontal",
				"translate-x-full": hover == false && props.orientation == "horizontal",
			}),
		}),
		indicators: {
			className: classNames(
				"absolute top-5 right-1 mx-0.5 flex flex-row justify-center gap-1 flex-wrap",
				{
					"opacity-100 transition-all duration-500": hover == true,
					"opacity-0 transition-all duration-500": hover == false,
				},
			),
		},
		indicatorbutton: ({ context }: CarouselPassThroughMethodOptions) => ({
			className: classNames(
				"w-[16px] h-[2.5px] transition duration-300 rounded-full hover:bg-white",
				{
					"bg-gray": !context.active,
					"bg-white w-[24px]": context.active,
				},
			),
		}),
		itemsContent: {
			className: classNames("overflow-hidden w-full"),
		},
		itemsContainer: ({ props }: CarouselPassThroughMethodOptions) => ({
			className: classNames("flex", {
				"flex-row w-full": props.orientation == "horizontal",
				"flex-col h-full": props.orientation == "vertical",
			}),
		}),
		item: ({ props }: CarouselPassThroughMethodOptions) => ({
			className: classNames("flex shrink-0 grow", {
				"w-1/3": props.orientation == "horizontal",
				"w-full": props.orientation == "vertical",
			}),
		}),
	};

	const responsiveOptions: Array<CarouselResponsiveOption> = [
		{
			breakpoint: "1444px",
			numVisible: 5,
			numScroll: 4,
		},
		{
			breakpoint: "968px",
			numVisible: 4,
			numScroll: 5,
		},
	];

	const Header = () => {
		return (
			<div className="flex flex-row items-center gap-4 text-xl font-bold tracking-wide">
				{header}
				<Link
					href="#"
					className={classNames(
						"mt-1 flex flex-row items-center gap-0.5",
						"text-sm text-gray hover:text-green",
						"transition-all duration-500",
						{
							"opacity-0": !hover,
							"opacity-100": hover,
						},
					)}
					disabled={hover}
				>
					See More
					<ChevronIcon className="mt-[2.3px] h-4 w-4" type="right" />
				</Link>
			</div>
		);
	};

	if (isLoading) {
		return (
			<section className={classNames(className, "flex h-full w-full flex-col gap-2 px-20")}>
				<Skeleton className="h-4 w-36 rounded-lg" />
				<div className="flex h-full w-full flex-row gap-3">
					{skeletonArr.map((_, index) => (
						<Skeleton key={index} className="h-[350px] w-full rounded-lg" />
					))}
				</div>
			</section>
		);
	}

	return (
		<Carousel
			value={value}
			header={header ? Header() : undefined}
			numScroll={numScroll}
			numVisible={numVisible}
			showNavigators={showNavigators}
			showIndicators={showIndicators}
			verticalViewPortHeight={verticalViewPortHeight}
			itemTemplate={itemTemplate}
			orientation={orientation}
			prevIcon={CarouselIcon("prev")}
			nextIcon={CarouselIcon("next")}
			responsiveOptions={responsiveOptions}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
			pt={passThroughOptions}
		/>
	);
};

export default MultiCarousel;
