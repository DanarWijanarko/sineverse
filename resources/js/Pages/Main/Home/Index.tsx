import { Head, Link } from "@inertiajs/react";

import { useTrending } from "@/Hooks/Api/useTrending";
import { PageProps } from "@/Types";

import DefaultCarousel from "@/Components/Carousel/DefaultCarousel";
import SingleCarousel from "@/Components/Carousel/SingleCarousel";
import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import MultiCarousel from "@/Components/Carousel/MultiCarousel";
import { useDiscoverMovies, useDiscoverSeries } from "@/Hooks/Api/useDiscover";
import CinemaCard from "@/Components/Cards/CinemaCard";
import GenreIcon from "@/Components/Icons/GenreIcon";
import StarIcon from "@/Components/Icons/StarIcon";
import MainLayout from "@/Layouts/MainLayout";
import React, { useEffect, useState } from "react";
import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import SecondaryButton from "@/Components/Buttons/SecondaryButton";
import { dateWeek } from "@/Services/Utils/Generate/dateWeek";
import PlayIcon from "@/Components/Icons/PlayIcon";
import BookmarkIcon from "@/Components/Icons/BookmarkIcon";

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
            with_type: 4,
        },
        ["koreanSeries"],
        20
    );
    const movies = useDiscoverMovies(
        {
            page: 1,
            region: "ID",
            sort_by: "popularity.desc",
        },
        ["movies"],
        20
    );
    const series = useDiscoverSeries(
        {
            page: 1,
            timezone: "Asia/Jakarta",
            sort_by: "popularity.desc",
        },
        ["series"],
        20
    );
    const upcomingMovies = useDiscoverMovies(
        {
            page: 1,
            region: "ID",
            sort_by: "popularity.desc",
            release_date_from: dateWeek("now"),
            release_date_to: dateWeek("next"),
            with_release_type: "2|3",
        },
        ["upcomingMovies"],
        20
    );

    const koreanSeriesTemplate = (data: ICinemas) => {
        return (
            <Link href="#" className="relative mx-1.5">
                <img
                    src={data.poster}
                    alt={data.title}
                    className="w-72 h-full object-cover rounded-lg"
                />
            </Link>
        );
    };

    const trendingWeekTemplate = (data: ICinemas) => {
        const index = trendingWeek.data
            ? trendingWeek.data.indexOf(data) + 1
            : 0;

        return (
            <Link
                href={`#`}
                className="flex items-center gap-3 transition-all duration-300 hover:opacity-80"
            >
                {/* Numbers */}
                <h1 className="font-extrabold text-6xl">{index}</h1>

                {/* Poster */}
                <img
                    src={data.poster}
                    alt={data.title}
                    className="rounded-xl h-36 w-36 object-cover"
                />

                {/* Media Type, Title, Genre, Ratings */}
                <div className=" flex flex-col gap-2.5">
                    {/* Media Type */}
                    <div className="w-fit px-2 py-0.5 text-xs border rounded-lg border-gray text-gray">
                        <p>{ucFirst(data.media_type)}</p>
                    </div>

                    {/* Title */}
                    <h1 className="font-bold text-xl line-clamp-1 w-40">
                        {data.title}
                    </h1>

                    {/* Genre */}
                    <div className="flex items-center gap-1 text-gray">
                        <GenreIcon className="w-5 h-5 text-gray" />
                        {data.genres.slice(0, 1).map((genre, index) => (
                            <p key={index} className="text-sm font-medium">
                                {genre}
                            </p>
                        ))}
                    </div>

                    {/* Ratings & Vote Count */}
                    <p className="text-white text-sm flex items-center gap-0.5">
                        <StarIcon className="w-5 h-5 text-yellow" />
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
                className={`rounded-lg overflow-hidden ${
                    data.id == featured?.id
                        ? "border border-green"
                        : "border border-white"
                }`}
                onClick={() => setFeatured(data)}
            >
                <img
                    src={data.poster}
                    alt={data.title}
                    className="w-full h-96 object-cover"
                />
            </button>
        );
    };

    const upcomingMoviesTemplate = (data: ICinemas) => {
        return (
            <div className="flex flex-col justify-between">
                {/* Backdrop */}
                <img
                    src={data.backdrop}
                    alt={data.title}
                    className="h-96 w-full object-cover"
                />

                {/* Release Date */}
                <div className="border border-gray w-fit rounded-full px-2 py-1">
                    <p className="text-gray text-xs font-medium">
                        {dateLong(data.release_date)}
                    </p>
                </div>

                {/* Title */}
                <Link
                    href="#"
                    className="font-black text-3xl line-clamp-1 transition-all duration-300 hover:opacity-80 hover:underline-offset-4 hover:underline"
                >
                    {data.title}
                </Link>

                {/* Ratings, Original Language, Genres */}
                <div className="flex flex-row gap-1.5 items-center">
                    {/* Ratings */}
                    <span className="flex justify-center items-center gap-0.5">
                        <StarIcon className="w-4 h-4 text-yellow" />
                        <p className="text-gray text-sm">{data.vote_average}</p>
                    </span>

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
                <p className="line-clamp-5 font-medium text-sm tracking-[0.3px]">
                    {data.overview}
                </p>

                {/* Buttons */}
                <div className="flex flex-row gap-2.5 items-end">
                    {/* Watch Trailer */}
                    <PrimaryButton className="text-lg">
                        <PlayIcon className="w-5 h-5 -mt-0.5" />
                        Watch Trailer
                    </PrimaryButton>

                    {/* Add Watchlist */}
                    <SecondaryButton className="text-lg">
                        <BookmarkIcon className="w-5 h-5 -mt-0.5" />
                        Add Watchlist
                    </SecondaryButton>
                </div>
            </div>
        );
    };

    useEffect(() => {
        setFeatured(koreanSeries.data?.results[0]);
    }, [koreanSeries.isPending == false]);

    console.log(upcomingMovies.data?.results);

    return (
        <MainLayout>
            <Head title="Home" />

            {/* Trending Day */}
            <SingleCarousel
                value={trendingDay.data}
                isLoading={trendingDay.isPending}
            />

            {/* Korean Series */}
            <MultiCarousel
                className="mt-2 mx-[74px]"
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
                className="mt-16 mx-[74px]"
                value={trendingWeek.data}
                header="Popular of the week"
                isLoading={trendingWeek.isPending}
                itemTemplate={trendingWeekTemplate}
            />

            {/* Featured in SineVerse */}
            <section className="relative w-full mt-20 h-[650px]">
                <span className="absolute top-0 left-0 -z-10 w-full h-[60%] bg-gradient-to-b from-black-800 to-black-800/0" />
                <span className="absolute bottom-0 left-0 -z-10 w-full h-[60%] bg-gradient-to-t from-black-800 to-black-800/0" />

                {/* Selected Backdrop */}
                <img
                    src={featured?.backdrop}
                    alt={featured?.title}
                    className="absolute top-0 left-0 -z-20 w-full h-full object-cover"
                />

                {/* Content */}
                <div className="grid grid-cols-12 py-20 gap-5 h-full">
                    {/* Selected Featured Detail */}
                    <div className="col-span-4 flex flex-col justify-between ml-20">
                        {/* Title */}
                        <div className="flex flex-col gap-1">
                            <h1 className="text-2xl font-black tracking-wider">
                                Featured in SineVerse
                            </h1>
                            <p className="text-gray font-medium tracking-wide">
                                Best featured for you today
                            </p>
                        </div>

                        {/* Detail Cinema */}
                        <div className="flex flex-col">
                            {/* Media Type */}
                            <div className="bg-black-800 w-fit px-3 py-1 rounded-full text-sm font-bold">
                                <p>{ucFirst(featured?.media_type)}</p>
                            </div>

                            {/* Title */}
                            <Link href="#" className="mt-5 text-3xl font-black">
                                {featured?.title}
                            </Link>

                            {/* Ratings, Release Date, Original Language, Genres */}
                            <div className="flex flex-row gap-1.5 items-center mt-2">
                                {/* Ratings */}
                                <span className="flex justify-center items-center gap-0.5">
                                    <StarIcon className="w-4 h-4 text-yellow" />
                                    <p className="text-gray text-sm">
                                        {featured?.vote_average}
                                    </p>
                                </span>

                                <span className="w-1 h-1 bg-gray rounded-full" />

                                {/* Release Date */}
                                <p className="text-gray text-sm">
                                    {dateYear(featured?.release_date)}
                                </p>

                                <span className="w-1 h-1 bg-gray rounded-full" />

                                {/* Original Language */}
                                <p className="text-gray text-sm">
                                    {featured?.original_language}
                                </p>

                                <span className="w-1 h-1 bg-gray rounded-full" />

                                {/* Genres */}
                                {featured?.genres.map((genre, i) => (
                                    <React.Fragment key={i}>
                                        <p className="text-gray text-sm">
                                            {genre}
                                        </p>
                                        {i !== featured?.genres.length - 1 && (
                                            <span className="w-1 h-1 bg-gray rounded-full" />
                                        )}
                                    </React.Fragment>
                                ))}
                            </div>

                            {/* Overview */}
                            <p className="text-sm font-semibold line-clamp-5 mt-2">
                                {featured?.overview}
                            </p>

                            {/* Buttons */}
                            <div className="flex flex-row gap-2.5 items-end mt-14">
                                {/* Watch Trailer */}
                                <PrimaryButton className="text-lg">
                                    <PlayIcon className="w-5 h-5 -mt-0.5" />
                                    Watch Trailer
                                </PrimaryButton>

                                {/* Add Watchlist */}
                                <SecondaryButton className="text-lg">
                                    <BookmarkIcon className="w-5 h-5 -mt-0.5" />
                                    Add Watchlist
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>

                    {/* List of Featured Cinema */}
                    <div className="col-span-8 flex flex-row justify-center items-center">
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
                className="mt-16 mx-[74px]"
                value={movies.data?.results}
                header="Movies"
                isLoading={movies.isPending}
                numScroll={2}
                numVisible={4}
                orientation="horizontal"
                showNavigators={true}
                showIndicators={true}
                itemTemplate={(data: ICinemas) => (
                    <CinemaCard className="mx-1.5" data={data} href="#" />
                )}
            />

            {/* Series */}
            <MultiCarousel
                className="mt-16 mx-[74px]"
                value={series.data?.results}
                header="Series"
                isLoading={series.isPending}
                numScroll={2}
                numVisible={4}
                orientation="horizontal"
                showNavigators={true}
                showIndicators={true}
                itemTemplate={(data: ICinemas) => (
                    <CinemaCard className="mx-1.5" data={data} href="#" />
                )}
            />

            {/* Upcoming Movies & Now Playing */}
            <section className="w-full mt-16 px-20 grid grid-cols-12 gap-5">
                {/* Upcoming Movies */}
                <div className="relative col-span-6 bg-red">
                    <MultiCarousel
                        value={upcomingMovies.data?.results}
                        header="Upcoming Movies in Indonesia"
                        isLoading={upcomingMovies.isPending}
                        numScroll={1}
                        numVisible={1}
                        orientation="vertical"
                        verticalViewPortHeight="700px"
                        showNavigators={true}
                        showIndicators={false}
                        itemTemplate={upcomingMoviesTemplate}
                    />
                </div>

                {/* Now Playing */}
                <div className="relative col-span-6"></div>
            </section>
        </MainLayout>
    );
};

export default Index;
