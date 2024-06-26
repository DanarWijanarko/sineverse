import { PageProps } from "@/Types";
import { Head, Link } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import { useDiscoverMovies, useDiscoverSeries } from "@/Hooks/Api/useDiscover";
import { useTrending } from "@/Hooks/Api/useTrending";

import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { dateWeek } from "@/Services/Utils/Generate/dateWeek";

import DefaultCarousel from "@/Components/Carousel/DefaultCarousel";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import SingleCarousel from "@/Components/Carousel/SingleCarousel";
import MultiCarousel from "@/Components/Carousel/MultiCarousel";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import CinemaCard from "@/Components/Cards/CinemaCard";
import MainLayout from "@/Layouts/MainLayout";

import BookmarkIcon from "@/Components/Icons/BookmarkIcon";
import GenreIcon from "@/Components/Icons/GenreIcon";
import PlayIcon from "@/Components/Icons/PlayIcon";
import StarIcon from "@/Components/Icons/StarIcon";

const Index = ({ auth, flash_message }: PageProps) => {
	const [featured, setFeatured] = useState<ICinemas | undefined>();

	const trendingDay = useTrending("day", ["trendingDay"], 5);
	const trendingWeek = useTrending("week", ["trendingWeek"], 10);
	const koreanSeries = useDiscoverSeries(
		{
			page: 1,
			sort_by: "popularity.desc",
			timezone: "Asia/Jakarta",
			with_original_language: "ko",
			first_air_date_from: new Date("2022-01-01"),
			first_air_date_to: new Date("2023-12-31"),
			with_type: "4",
		},
		["koreanSeries"],
		20,
	);
	const movies = useDiscoverMovies(
		{
			page: 1,
			region: "ID",
			sort_by: "popularity.desc",
		},
		["movies"],
		20,
	);
	const series = useDiscoverSeries(
		{
			page: 1,
			timezone: "Asia/Jakarta",
			sort_by: "popularity.desc",
		},
		["series"],
		20,
	);
	const upcomingMovies = useDiscoverMovies(
		{
			page: 1,
			region: "ID",
			sort_by: "popularity.desc",
			release_date_from: dateWeek("now"),
			release_date_to: dateWeek("next", 3),
			with_release_type: "2|3",
		},
		["upcomingMovies"],
		20,
	);
	const nowPlayingMovies = useDiscoverMovies(
		{
			page: 1,
			region: "ID",
			sort_by: "popularity.desc",
			release_date_from: dateWeek("prev", 1),
			release_date_to: dateWeek("now"),
			with_release_type: "2|3",
		},
		["nowPlayingMovies"],
		20,
	);
	const nowPlayingSeries = useDiscoverSeries(
		{
			page: 1,
			timezone: "Asia/Jakarta",
			sort_by: "popularity.desc",
			air_date_from: dateWeek("prev", 1),
			air_date_to: dateWeek("now"),
			with_type: "4",
		},
		["nowPlayingSeries"],
		20,
	);

	const trendingDayTemplate = (data: ICinemas) => {
		return (
			<div key={data.id} className="relative h-[800px] w-full">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-50" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Image Backdrop */}
				<img
					src={data.backdrop}
					alt={data.title}
					className="absolute left-0 top-0 z-0 h-full w-full object-cover"
				/>

				{/* Details */}
				<div className="absolute bottom-24 left-20 z-20">
					{/* Media Type */}
					<p className="mb-6 w-fit rounded-full bg-black-800 px-3 py-1 text-sm font-bold">
						{ucFirst(data.media_type)}
					</p>

					{/* Title */}
					<Link
						href={route(`main.${data.media_type}.detail`, {
							id: data.id,
							slug: data.slug,
						})}
						className="text-3xl font-extrabold transition-all hover:underline hover:underline-offset-4 hover:opacity-80"
					>
						{data.title}
					</Link>

					{/* Rating, Release Date, Original Language, Genres */}
					<div className="flex flex-row items-center gap-1.5 pb-3 pt-2">
						{/* Ratings */}
						<p className="flex items-center justify-center gap-0.5 text-sm text-gray">
							<StarIcon className="h-5 w-5 text-yellow" />
							{data.vote_average}
						</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Release Date */}
						<p className="text-sm text-gray">{dateLong(data.release_date)}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Original Language */}
						<p className="text-sm text-gray">{data.original_language}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Genres */}
						{data.genres.map((genre, i) => (
							<React.Fragment key={i}>
								<p className="text-sm text-gray">{genre}</p>
								{i !== data.genres.length - 1 && (
									<span className="h-1 w-1 rounded-full bg-gray" />
								)}
							</React.Fragment>
						))}
					</div>

					{/* Overview */}
					<p className="mb-9 line-clamp-5 w-[600px] text-sm font-medium">
						{data.overview}
					</p>

					{/* Buttons */}
					<div className="flex flex-row items-end gap-2.5">
						{/* Watch Trailer */}
						<PrimaryButton className="text-lg">
							<PlayIcon className="-mt-0.5 h-5 w-5" />
							Watch Trailer
						</PrimaryButton>

						{/* Add Watchlist */}
						<SecondaryButton className="text-lg">
							<BookmarkIcon className="-mt-0.5 h-5 w-5" />
							Add Watchlist
						</SecondaryButton>
					</div>
				</div>
			</div>
		);
	};

	const koreanSeriesTemplate = (data: ICinemas) => {
		return (
			<Link
				href={route(`main.${data.media_type}.detail`, { id: data.id, slug: data.slug })}
				className="relative mx-1.5"
			>
				<img
					src={data.poster}
					alt={data.title}
					className="h-full w-72 rounded-lg object-cover"
				/>
			</Link>
		);
	};

	const trendingWeekTemplate = (data: ICinemas) => {
		const index = trendingWeek.data ? trendingWeek.data.indexOf(data) + 1 : 0;

		return (
			<Link
				href={route(`main.${data.media_type}.detail`, { id: data.id, slug: data.slug })}
				className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
			>
				{/* Numbers */}
				<h1 className="text-6xl font-extrabold">{index}</h1>

				{/* Poster */}
				<img
					src={data.poster}
					alt={data.title}
					className="h-36 w-36 rounded-xl object-cover"
				/>

				{/* Media Type, Title, Genre, Ratings */}
				<div className="flex flex-col gap-2.5">
					{/* Media Type */}
					<div className="w-fit rounded-lg border border-gray px-2 py-0.5 text-xs text-gray">
						<p>{ucFirst(data.media_type)}</p>
					</div>

					{/* Title */}
					<h1 className="line-clamp-1 w-40 text-xl font-bold">{data.title}</h1>

					{/* Genre */}
					<div className="flex items-center gap-1 text-gray">
						<GenreIcon className="h-5 w-5 text-gray" />
						{data.genres.slice(0, 1).map((genre, index) => (
							<p key={index} className="text-sm font-medium">
								{genre}
							</p>
						))}
					</div>

					{/* Ratings & Vote Count */}
					<p className="flex items-center gap-0.5 text-sm text-white">
						<StarIcon className="h-5 w-5 text-yellow" />
						{data.vote_average}
						<span className="text-gray">({data.vote_count})</span>
					</p>
				</div>
			</Link>
		);
	};

	const featuredTemplate = (data: ICinemas) => {
		return (
			<button
				className={`overflow-hidden rounded-lg ${
					data.id == featured?.id ? "border border-green" : "border border-white"
				}`}
				onClick={() => setFeatured(data)}
			>
				<img src={data.poster} alt={data.title} className="h-96 w-full object-cover" />
			</button>
		);
	};

	const upcomingMoviesTemplate = (data: ICinemas) => {
		return (
			<div className="flex flex-col justify-between">
				{/* Backdrop */}
				<img src={data.backdrop} alt={data.title} className="h-full w-full object-cover" />

				{/* Release Date */}
				<div className="mt-5 w-fit rounded-full border border-gray px-2 py-1">
					<p className="text-xs font-medium text-gray">{dateLong(data.release_date)}</p>
				</div>

				{/* Title */}
				<Link
					href={route(`main.${data.media_type}.detail`, { id: data.id, slug: data.slug })}
					className="mt-3 line-clamp-1 text-3xl font-black transition-all duration-300 hover:underline hover:underline-offset-4 hover:opacity-80"
				>
					{data.title}
				</Link>

				{/* Ratings, Original Language, Genres */}
				<div className="mt-1 flex flex-row items-center gap-1.5">
					{/* Ratings */}
					<span className="flex items-center justify-center gap-0.5">
						<StarIcon className="h-4 w-4 text-yellow" />
						<p className="text-sm text-gray">{data.vote_average}</p>
					</span>

					<span className="h-1 w-1 rounded-full bg-gray" />

					{/* Original Language */}
					<p className="text-sm text-gray">{data.original_language}</p>

					<span className="h-1 w-1 rounded-full bg-gray" />

					{/* Genres */}
					{data.genres.map((genre, i) => (
						<React.Fragment key={i}>
							<p className="text-sm text-gray">{genre}</p>
							{i !== data.genres.length - 1 && (
								<span className="h-1 w-1 rounded-full bg-gray" />
							)}
						</React.Fragment>
					))}
				</div>

				{/* Overview */}
				<p className="mt-2 line-clamp-5 text-sm font-medium tracking-[0.3px]">
					{data.overview}
				</p>

				{/* Buttons */}
				<div className="mt-5 flex flex-row items-end gap-2.5">
					{/* Watch Trailer */}
					<PrimaryButton className="text-lg">
						<PlayIcon className="-mt-0.5 h-5 w-5" />
						Watch Trailer
					</PrimaryButton>

					{/* Add Watchlist */}
					<SecondaryButton className="text-lg">
						<BookmarkIcon className="-mt-0.5 h-5 w-5" />
						Add Watchlist
					</SecondaryButton>
				</div>
			</div>
		);
	};

	const nowPlayingTemplate = (data: ICinemas) => {
		return (
			<Link
				href={route(`main.${data.media_type}.detail`, { id: data.id, slug: data.slug })}
				className="flex flex-row items-center gap-3 transition-all duration-500 hover:opacity-80"
			>
				{/* Poster */}
				<img
					src={data.poster}
					alt={data.title}
					className="h-[125px] w-[84px] rounded-xl object-cover"
				/>

				{/* Detail */}
				<div className="flex flex-col justify-center gap-1">
					{/* Original Language */}
					<div className="w-fit rounded-full border border-gray px-2 py-1">
						<p className="text-xs font-medium text-gray">{data.original_language}</p>
					</div>

					{/* Title */}
					<h1 className="line-clamp-1 text-lg font-black">{data.title}</h1>

					{/* Genres */}
					<div className="flex max-w-full items-center gap-1 text-gray">
						<GenreIcon className="h-5 w-5" />
						{data.genres.slice(0, 2).map((genre, index) => (
							<React.Fragment key={index}>
								<p
									className={`whitespace-nowrap text-sm text-gray ${
										index == data.genres.slice(0, 2).length - 1 &&
										"max-w-[70px] truncate"
									}`}
								>
									{genre}
								</p>
								{index !== data.genres.slice(0, 2).length - 1 && (
									<span className="h-1 w-1 rounded-full bg-gray" />
								)}
							</React.Fragment>
						))}
					</div>

					{/* Ratings & Release Year */}
					<div className="flex items-center gap-1 text-gray">
						{/* Ratings */}
						<span className="flex items-center justify-center gap-0.5">
							<StarIcon className="h-4 w-4 text-yellow" />
							<p className="text-sm text-gray">{data.vote_average || 0}</p>
						</span>

						<span className="h-1 w-1 rounded-full bg-gray" />

						<p className="text-sm font-medium text-gray">
							{dateYear(data.release_date)}
						</p>
					</div>
				</div>
			</Link>
		);
	};

	useEffect(() => {
		setFeatured(koreanSeries.data?.results[0]);
	}, [koreanSeries.isPending == false]);

	return (
		<MainLayout>
			<Head title="Home" />

			{/* Trending Day */}
			<SingleCarousel
				value={trendingDay.data}
				isLoading={trendingDay.isPending}
				numScroll={1}
				numVisible={1}
				showNavigators={false}
				showIndicators={true}
				autoplayInterval={5000}
				itemTemplate={trendingDayTemplate}
			/>

			{/* Korean Series */}
			<MultiCarousel
				className="mx-[74px] mt-2"
				value={koreanSeries.data?.results}
				header="Korean Series"
				isLoading={koreanSeries.isPending}
				numScroll={3}
				numVisible={6}
				orientation="horizontal"
				showNavigators={true}
				showIndicators={true}
				itemTemplate={koreanSeriesTemplate}
			/>

			{/* Trending Week */}
			<DefaultCarousel
				className="mt-16"
				value={trendingWeek.data}
				header="Popular of the week"
				isLoading={trendingWeek.isPending}
				itemTemplate={trendingWeekTemplate}
			/>

			{/* Featured in SineVerse */}
			<section className="relative mt-20 h-[650px] w-full">
				<span className="absolute left-0 top-0 -z-10 h-[60%] w-full bg-gradient-to-b from-black-800 to-black-800/0" />
				<span className="absolute bottom-0 left-0 -z-10 h-[60%] w-full bg-gradient-to-t from-black-800 to-black-800/0" />

				{/* Selected Backdrop */}
				<img
					src={featured?.backdrop}
					alt={featured?.title}
					className="absolute left-0 top-0 -z-20 h-full w-full object-cover"
				/>

				{/* Content */}
				<div className="grid h-full grid-cols-12 gap-5 py-20">
					{/* Selected Featured Detail */}
					<div className="col-span-4 ml-20 flex flex-col justify-between">
						{/* Title */}
						<div className="flex flex-col gap-1">
							<h1 className="text-2xl font-black tracking-wider">
								Featured in SineVerse
							</h1>
							<p className="font-medium tracking-wide text-gray">
								Best featured for you today
							</p>
						</div>

						{/* Detail Cinema */}
						<div className="flex flex-col">
							{/* Media Type */}
							<div className="w-fit rounded-full bg-black-800 px-3 py-1 text-sm font-bold">
								<p>{ucFirst(featured?.media_type)}</p>
							</div>

							{/* Title */}
							<Link
								href={
									featured !== undefined
										? route(`main.${featured?.media_type}.detail`, {
												id: featured?.id,
												slug: featured?.slug,
											})
										: "#"
								}
								className="mt-5 text-3xl font-black transition-all hover:underline hover:underline-offset-4"
							>
								{featured?.title}
							</Link>

							{/* Ratings, Release Date, Original Language, Genres */}
							<div className="mt-2 flex flex-row items-center gap-1.5">
								{/* Ratings */}
								<span className="flex items-center justify-center gap-0.5">
									<StarIcon className="h-4 w-4 text-yellow" />
									<p className="text-sm text-gray">{featured?.vote_average}</p>
								</span>

								<span className="h-1 w-1 rounded-full bg-gray" />

								{/* Release Date */}
								<p className="text-sm text-gray">
									{dateYear(featured?.release_date)}
								</p>

								<span className="h-1 w-1 rounded-full bg-gray" />

								{/* Original Language */}
								<p className="text-sm text-gray">{featured?.original_language}</p>

								<span className="h-1 w-1 rounded-full bg-gray" />

								{/* Genres */}
								{featured?.genres.map((genre, i) => (
									<React.Fragment key={i}>
										<p className="text-sm text-gray">{genre}</p>
										{i !== featured?.genres.length - 1 && (
											<span className="h-1 w-1 rounded-full bg-gray" />
										)}
									</React.Fragment>
								))}
							</div>

							{/* Overview */}
							<p className="mt-2 line-clamp-5 text-sm font-semibold">
								{featured?.overview}
							</p>

							{/* Buttons */}
							<div className="mt-14 flex flex-row items-end gap-2.5">
								{/* Watch Trailer */}
								<PrimaryButton className="text-lg">
									<PlayIcon className="-mt-0.5 h-5 w-5" />
									Watch Trailer
								</PrimaryButton>

								{/* Add Watchlist */}
								<SecondaryButton className="text-lg">
									<BookmarkIcon className="-mt-0.5 h-5 w-5" />
									Add Watchlist
								</SecondaryButton>
							</div>
						</div>
					</div>

					{/* List of Featured Cinema */}
					<div className="col-span-8 flex flex-row items-center justify-center">
						<DefaultCarousel
							value={koreanSeries.data?.results}
							isLoading={koreanSeries.isPending}
							itemTemplate={featuredTemplate}
						/>
					</div>
				</div>
			</section>

			{/* Movies */}
			<MultiCarousel
				className="mx-[74px] mt-16"
				value={movies.data?.results}
				header="Movies"
				isLoading={movies.isPending}
				numScroll={3}
				numVisible={5}
				orientation="horizontal"
				showNavigators={true}
				showIndicators={true}
				itemTemplate={(data: ICinemas) => (
					<CinemaCard
						className="mx-1.5"
						href={route(`main.${data.media_type}.detail`, {
							id: data.id,
							slug: data.slug,
						})}
						data={data}
					/>
				)}
			/>

			{/* Series */}
			<MultiCarousel
				className="mx-[74px] mt-16"
				value={series.data?.results}
				header="Series"
				isLoading={series.isPending}
				numScroll={3}
				numVisible={5}
				orientation="horizontal"
				showNavigators={true}
				showIndicators={true}
				itemTemplate={(data: ICinemas) => (
					<CinemaCard
						className="mx-1.5"
						href={route(`main.${data.media_type}.detail`, {
							id: data.id,
							slug: data.slug,
						})}
						data={data}
					/>
				)}
			/>

			{/* Upcoming Movies & Now Playing */}
			<section className="mt-16 grid w-full grid-cols-12 gap-5 px-20">
				{/* Upcoming Movies */}
				<div className="relative col-span-6">
					<SingleCarousel
						value={upcomingMovies.data?.results}
						header="Upcoming Movies in Indonesia"
						isLoading={upcomingMovies.isPending}
						numScroll={1}
						numVisible={1}
						showNavigators={true}
						showIndicators={false}
						itemTemplate={upcomingMoviesTemplate}
					/>
				</div>

				{/* Now Playing */}
				<div className="relative col-span-6">
					<h1 className="text-xl font-bold tracking-wide">Now Playing</h1>

					<div className="mt-2 grid grid-cols-6 gap-5">
						{/* Movies */}
						<div className="relative col-span-3">
							<MultiCarousel
								value={nowPlayingMovies.data?.results}
								header="Movies"
								isLoading={nowPlayingMovies.isPending}
								numScroll={3}
								numVisible={5}
								orientation="vertical"
								verticalViewPortHeight="700px"
								showNavigators={true}
								showIndicators={false}
								itemTemplate={nowPlayingTemplate}
							/>
						</div>

						{/* Series */}
						<div className="relative col-span-3">
							<MultiCarousel
								value={nowPlayingSeries.data?.results}
								header="Series"
								isLoading={nowPlayingSeries.isPending}
								numScroll={3}
								numVisible={5}
								orientation="vertical"
								verticalViewPortHeight="700px"
								showNavigators={true}
								showIndicators={false}
								itemTemplate={nowPlayingTemplate}
							/>
						</div>
					</div>
				</div>
			</section>
		</MainLayout>
	);
};

export default Index;
