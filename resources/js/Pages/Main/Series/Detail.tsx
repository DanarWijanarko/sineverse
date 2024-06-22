import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import DefaultCarousel from "@/Components/Carousel/DefaultCarousel";
import MultiCarousel from "@/Components/Carousel/MultiCarousel";
import Dropdown from "@/Components/Common/Dropdown";
import Skeleton from "@/Components/Common/Skeleton";
import { TabItem, TabMenu } from "@/Components/Common/TabMenu";
import BookmarkIcon from "@/Components/Icons/BookmarkIcon";
import ChevronIcon from "@/Components/Icons/ChevronIcon";
import GenreIcon from "@/Components/Icons/GenreIcon";
import PlayIcon from "@/Components/Icons/PlayIcon";
import StarIcon from "@/Components/Icons/StarIcon";
import {
	useDetailCinema,
	useDetailCredits,
	useDetailMedia,
	useDetailSeasons,
} from "@/Hooks/Api/useDetails";
import { useDiscoverSeries } from "@/Hooks/Api/useDiscover";
import { useMultiState } from "@/Hooks/useMultiState";
import MainLayout from "@/Layouts/MainLayout";
import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { toTitle } from "@/Services/Utils/Format/slug/toTitle";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { PageProps } from "@/Types";
import { Head, Link } from "@inertiajs/react";
import React, { Fragment, useEffect } from "react";

interface IMultiState {
	season_number: number;
	network: { id: number | undefined; name: string | undefined; slug: string | undefined };
	company: { id: number | undefined; name: string | undefined; slug: string | undefined };
}

const Detail = ({ series_id, series_slug, media_type }: PageProps) => {
	const { data: selected, setData: setSelected } = useMultiState<IMultiState>({
		season_number: 1,
		network: {
			id: undefined,
			name: "",
			slug: "",
		},
		company: {
			id: undefined,
			name: "",
			slug: "",
		},
	});

	const series = useDetailCinema(series_id, ["series", series_slug], media_type, !!series_id);
	const casts = useDetailCredits(series_id, ["cast"], media_type, !!series_slug);
	const episodes = useDetailSeasons(
		series_id,
		selected.season_number,
		["episodes", selected.season_number],
		true,
	);
	const seriesNetworks = useDiscoverSeries(
		{
			page: 1,
			sort_by: "popularity.desc",
			timezone: "Asia/Jakarta",
			with_networks: selected.network.id?.toString(),
		},
		["networks", selected.network.id],
		20,
		!!selected.network.id || !!series.data?.networks,
	);
	const seriesCompanies = useDiscoverSeries(
		{
			page: 1,
			sort_by: "popularity.desc",
			timezone: "Asia/Jakarta",
			with_companies: selected.company.id?.toString(),
		},
		["seriesCompanies", selected.company.id],
		20,
		!!selected.company.id || !!series.data?.production_companies,
	);
	const media = useDetailMedia(series_id, ["media", series_slug], media_type, !!series_id);

	console.log(media.data);

	const topCastTemplate = (item: ICastResult) => {
		return (
			<Link href={"#"} className="mr-1 flex flex-row gap-2 text-center">
				<img
					src={item.profile}
					alt={item.name}
					className="h-14 w-14 rounded-full object-cover"
				/>
				<div className="flex flex-col items-start justify-center">
					<h1 className="line-clamp-1 text-lg font-semibold text-white">{item.name}</h1>
					<p className="line-clamp-1 text-sm font-medium text-gray">{item.character}</p>
				</div>
			</Link>
		);
	};

	const episodesTemplate = (item: IEpisodesResult) => {
		return (
			<Link href="" className="relative mx-1.5 overflow-hidden">
				{/* Backdrop Image */}
				<img src={item.backdrop} alt={item.name} className="h-[220px] w-full rounded-lg" />

				<div className="absolute bottom-0 w-full rounded-b-lg bg-gradient-to-t from-black-900 from-40% to-black-900/0 px-3 pb-3">
					{/* Name */}
					<h1 className="line-clamp-1 font-semibold">{item.name}</h1>

					{/* Overview */}
					<p className="mb-1 mt-0.5 line-clamp-3 text-xs font-medium text-gray">
						{item.overview}
					</p>

					{/* Air Date, Season Number, Episode Number, Runtime */}
					<div className="flex flex-row items-center gap-1 text-xs text-gray">
						<p className="">{item.air_date}</p>
						<div className="h-1 w-1 rounded-full bg-gray" />
						<p>S{item.season_number}</p>
						<div className="h-1 w-1 rounded-full bg-gray" />
						<p>E{item.episode_number}</p>
						<div className="h-1 w-1 rounded-full bg-gray" />
						<p>{item.runtime}</p>
					</div>
				</div>
			</Link>
		);
	};

	const cinemasTemplate = (item: ICinemas) => {
		return (
			<Link
				href={route(`main.${item.media_type}.detail`, { id: item.id, slug: item.slug })}
				className="relative mx-1.5 overflow-hidden"
			>
				{/* Backdrop Image */}
				<img src={item.backdrop} alt={item.title} className="h-[220px] w-full rounded-lg" />

				{/* Details */}
				<div className="absolute bottom-0 w-full rounded-b-lg bg-gradient-to-t from-black-900 from-40% to-black-900/0 px-3 pb-3">
					{/* Name */}
					<h1 className="line-clamp-1 font-semibold">{item.title}</h1>

					{/* Overview */}
					<p className="mt-0.5 line-clamp-3 text-xs font-medium text-gray">
						{item.overview}
					</p>

					{/* Ratings, Release Date, Original Language, Genres */}
					<div className="mt-1 flex flex-row items-center gap-1.5">
						{/* Ratings */}
						<span className="flex items-center justify-center gap-0.5">
							<StarIcon className="h-4 w-4 text-yellow" />
							<p className="text-xs text-gray">{item.vote_average || 0}</p>
						</span>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Release Date */}
						<p className="text-xs text-gray">{dateYear(item.release_date)}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Original Language */}
						<p className="text-xs text-gray">{item.original_language}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Genres */}
						{item.genres.slice(0, 1).map((genre, index) => {
							return (
								<Fragment key={index}>
									<p className="text-xs text-gray">{genre}</p>
								</Fragment>
							);
						})}
					</div>
				</div>
			</Link>
		);
	};

	useEffect(() => {
		setSelected("network", {
			id: series.data?.networks[0].id,
			name: series.data?.networks[0].name,
			slug: series.data?.networks[0].slug,
		});
		setSelected("company", {
			id: series.data?.production_companies[0].id,
			name: series.data?.production_companies[0].name,
			slug: series.data?.production_companies[0].slug,
		});
	}, [series.data]);

	if (series.isPending) {
		return (
			<>
				{/* Backdrop & Some Details */}
				<section className="relative h-[700px] w-full overflow-hidden">
					<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />
					<Skeleton className="absolute left-0 top-0 z-0 h-full w-full" />

					<div className="absolute bottom-20 left-20 right-20 z-10 flex flex-col">
						<Skeleton className="mb-5 h-7 w-24 rounded-lg" />
						<Skeleton className="mb-5 h-9 w-52 rounded-lg" />
						<Skeleton className="mb-3 h-6 w-72 rounded-lg" />
						<Skeleton className="mb-7 h-6 w-64 rounded-lg" />
						<div className="flex items-center gap-2.5">
							<Skeleton className="h-10 w-32 rounded-lg" />
							<Skeleton className="h-10 w-32 rounded-lg" />
						</div>
					</div>
				</section>

				{/* Overview */}
				<section className="mt-1 flex w-full flex-col gap-2 px-20">
					<Skeleton className="h-5 w-20 rounded-lg" />
					<Skeleton className="h-4 w-full rounded-lg" />
				</section>
			</>
		);
	}

	return (
		<MainLayout>
			<Head title={toTitle(series_slug)} />

			{/* Backdrop & Some Details */}
			<section className="relative h-[700px] w-full overflow-hidden">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-50" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Backdrop Image */}
				<img
					src={series.data?.backdrop}
					alt={series.data?.title}
					className="absolute left-0 top-0 z-0 h-full w-full object-cover"
				/>

				{/* Text Details */}
				<div className="absolute bottom-20 left-20 right-20 z-10 flex flex-col">
					{/* Media Type */}
					<div className="mb-5 h-fit w-fit rounded-full bg-black-800 px-3.5 py-1">
						<p className="font-medium text-white">{ucFirst(series.data?.media_type)}</p>
					</div>

					{/* Title */}
					<h1 className="mb-5 text-4xl font-black text-white">{series.data?.title}</h1>

					{/* Ratings, Original Language, Seasons, Episodes, First - Last Air Dates */}
					<div className="mb-3 flex flex-row items-center gap-1.5">
						{/* Ratings */}
						<p className="flex items-center justify-center gap-0.5 text-sm text-gray">
							<StarIcon className="h-5 w-5 text-yellow" />
							{series.data?.vote_average}
						</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Original Language */}
						<p className="text-sm text-gray">{series.data?.original_language}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Seasons */}
						<p className="text-sm text-gray">
							{series.data?.number_of_seasons +
								` Season${series.data?.number_of_seasons === 1 ? "" : "s"}`}
						</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Episodes */}
						<p className="text-sm text-gray">
							{series.data?.number_of_episodes +
								` Episode${series.data?.number_of_episodes === 1 ? "" : "s"}`}
						</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* First - Last Air Dates */}
						<p className="text-sm text-gray">
							{series.data?.first_air_date + " - " + series.data?.last_air_date}
						</p>
					</div>

					{/* Genres */}
					<div className="mb-7 flex flex-row items-center gap-1.5 font-medium text-gray">
						<GenreIcon className="h-5 w-5" />
						{series.data?.genres.map((genre, index) => (
							<Fragment key={index}>
								<Link
									href="#"
									className="transition-all duration-300 hover:underline hover:underline-offset-2"
								>
									{genre.name}
								</Link>
								<span
									className={
										index === series.data.genres.length - 1
											? "hidden"
											: "h-4 w-0.5 rounded-full bg-gray"
									}
								/>
							</Fragment>
						))}
					</div>

					{/* Buttons */}
					<div className="flex flex-row items-end gap-2.5">
						{/* Watch Trailer */}
						<PrimaryButton className="text-base">
							<PlayIcon className="-mt-0.5 h-5 w-5" />
							Watch Trailer
						</PrimaryButton>

						{/* Add Watchlist */}
						<SecondaryButton className="text-base">
							<BookmarkIcon className="-mt-0.5 h-5 w-5" />
							Add Watchlist
						</SecondaryButton>
					</div>
				</div>
			</section>

			{/* Overview */}
			<section className="mt-1 flex w-full flex-col gap-2 px-20">
				<h1 className="text-lg font-bold">Story Line</h1>
				<p className="font-medium text-gray">{series.data?.overview}</p>
			</section>

			{/* Top Cast */}
			<section className="mt-6 flex w-full flex-col gap-2 pl-20">
				<h1 className="text-lg font-bold">Top Cast</h1>
				<MultiCarousel
					value={casts.data}
					numScroll={3}
					numVisible={7}
					showIndicators={false}
					showNavigators={true}
					isLoading={casts.isPending}
					itemTemplate={topCastTemplate}
				/>
			</section>

			{/* Episodes, Networks, Companies */}
			<TabMenu
				rootClassName="mt-11 h-[365px]"
				headerClassName="pl-20 text-lg"
				activeIndex={0}
			>
				<TabItem name="Episodes">
					{/* Total Episode & Button Select Seasons */}
					<div className="flex w-full flex-row items-center justify-between px-20 pb-5">
						{/* Total Episodes */}
						<h1 className="text-lg font-bold">1 - {episodes.data?.length} Episodes</h1>

						{/* Dropdown Button Select Seasons */}
						<Dropdown>
							<Dropdown.Trigger className="flex flex-row items-center gap-1 rounded-lg border border-black-700 bg-black-900 px-2.5 py-1 text-xs text-white">
								Season {selected.season_number}
								<ChevronIcon type="down" className="h-5 w-5" />
							</Dropdown.Trigger>

							<Dropdown.Content
								className="flex w-28 flex-col gap-0.5 overflow-hidden border border-black-700 bg-black-900"
								spaceContent="1"
							>
								{[...Array(series.data?.number_of_seasons)].map((_, index) => (
									<Dropdown.Button
										key={index + 1}
										onClick={() => setSelected("season_number", index + 1)}
										disabled={selected.season_number === index + 1}
										className={`w-full py-2 text-sm transition-all duration-300 hover:bg-black-700 ${
											selected.season_number === index + 1
												? "bg-black-700"
												: ""
										}`}
									>
										Season {index + 1}
									</Dropdown.Button>
								))}
							</Dropdown.Content>
						</Dropdown>
					</div>

					{/* Results of Episode */}
					<MultiCarousel
						key={selected.season_number}
						className="mx-[74px]"
						value={episodes.data}
						numScroll={3}
						numVisible={5}
						showIndicators={false}
						showNavigators={true}
						isLoading={episodes.isPending || episodes.isRefetching}
						itemTemplate={episodesTemplate}
					/>
				</TabItem>

				<TabItem name="Networks">
					{/* Name & Button Select Network */}
					<div className="flex w-full flex-row items-center justify-between px-20 pb-5">
						{/* Name */}
						<Link
							href={"#"}
							className="text-lg font-bold tracking-wider underline underline-offset-4 transition-all duration-300 hover:opacity-85"
						>
							{selected.network.name}
						</Link>

						{/* Dropdown Button Select Network */}
						<Dropdown>
							<Dropdown.Trigger className="flex flex-row items-center gap-1 rounded-lg border border-black-700 bg-black-900 px-2.5 py-1 text-xs text-white">
								{selected.network.name}
								<ChevronIcon type="down" className="h-5 w-5" />
							</Dropdown.Trigger>

							<Dropdown.Content
								className="flex w-28 flex-col gap-0.5 overflow-hidden border border-black-700 bg-black-900"
								spaceContent="1"
							>
								{series.data?.networks.map((network, index) => (
									<Dropdown.Button
										key={index + 1}
										onClick={() => setSelected("network", network)}
										disabled={selected.network.id === network.id}
										className={`w-full py-2 text-sm transition-all duration-300 hover:bg-black-700 ${
											selected.network.id === network.id ? "bg-black-700" : ""
										}`}
									>
										{network.name}
									</Dropdown.Button>
								))}
							</Dropdown.Content>
						</Dropdown>
					</div>

					{/* Results of Networks */}
					<MultiCarousel
						key={selected.network.id}
						className="mx-[74px]"
						value={seriesNetworks.data?.results}
						numScroll={3}
						numVisible={5}
						showIndicators={false}
						showNavigators={true}
						isLoading={seriesNetworks.isPending || seriesNetworks.isRefetching}
						itemTemplate={cinemasTemplate}
					/>
				</TabItem>

				<TabItem name="Companies">
					{/* Name & Button Select Company */}
					<div className="flex w-full flex-row items-center justify-between px-20 pb-5">
						{/* Name */}
						<Link
							href={"#"}
							className="text-lg font-bold tracking-wider underline underline-offset-4 transition-all duration-300 hover:opacity-85"
						>
							{selected.company.name}
						</Link>

						{/* Dropdown Button Select Company */}
						<Dropdown>
							<Dropdown.Trigger className="flex flex-row items-center gap-1 rounded-lg border border-black-700 bg-black-900 px-2.5 py-1 text-xs text-white">
								{selected.company.name}
								<ChevronIcon type="down" className="h-5 w-5" />
							</Dropdown.Trigger>

							<Dropdown.Content
								className="flex w-32 flex-col gap-0.5 overflow-hidden border border-black-700 bg-black-900"
								spaceContent="1"
							>
								{series.data?.production_companies.map((company, index) => (
									<Dropdown.Button
										key={index + 1}
										onClick={() => setSelected("company", company)}
										disabled={selected.company.id === company.id}
										className={`w-full py-2 text-sm transition-all duration-300 hover:bg-black-700 ${
											selected.company.id === company.id ? "bg-black-700" : ""
										}`}
									>
										{company.name}
									</Dropdown.Button>
								))}
							</Dropdown.Content>
						</Dropdown>
					</div>

					{/* Results of Networks */}
					<MultiCarousel
						key={selected.company.id}
						className="mx-[74px]"
						value={seriesCompanies.data?.results}
						numScroll={3}
						numVisible={5}
						showIndicators={false}
						showNavigators={true}
						isLoading={seriesCompanies.isPending || seriesCompanies.isRefetching}
						itemTemplate={cinemasTemplate}
					/>
				</TabItem>
			</TabMenu>

			{/* Media */}
			<section className="flex w-full flex-col gap-6">
				{/* Header */}
				<h1 className="mx-20 text-lg font-bold">Media</h1>

				{/* Backdrops, Posters, Videos */}
				<TabMenu
					rootClassName="h-[206.4px] mb-12"
					headerClassName="pl-20 text-base"
					contentClassName="h-[206.4px]"
					activeIndex={0}
				>
					<TabItem name="Backdrops">Backdrop</TabItem>

					<TabItem name="Posters">Posters</TabItem>

					<TabItem name="Videos">Videos</TabItem>
				</TabMenu>
			</section>
		</MainLayout>
	);
};

export default Detail;
