import { classNames } from "primereact/utils";
import React, { useEffect, useRef, useState } from "react";
import Skeleton from "../Common/Skeleton";
import CarouselIcon from "../Icons/CarouselIcon";

interface ICarousel {
	offsetWidth: number;
	scrollWidth: number;
}

interface IDefaultCarousel {
	value: Array<object> | undefined;
	header?: string | undefined;
	isLoading: boolean;
	className?: string | undefined;
	itemTemplate: any;
}

const DefaultCarousel = ({
	value,
	header,
	isLoading,
	className,
	itemTemplate,
}: IDefaultCarousel) => {
	const maxScrollWidth = useRef<number>(0);
	const [currentIndex, setCurrentIndex] = useState(0);
	const carousel = useRef<HTMLDivElement>(null);
	const [hover, setHover] = useState<boolean>(false);

	const movePrev = () => {
		if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
	};

	const moveNext = () => {
		if (
			carousel.current !== null &&
			carousel.current.offsetWidth * currentIndex <= maxScrollWidth.current
		)
			setCurrentIndex((prev) => prev + 1);
	};

	const isDisabled = (direction: "prev" | "next") => {
		if (direction === "prev") {
			return currentIndex <= 0;
		}

		if (direction === "next" && carousel.current !== null) {
			return carousel.current.offsetWidth * currentIndex >= maxScrollWidth.current;
		}

		return false;
	};

	useEffect(() => {
		if (carousel !== null && carousel.current !== null) {
			carousel.current.scrollLeft = carousel.current.offsetWidth * currentIndex;
		}
	}, [currentIndex]);

	useEffect(() => {
		maxScrollWidth.current = carousel.current
			? carousel.current.scrollWidth - carousel.current.offsetWidth
			: 0;
	}, [isLoading === false]);

	if (isLoading) return <Skeleton className={classNames(className, "h-24 w-full")} />;

	return (
		<section
			className={classNames(className, "flex flex-col gap-2 px-20")}
			onMouseEnter={() => setHover(true)}
			onMouseLeave={() => setHover(false)}
		>
			{header && <h1 className="text-xl font-bold tracking-wide">{header}</h1>}

			<div className="relative flex overflow-hidden">
				{/* Prev Button */}
				<button
					onClick={movePrev}
					className={classNames(
						"absolute left-0 top-0 z-10 flex h-full w-20 items-center justify-center bg-gradient-to-r from-black-800 to-black-800/0 pr-2",
						"opacity-100 transition-all duration-500",
						"disabled:-z-10 disabled:opacity-0",
						{
							"translate-x-0 transition-all duration-500": hover == true,
							"-translate-x-full transition-all duration-500": hover == false,
						},
					)}
					disabled={isDisabled("prev")}
				>
					{CarouselIcon("prev")}
				</button>

				{/* Next Button */}
				<button
					onClick={moveNext}
					className={classNames(
						"absolute right-0 top-0 z-10 flex h-full w-20 items-center justify-center bg-gradient-to-l from-black-800 to-black-800/0 pl-2",
						"opacity-100 transition-all duration-500",
						"disabled:-z-10 disabled:opacity-0",
						{
							"translate-x-0 transition-all duration-500": hover == true,
							"translate-x-full transition-all duration-500": hover == false,
						},
					)}
					disabled={isDisabled("next")}
				>
					{CarouselIcon("next")}
				</button>

				{/* Content */}
				<div
					ref={carousel}
					className={classNames(`gap-2`, "z-0 flex overflow-hidden scroll-smooth")}
				>
					{value?.map((item, index) => {
						return (
							<div
								key={index}
								className={classNames(
									"relative min-w-fit snap-start transition-all duration-300 hover:opacity-80",
								)}
							>
								{itemTemplate(item)}
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
};

export default DefaultCarousel;
