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
		!!converted || !!selectedCountry,
	);

	const selectedCountryTemplate = (option: ICountries, props: DropdownProps) => {
		if (option) {
			return (
				<div className="flex w-40 flex-row gap-2">
					<div className="h-5 w-5">
						<span className={`fi fi-${option.iso_3166_1.toLowerCase()}`} />
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
				<div className="h-5 w-5">
					<span className={`fi fi-${option.iso_3166_1.toLowerCase()}`} />
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
			<section className="relative h-[500px] w-full overflow-hidden">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-65" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Background Image */}
				<img
					src="/images/images.png"
					alt="Image"
					className="absolute left-0 top-0 h-full w-full object-cover"
				/>

				{/* Text */}
				<div className="absolute bottom-16 left-20 z-20">
					<h1 className="w-[750px] text-5xl font-extrabold tracking-wider">
						Schedule Release All Cinemas Arround The World
					</h1>
					<p className="mt-3 font-semibold text-gray">
						Get up to date to Cinemas schedule release in selected Region
					</p>
				</div>
			</section>

			{/* Select Countries */}
			<section className="mx-20 mt-1 flex items-start justify-between">
				{/* Upcoming Release Title */}
				<h1 className="text-2xl font-extrabold uppercase text-white">Upcoming Release</h1>

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
			<section className="flex w-full flex-col gap-3 pl-20">
				{comingSoon.isPending
					? // ? Skeleton Loading
						itemSkeletonArray.map((_, index) => (
							<div key={index} className="mt-6">
								<div className="border-b border-black-700 pb-6 font-extrabold">
									<Skeleton className="h5 w-32 rounded-xl" />
								</div>

								<div className="flex max-h-[400px] w-full flex-col flex-wrap place-content-start gap-5 pt-3">
									{cinemaSkeletonArray.map((_, index) => (
										<div
											key={index}
											className="mr-12 flex w-fit flex-row items-center gap-3"
										>
											<Skeleton className="h-10 w-10 rounded-full" />

											<div className="flex flex-row items-center gap-2">
												<Skeleton className="h-16 w-16 rounded-2xl" />
												<div className="flex w-80 flex-col items-start gap-1">
													<Skeleton className="h-5 w-9/12 rounded-lg" />
													<Skeleton className="h-3 w-1/2 rounded-lg" />
												</div>
											</div>
										</div>
									))}
								</div>
							</div>
						))
					: // ? Results
						comingSoon.data?.map((item, index) => (
							<div key={index} className="mt-6">
								{/* Month Value */}
								<h1 className="border-b border-black-700 pb-2 text-xl font-extrabold uppercase">
									{item.date.month}
								</h1>

								{/* Cinema Results */}
								<div className="flex max-h-[400px] w-full flex-col flex-wrap place-content-start gap-5 pt-3">
									{item.data.length !== 0 ? (
										// ? Data Available
										item.data.map((cinema, index) => (
											<div
												key={index}
												className="mr-10 flex w-fit flex-row items-center gap-3"
											>
												{/* Release Date Number of Day */}
												<div className="flex h-10 w-10 items-center justify-center rounded-full bg-white">
													<p className="text-xl font-extrabold text-black-900">
														{dateDay(cinema.release_date)}
													</p>
												</div>

												{/* Poster, Title, Ratings, Media Type, & Original Language */}
												<div className="flex flex-row items-center gap-2">
													{/* Poster Image */}
													<img
														src={cinema.poster}
														alt={cinema.title}
														className="h-16 w-16 rounded-2xl object-cover"
													/>

													{/* Details */}
													<div className="flex flex-col items-start gap-1">
														{/* Title */}
														<h1 className="line-clamp-1 w-80 font-bold">
															{cinema.title}
														</h1>

														{/* Ratings, Media Type, & Original Language */}
														<div className="mt-1.5 flex flex-row items-center gap-1.5">
															{/* Ratings */}
															<p className="flex items-center justify-center gap-0.5 text-sm text-gray">
																<StarIcon className="h-5 w-5 text-yellow" />
																{cinema.vote_average || 0}
															</p>

															<span className="h-1 w-1 rounded-full bg-gray" />

															{/* Media Type */}
															<p className="text-sm text-gray">
																{ucFirst(cinema.media_type)}
															</p>

															<span className="h-1 w-1 rounded-full bg-gray" />

															{/* Original Language */}
															<p className="text-sm text-gray">
																{cinema.original_language}
															</p>
														</div>
													</div>
												</div>
											</div>
										))
									) : (
										// ? Data not Available
										<div className="flex h-[100px] w-full items-center justify-center">
											<p className="text-lg font-medium text-gray">
												No Movies or Series were Released in{" "}
												<span className="font-semibold text-white">
													{item.date.month}
												</span>
											</p>
										</div>
									)}
								</div>
							</div>
						))}
			</section>
		</MainLayout>
	);
};

export default Index;
