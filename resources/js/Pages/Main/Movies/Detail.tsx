import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import CinemaCard from "@/Components/Cards/CinemaCard";
import MultiCarousel from "@/Components/Carousel/MultiCarousel";
import Dropdown from "@/Components/Common/Dropdown";
import CustomImage from "@/Components/Common/Image";
import Skeleton from "@/Components/Common/Skeleton";
import { TabItem, TabMenu } from "@/Components/Common/TabMenu";
import BookmarkIcon from "@/Components/Icons/BookmarkIcon";
import ChevronIcon from "@/Components/Icons/ChevronIcon";
import GenreIcon from "@/Components/Icons/GenreIcon";
import PlayIcon from "@/Components/Icons/PlayIcon";
import StarIcon from "@/Components/Icons/StarIcon";
import {
	useDetailCinema,
	useDetailCollection,
	useDetailCredits,
	useDetailMedia,
	useDetailRecommendations,
	useDetailSeasons,
} from "@/Hooks/Api/useDetails";
import { useDiscoverMovies } from "@/Hooks/Api/useDiscover";
import { useMultiState } from "@/Hooks/useMultiState";
import MainLayout from "@/Layouts/MainLayout";
import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import { toTitle } from "@/Services/Utils/Format/slug/toTitle";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { PageProps } from "@/Types";
import { Head, Link } from "@inertiajs/react";
import React, { Fragment, useEffect } from "react";

interface IMultiState {
	company: { id: number | undefined; name: string | undefined; slug: string | undefined };
}

const Detail = ({ movies_id, movies_slug, media_type }: PageProps) => {
	const { data: selected, setData: setSelected } = useMultiState<IMultiState>({
		company: {
			id: undefined,
			name: "",
			slug: "",
		},
	});

	const movies = useDetailCinema(movies_id, ["movies", movies_slug], media_type, !!movies_id);
	const casts = useDetailCredits(movies_id, ["cast"], media_type, !!movies_slug);
	const moviesCollection = useDetailCollection(
		movies.data?.belongs_to_collection?.id,
		["collection", movies.data?.belongs_to_collection?.id],
		!!movies.data?.belongs_to_collection,
	);
	const moviesCompanies = useDiscoverMovies(
		{
			page: 1,
			sort_by: "popularity.desc",
			region: "ID",
			with_companies: selected.company.id?.toString(),
		},
		["seriesCompanies", selected.company.id],
		20,
		!!selected.company.id || !!movies.data?.production_companies,
	);
	const media = useDetailMedia(movies_id, ["media", movies_slug], media_type, !!movies_id);
	const moviesRecommendations = useDetailRecommendations(
		movies_id,
		["moviesRecommendation", movies_slug],
		media_type,
		!!movies_slug,
	);

	const topCastTemplate = (item: ICastResult) => {
		return (
			<Link
				href={route("browse.person.detail", { id: item.id, slug: item.slug })}
				className="mr-1 flex flex-row gap-2 text-center"
			>
				<img
					src={item.profile}
					alt={item.name}
					className="h-14 w-14 rounded-full object-cover"
				/>
				<div className="flex flex-col items-start justify-center">
					<h1 className="line-clamp-1 text-start text-lg font-semibold text-white">
						{item.name}
					</h1>
					<p className="line-clamp-1 text-start text-sm font-medium text-gray">
						{item.character}
					</p>
				</div>
			</Link>
		);
	};

	const cinemasTemplate = (item: ICinemas) => {
		return (
			<Link
				href={route(`main.${item.media_type}.detail`, { id: item.id, slug: item.slug })}
				className="relative mx-1.5 max-w-[430px] overflow-hidden"
			>
				{/* Backdrop Image */}
				<img
					src={item.backdrop}
					alt={item.title}
					className="h-full w-full rounded-lg object-cover"
				/>

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

	const mediaTemplate = (img: string) => {
		return (
			<CustomImage
				src={img}
				width="100%"
				height="100%"
				className="mx-1.5"
				imageClassName="h-full w-full"
				preview={true}
			/>
		);
	};

	useEffect(() => {
		setSelected("company", {
			id: movies.data?.production_companies[0].id,
			name: movies.data?.production_companies[0].name,
			slug: movies.data?.production_companies[0].slug,
		});
	}, [movies.data]);

	if (movies.isPending || !selected.company.id) {
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
			<Head title={toTitle(movies_slug)} />

			{/* Backdrop & Some Details */}
			<section className="relative h-[700px] w-full overflow-hidden">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-50" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Backdrop Image */}
				<img
					src={movies.data?.backdrop}
					alt={movies.data?.title}
					className="absolute left-0 top-0 z-0 h-full w-full object-cover"
				/>

				{/* Text Details */}
				<div className="absolute bottom-20 left-20 right-20 z-10 flex flex-col">
					{/* Media Type */}
					<div className="mb-5 h-fit w-fit rounded-full bg-black-800 px-3.5 py-1">
						<p className="font-medium text-white">{ucFirst(movies.data?.media_type)}</p>
					</div>

					{/* Title */}
					<h1 className="mb-5 text-4xl font-black text-white">{movies.data?.title}</h1>

					{/* Ratings, Original Language, Runtime, Release Date */}
					<div className="mb-3 flex flex-row items-center gap-1.5">
						{/* Ratings */}
						<p className="flex items-center justify-center gap-0.5 text-sm text-gray">
							<StarIcon className="h-5 w-5 text-yellow" />
							{movies.data?.vote_average}
						</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Original Language */}
						<p className="text-sm text-gray">{movies.data?.original_language}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Runtime */}
						<p className="text-sm text-gray">{movies.data?.runtime}</p>

						<span className="h-1 w-1 rounded-full bg-gray" />

						{/* Release Date */}
						<p className="text-sm text-gray">{movies.data?.release_date}</p>
					</div>

					{/* Genres */}
					<div className="mb-7 flex flex-row items-center gap-1.5 font-medium text-gray">
						<GenreIcon className="h-5 w-5" />
						{movies.data?.genres.map((genre, index) => (
							<Fragment key={index}>
								<Link
									href="#"
									className="transition-all duration-300 hover:underline hover:underline-offset-2"
								>
									{genre.name}
								</Link>
								<span
									className={
										index === movies.data.genres.length - 1
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
				<p className="font-medium text-gray">{movies.data?.overview}</p>
			</section>

			{/* Top Cast */}
			<section className="mt-6 flex w-full flex-col gap-2 px-20">
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

			{/* Collection, Companies, Reviews */}
			<TabMenu rootClassName="mt-11" headerClassName="pl-20 text-lg" activeIndex={0}>
				<TabItem name="Collection">
					{/* Link to Detail Collection */}
					<Link
						href={route("browse.collection.detail", {
							id: movies.data?.belongs_to_collection?.id,
							slug: movies.data?.belongs_to_collection?.slug,
						})}
						className="px-20 text-lg font-bold tracking-wider underline underline-offset-4 transition-all duration-300 hover:opacity-80"
					>
						{movies.data?.belongs_to_collection?.name}
					</Link>

					{/* Results */}
					<MultiCarousel
						className="mx-[74px] mt-5"
						value={moviesCollection.data?.results}
						numScroll={2}
						numVisible={4}
						showIndicators={false}
						showNavigators={true}
						isLoading={moviesCollection.isPending}
						itemTemplate={cinemasTemplate}
					/>
				</TabItem>

				<TabItem name="Companies">
					{/* Name & Button Select Company */}
					<div className="flex w-full flex-row items-end justify-between px-20">
						{/* Name */}
						<Link
							href={route("browse.company.detail", {
								id: selected.company.id,
								slug: selected.company.slug,
							})}
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
								{movies.data?.production_companies.map((company, index) => (
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
						className="mx-[74px] mt-5"
						value={moviesCompanies.data?.results}
						numScroll={2}
						numVisible={4}
						showIndicators={false}
						showNavigators={true}
						isLoading={moviesCompanies.isPending || moviesCompanies.isRefetching}
						itemTemplate={cinemasTemplate}
					/>
				</TabItem>

				<TabItem name="Reviews">Reviews</TabItem>
			</TabMenu>

			{/* Media */}
			<section className="mt-16 flex w-full flex-col gap-6">
				{/* Header */}
				<h1 className="mx-20 text-lg font-bold">Media</h1>

				{/* Backdrops, Posters, Videos */}
				<TabMenu headerClassName="pl-20 text-base" activeIndex={0}>
					<TabItem name="Backdrops">
						<MultiCarousel
							className="mx-[74px]"
							value={media.data?.backdrops}
							numScroll={2}
							numVisible={5}
							showIndicators={false}
							showNavigators={true}
							isLoading={media.isPending}
							itemTemplate={mediaTemplate}
						/>
					</TabItem>

					<TabItem name="Posters">
						<MultiCarousel
							className="mx-[74px]"
							value={media.data?.posters}
							numScroll={2}
							numVisible={5}
							showIndicators={false}
							showNavigators={true}
							isLoading={media.isPending}
							itemTemplate={mediaTemplate}
						/>
					</TabItem>

					<TabItem name="Videos">Videos</TabItem>
				</TabMenu>
			</section>

			<div className="mb-14 mt-16 h-[1px] w-full bg-black-700"></div>

			{/* Recommendations */}
			<section className="flex w-full flex-col gap-4">
				<h1 className="pl-20 text-lg font-bold">Recommendations Series for you</h1>

				{moviesRecommendations.data?.results ? (
					<MultiCarousel
						className="mx-[74px]"
						value={moviesRecommendations.data?.results}
						numScroll={2}
						numVisible={5}
						showIndicators={false}
						showNavigators={true}
						isLoading={
							moviesRecommendations.isPending || moviesRecommendations.isRefetching
						}
						itemTemplate={(item: ICinemas) => (
							<CinemaCard
								href={route(`main.${item.media_type}.detail`, {
									id: item.id,
									slug: item.slug,
								})}
								data={item}
								className="mx-1.5"
							/>
						)}
					/>
				) : (
					<p className="mt-10 text-center text-lg font-semibold text-gray">
						We don't have any Similar Series for {movies.data?.title}.
					</p>
				)}
			</section>
		</MainLayout>
	);
};

export default Detail;
