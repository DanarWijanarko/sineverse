import {
    Carousel,
    CarouselPassThroughMethodOptions,
} from "primereact/carousel";
import React from "react";
import { Link } from "@inertiajs/react";
import { Image } from "primereact/image";
import { classNames } from "primereact/utils";

import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import SecondaryButton from "../Buttons/SecondaryButton";
import PrimaryButton from "../Buttons/PrimaryButton";
import StarIcon from "../Icons/StarIcon";
import Skeleton from "../Common/Skeleton";
import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import CarouselIcon from "../Icons/CarouselIcon";

interface ISingleCarousel {
    value: Array<ICinemas> | undefined;
    isLoading: boolean;
}

const SingleCarousel = ({ value, isLoading }: ISingleCarousel) => {
    const passThroughOptions = {
        root: {
            className: "relative",
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

    const itemTemplate = (data: ICinemas) => {
        return (
            <div key={data.id} className="relative h-[800px] w-full">
                <span className="absolute left-0 z-10 top-0 w-full h-full bg-black-800 bg-opacity-50" />
                <span className="absolute left-0 z-10 bottom-0 w-full h-1/2 bg-gradient-to-t from-black-800 to-transparent" />

                {/* Image Backdrop */}
                <Image
                    src={data.backdrop}
                    alt={data.title}
                    imageClassName="w-full h-full absolute left-0 top-0 z-0 object-cover"
                />

                {/* Details */}
                <div className="absolute bottom-24 z-20 left-20">
                    {/* Media Type */}
                    <p className="bg-black-800 w-fit px-3 py-1 mb-6 rounded-full text-sm font-bold">
                        {ucFirst(data.media_type)}
                    </p>

                    {/* Title */}
                    <Link
                        href={"#"}
                        className="font-extrabold text-3xl hover:opacity-80 transition-all"
                    >
                        {data.title}
                    </Link>

                    {/* Rating, Release Date, Original Language, Genres */}
                    <div className="pb-3 pt-2 flex flex-row gap-1.5 items-center">
                        {/* Ratings */}
                        <p className="text-gray text-sm flex justify-center items-center gap-0.5">
                            <StarIcon className="w-5 h-5 text-yellow" />
                            {data.vote_average}
                        </p>

                        <span className="w-1 h-1 bg-gray rounded-full" />

                        {/* Release Date */}
                        <p className="text-gray text-sm">
                            {dateLong(data.release_date)}
                        </p>

                        <span className="w-1 h-1 bg-gray rounded-full" />

                        {/* Original Language */}
                        <p className="text-gray text-sm">
                            {data.original_language}
                        </p>

                        <span className="w-1 h-1 bg-gray rounded-full" />

                        {/* Genres */}
                        {data.genres.map((genre, i) => (
                            <React.Fragment key={i}>
                                <p className="text-gray text-sm">{genre}</p>
                                {i !== data.genres.length - 1 && (
                                    <span className="w-1 h-1 bg-gray rounded-full" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Overview */}
                    <p className="w-[600px] mb-9 line-clamp-5 font-medium text-sm">
                        {data.overview}
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-row gap-2.5 items-end">
                        {/* Watch Trailer */}
                        <PrimaryButton className="text-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="h-5 w-5 -mt-0.5"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M6 4v16a1 1 0 0 0 1.524 .852l13 -8a1 1 0 0 0 0 -1.704l-13 -8a1 1 0 0 0 -1.524 .852z" />
                            </svg>
                            Watch Trailer
                        </PrimaryButton>

                        {/* Add Watchlist */}
                        <SecondaryButton className="text-lg">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth={3}
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-5 w-5"
                            >
                                <path
                                    stroke="none"
                                    d="M0 0h24v24H0z"
                                    fill="none"
                                />
                                <path d="M18 7v14l-6 -4l-6 4v-14a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4z" />
                            </svg>
                            Add Watchlist
                        </SecondaryButton>
                    </div>
                </div>
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
            numScroll={1}
            numVisible={1}
            showNavigators={false}
            showIndicators={true}
            autoplayInterval={5000}
            circular={true}
            itemTemplate={itemTemplate}
            prevIcon={CarouselIcon("prev")}
            nextIcon={CarouselIcon("next")}
            pt={passThroughOptions}
        />
    );
};

export default SingleCarousel;
