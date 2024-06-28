import { Fragment } from "react";
import { Link } from "@inertiajs/react";
import { classNames } from "primereact/utils";

import { dateYear } from "@/Services/Utils/Format/dates/dateYear";

import StarIcon from "../Icons/StarIcon";

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
				"flex w-full flex-col gap-2 transition-all duration-300 hover:opacity-70",
			)}
		>
			{/* Image Backdrop */}
			<img src={data.backdrop} alt={data.title} className="rounded-lg" />

			{/* Title */}
			<h1 className="line-clamp-1 text-xl font-black tracking-wide">{data.title}</h1>

			{/* Ratings, Release Date, Original Language, Genres */}
			<div className="-mt-1 flex flex-row items-center gap-1.5">
				{/* Ratings */}
				<span className="flex items-center justify-center gap-0.5">
					<StarIcon className="h-4 w-4 text-yellow" />
					<p className="text-xs text-gray">{data.vote_average || 0}</p>
				</span>

				<span className="h-1 w-1 rounded-full bg-gray" />

				{/* Release Date */}
				<p className="text-xs text-gray">{dateYear(data.release_date)}</p>

				<span className="h-1 w-1 rounded-full bg-gray" />

				{/* Original Language */}
				<p className="text-xs text-gray">{data.original_language}</p>

				<span className="h-1 w-1 rounded-full bg-gray" />

				{/* Genres */}
				{data.genres.slice(0, 1).map((genre, index) => {
					return (
						<Fragment key={index}>
							<p className="text-xs text-gray">{genre}</p>
						</Fragment>
					);
				})}
			</div>
		</Link>
	);
};

export default CinemaCard;
