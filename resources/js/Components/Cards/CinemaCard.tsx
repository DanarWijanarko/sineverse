import { Link } from "@inertiajs/react";
import React, { Fragment } from "react";
import StarIcon from "../Icons/StarIcon";
import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import { classNames } from "primereact/utils";

interface ICinemaCard {
    data: ICinemas;
    href: string;
    className?: string;
}

const CinemaCard = ({ data, href, className }: ICinemaCard) => {
    return (
        <Link
            href={href}
            className={classNames(
                className,
                "flex flex-col gap-2 w-full transition-all duration-300 hover:opacity-70"
            )}
        >
            <img src={data.backdrop} alt={data.title} className="rounded-lg" />

            <h1 className="font-black text-xl tracking-wide line-clamp-1">
                {data.title}
            </h1>

            <div className="flex flex-row gap-1.5 items-center -mt-1">
                <span className="flex justify-center items-center gap-0.5">
                    <StarIcon className="w-4 h-4 text-yellow" />
                    <p className="text-gray text-xs">{data.vote_average}</p>
                </span>

                <span className="w-1 h-1 bg-gray rounded-full" />

                <p className="text-gray text-xs">
                    {dateYear(data.release_date)}
                </p>

                <span className="w-1 h-1 bg-gray rounded-full" />

                <p className="text-gray text-xs">{data.original_language}</p>

                <span className="w-1 h-1 bg-gray rounded-full" />

                {data.genres.slice(0, 1).map((genre, index) => {
                    return (
                        <Fragment key={index}>
                            <p className="text-gray text-xs">{genre}</p>
                        </Fragment>
                    );
                })}
            </div>
        </Link>
    );
};

export default CinemaCard;
