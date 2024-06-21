import { useState } from "react";
import { Head } from "@inertiajs/react";
import ct from "countries-and-timezones";
import { DropdownProps } from "primereact/dropdown";

import { useComingSoon } from "@/Hooks/Api/useComingSoon";
import { useCountries } from "@/Hooks/Api/useConfigs";

import { ucFirst } from "@/Services/Utils/Format/string/ucFirst";
import { dateDay } from "@/Services/Utils/Format/dates/dateDay";

import InputDropdown from "@/Components/Forms/InputDropdown";
import StarIcon from "@/Components/Icons/StarIcon";
import MainLayout from "@/Layouts/MainLayout";
import Skeleton from "@/Components/Common/Skeleton";

const Index = () => {
    const [selectedCountry, setSelectedCountry] = useState({
        iso_3166_1: "ID",
        english_name: "Indonesia",
        native_name: "Indonesia",
    });

    const countries = useCountries(["countries"]);
    const converted = ct.getCountry(selectedCountry.iso_3166_1);

    const comingSoon = useComingSoon(
        {
            page: 1,
            region: converted?.id,
            sort_by: "popularity.desc",
            timezone: converted?.timezones[0],
        },
        ["comingSoon", selectedCountry.english_name],
        20,
        !!converted || !!selectedCountry
    );

    const selectedCountryTemplate = (
        option: ICountries,
        props: DropdownProps
    ) => {
        if (option) {
            return (
                <div className="w-40 flex flex-row gap-2">
                    <div className="w-5 h-5">
                        <span
                            className={`fi fi-${option.iso_3166_1.toLowerCase()}`}
                        />
                    </div>
                    <p className="line-clamp-1">{option.english_name}</p>
                </div>
            );
        }

        return <span>{props.placeholder}</span>;
    };

    const countryOptionTemplate = (option: ICountries) => {
        return (
            <div className="flex flex-row gap-2">
                <div className="w-5 h-5">
                    <span
                        className={`fi fi-${option.iso_3166_1.toLowerCase()}`}
                    />
                </div>
                <p className="line-clamp-1">{option.english_name}</p>
            </div>
        );
    };

    const itemSkeletonArray = new Array(3).fill("");
    const cinemaSkeletonArray = new Array(12).fill("");

    return (
        <MainLayout>
            <Head title="Coming Soon" />

            {/* Page Title */}
            <section className="relative w-full h-[500px] overflow-hidden">
                <span className="absolute left-0 z-10 top-0 w-full h-full bg-black-800 bg-opacity-65" />
                <span className="absolute left-0 z-10 bottom-0 w-full h-1/2 bg-gradient-to-t from-black-800 to-transparent" />

                {/* Background Image */}
                <img
                    src="/images/images.png"
                    alt="Image"
                    className="absolute left-0 top-0 w-full h-full object-cover"
                />

                {/* Text */}
                <div className="absolute bottom-16 z-20 left-20">
                    <h1 className="font-extrabold tracking-wider text-5xl w-[750px]">
                        Schedule Release All Cinemas Arround The World
                    </h1>
                    <p className="text-gray font-semibold mt-3">
                        Get up to date to Cinemas schedule release in selected
                        Region
                    </p>
                </div>
            </section>

            {/* Select Countries */}
            <section className="mx-20 mt-1 flex items-start justify-between">
                {/* Upcoming Release Title */}
                <h1 className="text-white text-2xl uppercase font-extrabold">
                    Upcoming Release
                </h1>

                {/* Select & Search Countries Input */}
                <InputDropdown
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.value)}
                    options={countries.data}
                    optionLabel="english_name"
                    placeholder="Select a Country"
                    isLoading={comingSoon.isLoading}
                    valueTemplate={selectedCountryTemplate}
                    itemTemplate={countryOptionTemplate}
                    className="w-56"
                />
            </section>

            {/* Results */}
            <section className="pl-20 w-full flex flex-col gap-3">
                {comingSoon.isPending ? (
                    // ? Skeleton Loading
                    itemSkeletonArray.map((_, index) => (
                        <div key={index} className="mt-6">
                            <div className="pb-6 font-extrabold border-b border-black-700">
                                <Skeleton className="w-32 h5 rounded-xl" />
                            </div>

                            <div className="pt-3 max-h-[400px] w-full flex flex-col place-content-start flex-wrap gap-5">
                                {cinemaSkeletonArray.map((_, index) => (
                                    <div key={index} className="flex w-fit flex-row items-center gap-3 mr-12">
                                        <Skeleton className="w-10 h-10 rounded-full" />

                                        <div className="flex flex-row items-center gap-2">
                                            <Skeleton className="w-16 h-16 rounded-2xl" />
                                            <div className="w-80 flex flex-col items-start gap-1">
                                                <Skeleton className="w-9/12 h-5 rounded-lg" />
                                                <Skeleton className="w-1/2 h-3 rounded-lg" />
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                ) : (
                    // ? Results
                    comingSoon.data?.map((item, index) => (
                        <div key={index} className="mt-6">
                            {/* Month Value */}
                            <h1 className="pb-2 text-xl uppercase font-extrabold border-b border-black-700">
                                {item.date.month}
                            </h1>

                            {/* Cinema Results */}
                            <div className="pt-3 max-h-[400px] w-full flex flex-col place-content-start flex-wrap gap-5">
                                {item.data.length !== 0 ? (
                                    // ? Data Available
                                    item.data.map((cinema, index) => (
                                        <div
                                            key={index}
                                            className="w-fit mr-10 flex flex-row items-center gap-3"
                                        >
                                            {/* Release Date Number of Day */}
                                            <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                                                <p className="text-black-900 text-xl font-extrabold">
                                                    {dateDay(
                                                        cinema.release_date
                                                    )}
                                                </p>
                                            </div>

                                            {/* Poster, Title, Ratings, Media Type, & Original Language */}
                                            <div className="flex flex-row items-center gap-2">
                                                {/* Poster Image */}
                                                <img
                                                    src={cinema.poster}
                                                    alt={cinema.title}
                                                    className="w-16 h-16 rounded-2xl object-cover"
                                                />

                                                {/* Details */}
                                                <div className="flex flex-col items-start gap-1">
                                                    {/* Title */}
                                                    <h1 className="w-80 font-bold line-clamp-1">
                                                        {cinema.title}
                                                    </h1>

                                                    {/* Ratings, Media Type, & Original Language */}
                                                    <div className="mt-1.5 flex flex-row items-center gap-1.5">
                                                        {/* Ratings */}
                                                        <p className="text-gray text-sm flex justify-center items-center gap-0.5">
                                                            <StarIcon className="w-5 h-5 text-yellow" />
                                                            {cinema.vote_average ||
                                                                0}
                                                        </p>

                                                        <span className="w-1 h-1 bg-gray rounded-full" />

                                                        {/* Media Type */}
                                                        <p className="text-gray text-sm">
                                                            {ucFirst(
                                                                cinema.media_type
                                                            )}
                                                        </p>

                                                        <span className="w-1 h-1 bg-gray rounded-full" />

                                                        {/* Original Language */}
                                                        <p className="text-gray text-sm">
                                                            {
                                                                cinema.original_language
                                                            }
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // ? Data not Available
                                    <div className="w-full h-[100px] flex justify-center items-center">
                                        <p className="text-gray text-lg font-medium">
                                            No Movies or Series were Released in{" "}
                                            <span className="text-white font-semibold">
                                                {item.date.month}
                                            </span>
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </section>
        </MainLayout>
    );
};

export default Index;
