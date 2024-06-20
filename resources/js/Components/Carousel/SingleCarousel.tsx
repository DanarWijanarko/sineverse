import {
    Carousel,
    CarouselPassThroughMethodOptions,
} from "primereact/carousel";
import React, { ReactNode, useState } from "react";
import { Link } from "@inertiajs/react";
import { Image } from "primereact/image";
import { classNames } from "primereact/utils";

import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";

import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import Skeleton from "../Common/Skeleton";

import CarouselIcon from "../Icons/CarouselIcon";
import BookmarkIcon from "../Icons/BookmarkIcon";
import StarIcon from "../Icons/StarIcon";
import PlayIcon from "../Icons/PlayIcon";
import ChevronIcon from "../Icons/ChevronIcon";

// ! Working to Dynamic
interface ISingleCarousel {
    className?: string | undefined;
    value: Array<ICinemas> | undefined;
    header?: string | undefined;
    isLoading: boolean;
    numScroll: number;
    numVisible: number;
    showNavigators: boolean;
    showIndicators: boolean;
    autoplayInterval?: number | undefined;
    itemTemplate: (item: ICinemas) => ReactNode;
}

const SingleCarousel = ({
    value,
    isLoading,
    className,
    header,
    numScroll,
    numVisible,
    showNavigators,
    showIndicators,
    autoplayInterval,
    itemTemplate,
}: ISingleCarousel) => {
    const [hover, setHover] = useState<boolean>(false);

    const passThroughOptions = {
        root: {
            className: classNames(className, "relative flex flex-col gap-2"),
        },
        header: {
            className: classNames({ "mx-1.5": className !== undefined }),
        },
        previousButton: {
            className: classNames(
                "absolute top-0 right-9",
                "opacity-100 disabled:opacity-80",
                "transition-all duration-500"
            ),
        },
        nextButton: {
            className: classNames(
                "absolute top-0 right-0",
                "opacity-100 disabled:opacity-80",
                "transition-all duration-500"
            ),
        },
        indicators: {
            className:
                "flex flex-row justify-center gap-1 flex-wrap absolute bottom-24 right-20",
        },
        indicatorbutton: ({ context }: CarouselPassThroughMethodOptions) => ({
            className: classNames(
                "w-4 h-1 transition duration-200 rounded-full hover:bg-white",
                {
                    "bg-gray": !context.active,
                    "bg-white w-8": context.active,
                }
            ),
        }),
    };

    const Header = () => {
        return (
            <div className="flex flex-row items-center gap-4 text-xl font-bold tracking-wide">
                {header}
                <Link
                    href="#"
                    className={classNames(
                        "flex flex-row items-center gap-0.5 mt-1",
                        "text-sm text-gray hover:text-green",
                        "transition-all duration-500",
                        {
                            "opacity-0": !hover,
                            "opacity-100": hover,
                        }
                    )}
                    disabled={hover}
                >
                    See More
                    <ChevronIcon className="mt-[2.3px] w-4 h-4" type="right" />
                </Link>
            </div>
        );
    };

    if (isLoading)
        return (
            <div className="relative h-[800px] w-full">
                <span className="absolute left-0 z-10 bottom-0 w-full h-1/3 bg-gradient-to-t from-black-800 to-transparent" />
                <Skeleton className="w-full h-[800px]" />
            </div>
        );

    return (
        <Carousel
            value={value}
            header={header ? Header() : undefined}
            numScroll={numScroll}
            numVisible={numVisible}
            showNavigators={showNavigators}
            showIndicators={showIndicators}
            autoplayInterval={autoplayInterval}
            circular={autoplayInterval ? true : false}
            itemTemplate={itemTemplate}
            prevIcon={CarouselIcon("prev")}
            nextIcon={CarouselIcon("next")}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            pt={passThroughOptions}
        />
    );
};

export default SingleCarousel;
