import AccordionMenu from "@/Components/Common/AccordionMenu";
import Dropdown from "@/Components/Common/Dropdown";
import Skeleton from "@/Components/Common/Skeleton";
import CustomTooltip from "@/Components/Common/Tooltip";
import Checkbox from "@/Components/Forms/Checkbox";
import InputDropdown from "@/Components/Forms/InputDropdown";
import ChecklistIcon from "@/Components/Icons/ChecklistIcon";
import ChevronIcon from "@/Components/Icons/ChevronIcon";
import { useCountries, useGenres, useLanguages, useWatchProviders } from "@/Hooks/Api/useConfigs";
import { useDiscoverMovies } from "@/Hooks/Api/useDiscover";
import { useMultiState } from "@/Hooks/useMultiState";
import MainLayout from "@/Layouts/MainLayout";
import { moviesTypeOptions } from "@/Services/Constants/moviesTypeOptions";
import { selectReleaseDateOption } from "@/Services/Constants/releaseDateOptions";
import { sortByMoviesOptions } from "@/Services/Constants/sortByMoviesOptions";
import { handleMultiSelect } from "@/Services/Utils/handleMultiSelect";
import { PageProps } from "@/Types";
import { Head, usePage } from "@inertiajs/react";
import { AccordionTab } from "primereact/accordion";
import { DropdownProps } from "primereact/dropdown";
import React, { Fragment } from "react";

const Index = () => {
	const { media_type } = usePage<PageProps>().props;

	const { data, setData, reset } = useMultiState({
		page: 1,
		sort_by: sortByMoviesOptions[0].types[0],
		region: {
			english_name: "Indonesia",
			iso_3166_1: "ID",
			native_name: "Indonesia",
		},
		release_date_options: "all_region",
		release_date: { from: undefined, to: new Date() },
		watch_region: {
			iso_3166_1: "ID",
			english_name: "Indonesia",
			native_name: "Indonesia",
		},
		with_genres: [],
		with_original_language: {
			iso_639_1: undefined,
			english_name: undefined,
			name: undefined,
		},
		with_release_type: moviesTypeOptions.map((res) => res.value),
		with_runtime: [0, 400],
		with_watch_providers: [] as Array<any>,
	});

	const countriesConfig = useCountries(["countries"]);
	const languagesConfig = useLanguages(["languages"]);
	const genresConfig = useGenres(["genres"], media_type);
	const watchProvidersConfig = useWatchProviders(
		{ watch_region: data.watch_region.iso_3166_1 },
		["watchProviders", data.watch_region.iso_3166_1],
		media_type,
		!!data.watch_region,
	);

	const selectReleaseDate = selectReleaseDateOption(data.release_date_options, data.release_date);

	const movies = useDiscoverMovies(
		{
			page: data.page,
			sort_by: data.sort_by.value,
			region: data.region.iso_3166_1,
			primary_release_date_from: selectReleaseDate.primary_from,
			primary_release_date_to: selectReleaseDate.primary_to,
			release_date_from: selectReleaseDate.release_from,
			release_date_to: selectReleaseDate.release_to,
			watch_region: data.watch_region.iso_3166_1,
			with_genres: data.with_genres.join(","),
			with_original_language: data.with_original_language.iso_639_1,
			with_release_type: data.with_release_type.join("|"),
			with_runtime_from: data.with_runtime[0],
			with_runtime_to: data.with_runtime[1],
			with_watch_providers: data.with_watch_providers.join("|"),
		},
		["movies", data.page],
		20,
	);

	// console.log(movies.data?.results);

	// console.log(data.with_watch_providers);

	const handleMoviesTypeOnChange = (e: any, index: any) => {
		const selectedValue = moviesTypeOptions[index].value;
		if (e.target.checked) {
			setData("with_release_type", [...data.with_release_type, selectedValue]);
		} else {
			setData(
				"with_release_type",
				data.with_release_type.filter((value) => value !== selectedValue),
			);
		}
	};

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

	const skeletonArr = Array.from(Array(24).keys());

	return (
		<MainLayout>
			<Head title="Movies" />

			<section className="flex w-full shrink-0 grow-0 flex-row gap-5 px-20 pt-28">
				{/* All Filters */}
				<div className="min-w-[300px] max-w-[300px]">
					<AccordionMenu multiple={true} activeIndex={2}>
						{/* Sorting */}
						<AccordionTab header="Sorting">
							{sortByMoviesOptions.map((item, index) => (
								<Dropdown key={index}>
									{/* Select Sort by */}
									<Dropdown.Trigger className="flex w-full justify-between px-5 py-1 transition-all duration-500 hover:bg-black-700">
										<p>{item.name}</p>
										{data.sort_by.index === index ? (
											data.sort_by.type_name
										) : (
											<ChevronIcon className="mt-0.5 h-4 w-4" type="right" />
										)}
									</Dropdown.Trigger>

									{/* Select Sort by Options */}
									<Dropdown.Content align="endRight" className="overflow-hidden">
										{item.types.map((type, typeIndex) => (
											<Dropdown.Button
												key={typeIndex}
												className={`w-full whitespace-nowrap px-3 py-1 transition-all duration-500 hover:bg-black-700 ${
													data.sort_by.index === type.index &&
													data.sort_by.type_name === type.type_name
														? "bg-green"
														: ""
												}`}
												onClick={() => setData("sort_by", type)}
											>
												{type.type_name}
											</Dropdown.Button>
										))}
									</Dropdown.Content>
								</Dropdown>
							))}
						</AccordionTab>

						{/* Where to Watch */}
						<AccordionTab header="Where to Watch">
							{/* Select a Country */}
							<div className="w-full px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Country</h1>

								{/* Content */}
								<InputDropdown
									value={data.watch_region}
									onChange={(e) => setData("watch_region", e.value)}
									options={countriesConfig.data}
									optionLabel="english_name"
									placeholder="Select a Country"
									isLoading={countriesConfig.isPending}
									valueTemplate={selectedCountryTemplate}
									itemTemplate={countryOptionTemplate}
									className="mt-1.5 w-full"
								/>
							</div>

							{/* List of Watch Providers based on Countries */}
							<div className="watch-providers-scrollbar mt-3 grid max-h-[395px] grid-cols-4 gap-1.5 overflow-y-scroll pl-5 pr-4">
								{watchProvidersConfig.isPending
									? skeletonArr.map((_, index) => (
											<div
												key={index}
												className="col-span-1 h-[60.9px] w-[60.9px] rounded-lg"
											>
												<Skeleton className="h-full w-full rounded-lg" />
											</div>
										))
									: watchProvidersConfig.data?.map((item, index) => (
											<Fragment key={index}>
												<CustomTooltip
													target={`.watch-providers-${index}`}
													position="top"
												>
													{item.name}
												</CustomTooltip>

												{/* Results */}
												<button
													type="button"
													className={`watch-providers-${index} relative col-span-1 h-full w-full overflow-hidden rounded-lg`}
													onClick={() =>
														setData(
															"with_watch_providers",
															handleMultiSelect(
																data.with_watch_providers,
																item.id,
															),
														)
													}
												>
													{/* Image Logo */}
													<img
														src={item.logo}
														alt={item.name}
														className="h-full w-full object-cover"
													/>

													{/* Image Hover Foreground */}
													<span className="absolute left-0 top-0 z-20 h-full w-full opacity-0 transition-opacity hover:bg-green hover:opacity-40" />

													{/* Selected Image Foreground */}
													{data.with_watch_providers.includes(
														item.id,
													) && (
														<div className="absolute left-0 top-0 h-full w-full bg-green bg-opacity-80 p-3">
															<ChecklistIcon className="h-full w-full" />
														</div>
													)}
												</button>
											</Fragment>
										))}
							</div>
						</AccordionTab>

						{/* Filters */}
						<AccordionTab header="Filters">
							{/* Movies Types */}
							<div className="flex flex-col items-start justify-center px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Movies Types</h1>

								{/* Content */}
								<div className="mt-1 flex flex-col items-start gap-1">
									{moviesTypeOptions.map((item, index) => (
										<Checkbox
											key={index}
											name={item.name}
											label={item.name}
											value={item.value}
											position="right"
											checked={data.with_release_type.includes(item.value)}
											onChange={(e) => handleMoviesTypeOnChange(e, index)}
										/>
									))}
								</div>
							</div>
						</AccordionTab>
					</AccordionMenu>
				</div>
			</section>
		</MainLayout>
	);
};

export default Index;
