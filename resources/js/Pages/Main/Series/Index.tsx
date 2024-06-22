import PrimaryButton from "@/Components/Buttons/PrimaryButton";
import CinemaCard from "@/Components/Cards/CinemaCard";
import AccordionMenu from "@/Components/Common/AccordionMenu";
import DateSelect from "@/Components/Common/DateSelect";
import Dropdown from "@/Components/Common/Dropdown";
import Pagination from "@/Components/Common/Pagination";
import Skeleton from "@/Components/Common/Skeleton";
import CustomTooltip from "@/Components/Common/Tooltip";
import Checkbox from "@/Components/Forms/Checkbox";
import InputDropdown from "@/Components/Forms/InputDropdown";
import MultiSelectInput from "@/Components/Forms/MultiSelectInput";
import CustomSlider from "@/Components/Forms/Slider";
import ChecklistIcon from "@/Components/Icons/ChecklistIcon";
import ChevronIcon from "@/Components/Icons/ChevronIcon";
import {
	useCountries,
	useGenres,
	useLanguages,
	useNetworks,
	useWatchProviders,
} from "@/Hooks/Api/useConfigs";
import { useDiscoverSeries } from "@/Hooks/Api/useDiscover";
import { useMultiState } from "@/Hooks/useMultiState";
import MainLayout from "@/Layouts/MainLayout";
import { seriesTypeOptions } from "@/Services/Constants/seriesTypeOptions";
import { sortBySeriesOptions } from "@/Services/Constants/sortBySeriesOptions";
import { handleMultiSelect } from "@/Services/Utils/handleMultiSelect";
import { PageProps } from "@/Types";
import { Head, usePage } from "@inertiajs/react";
import { AccordionTab } from "primereact/accordion";
import { DropdownProps } from "primereact/dropdown";
import { classNames } from "primereact/utils";
import { Fragment } from "react/jsx-runtime";

const Index = () => {
	const { media_type } = usePage<PageProps>().props;

	// ? Default Value of Filters
	const { data, setData, reset } = useMultiState<IFilterSeriesParams>({
		page: 1,
		sort_by: sortBySeriesOptions[0].types[0],
		first_air_date: { from: undefined, to: new Date() },
		watch_region: {
			iso_3166_1: "ID",
			english_name: "Indonesia",
			native_name: "Indonesia",
		},
		with_genres: [],
		with_networks: [],
		with_original_language: undefined,
		with_type: [seriesTypeOptions[4].value],
		with_runtime: [0, 400],
		with_watch_providers: [],
	});

	// ? Configs for Filters
	const countriesConfig = useCountries(["countries"]);
	const languagesConfig = useLanguages(["languages"]);
	const genresConfig = useGenres(["genres"], media_type);
	const networksConfig = useNetworks(["networksConfig"]);
	const watchProvidersConfig = useWatchProviders(
		{ watch_region: data.watch_region.iso_3166_1 },
		["watchProviders", data.watch_region.iso_3166_1],
		media_type,
		!!data.watch_region,
	);

	// ? Series Results
	const series = useDiscoverSeries(
		{
			page: data.page,
			sort_by: data.sort_by.value,
			timezone: "Asia/Jakarta",
			first_air_date_from: data.first_air_date.from,
			first_air_date_to: data.first_air_date.to,
			watch_region: data.watch_region.iso_3166_1,
			with_genres: data.with_genres.join(","),
			with_networks: data.with_networks.map((net) => net.id).join("|"),
			with_original_language: data.with_original_language?.iso_639_1,
			with_type: data.with_type.join("|"),
			with_runtime_from: Array.isArray(data.with_runtime) ? data.with_runtime[0] : undefined,
			with_runtime_to: Array.isArray(data.with_runtime) ? data.with_runtime[1] : undefined,
			with_watch_providers: data.with_watch_providers.join("|"),
		},
		["series", data.page],
		20,
	);

	const handleFilterFormReset = (e: any): void => {
		e.preventDefault();
		reset();
		setTimeout(() => {
			series.refetch();
		}, 100);
	};

	const handleFilterFormSubmit = (e: any): void => {
		e.preventDefault();
		series.refetch();
	};

	const handleSeriesTypeOnChange = (e: any, index: any): void => {
		const selectedValue = seriesTypeOptions[index].value;
		if (e.target.checked) {
			setData("with_type", [...data.with_type, selectedValue]);
		} else {
			setData(
				"with_type",
				data.with_type.filter((value) => value !== selectedValue),
			);
		}
	};

	const countriesTemplate = (option: ICountries, props?: DropdownProps) => {
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

		return <span className="mt-[3px] text-sm text-gray">{props?.placeholder}</span>;
	};

	const languagesTemplate = (option: ILanguages, props?: DropdownProps) => {
		if (option) {
			return <p className="text-base text-white">{option.english_name}</p>;
		}

		return <span className="mt-[3px] text-sm text-gray">{props?.placeholder}</span>;
	};

	const networksTemplate = (option: INetworkResults, props?: DropdownProps) => {
		if (option) {
			return (
				<div className="flex w-60 flex-row items-center justify-between overflow-hidden">
					<div className="flex flex-row items-center justify-start gap-1">
						<h1 className="whitespace-pre-wrap break-words font-semibold text-white">
							{option.name}
						</h1>
						<p className="text-gray">({option.origin_country})</p>
					</div>
					<div className="rounded-md bg-white p-1">
						<img src={option.logo} alt={option.name} className="h-5 object-cover" />
					</div>
				</div>
			);
		}

		return <span className="mt-[1px] text-sm text-gray">{props?.placeholder}</span>;
	};

	const skeletonProvidersArr = Array.from(Array(24).keys());
	const skeletonGenresArr = Array.from(Array(24).keys());
	const skeletonResultsArr = Array.from(Array(20).keys());

	return (
		<MainLayout>
			<Head title="Series" />

			<section className="flex w-full shrink-0 grow-0 flex-row gap-5 px-20 pt-28">
				{/* All Filters */}
				<div className="min-w-[300px] max-w-[300px]">
					<AccordionMenu multiple={true} activeIndex={2}>
						{/* Sorting */}
						<AccordionTab header="Sorting">
							{sortBySeriesOptions.map((item, index) => (
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
									<Dropdown.Content
										align="endRight"
										className="overflow-hidden bg-black-900"
									>
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
									valueTemplate={countriesTemplate}
									itemTemplate={countriesTemplate}
									className="mt-1.5 w-full"
								/>
							</div>

							{/* List of Watch Providers based on Countries */}
							<div className="watch-providers-scrollbar mt-3 grid max-h-[395px] grid-cols-4 gap-1.5 overflow-y-scroll pl-5 pr-4">
								{watchProvidersConfig.isPending
									? skeletonProvidersArr.map((_, index) => (
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
						<AccordionTab header="Filters" contentClassName="relative">
							{/* Series Type */}
							<div className="flex flex-col items-start justify-center px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Series Types</h1>

								{/* Content */}
								<div className="mt-1 flex flex-col items-start gap-1">
									{seriesTypeOptions.map((item, index) => (
										<Checkbox
											key={index}
											name={item.name}
											label={item.name}
											value={item.value}
											position="right"
											checked={data.with_type.includes(item.value)}
											onChange={(e) => handleSeriesTypeOnChange(e, index)}
										/>
									))}
								</div>
							</div>

							<div className="absolute left-0 right-0 mt-3.5 h-[1.15px] bg-black-700"></div>

							{/* Genres */}
							<div className="mt-7 flex w-full flex-col gap-2 px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Genres</h1>

								{/* Content */}
								<div className="flex flex-row flex-wrap gap-1.5">
									{genresConfig.isPending
										? skeletonGenresArr.map((_, index) => (
												<Skeleton
													key={index}
													className="h-5 w-20 rounded-xl"
												/>
											))
										: genresConfig.data?.map((genre, index) => (
												<button
													key={index}
													type="button"
													onClick={() =>
														setData(
															"with_genres",
															handleMultiSelect(
																data.with_genres,
																genre.id,
															),
														)
													}
													className={classNames(
														"rounded-2xl border border-black-700 bg-black-800 px-3 py-1 text-white",
														"transition-all duration-300 hover:bg-green hover:text-white",
														{
															"bg-green text-white":
																data.with_genres.includes(
																	genre.id as any,
																),
														},
													)}
												>
													<p className="-mt-0.5 text-sm font-semibold">
														{genre.name}
													</p>
												</button>
											))}
								</div>
							</div>

							<div className="absolute left-0 right-0 mt-3.5 h-[1.15px] bg-black-700"></div>

							{/* First Air Dates */}
							<div className="mt-7 flex flex-col gap-1 px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">First Air Dates</h1>

								{/* Input Date From - To */}
								<div className="mt-1.5 flex w-full flex-col gap-2">
									{/* Date Form */}
									<div className="flex flex-row items-center justify-between">
										<label
											htmlFor="search_from"
											className="font-semibold text-gray"
										>
											from
										</label>
										<DateSelect
											id="search_from"
											value={data.first_air_date.from}
											onChange={(e) =>
												setData("first_air_date", {
													...data.first_air_date,
													from: e.value,
												})
											}
											className="w-44"
										/>
									</div>

									{/* Date To */}
									<div className="flex flex-row items-center justify-between">
										<label
											htmlFor="search_to"
											className="font-semibold text-gray"
										>
											to
										</label>
										<DateSelect
											id="search_to"
											value={data.first_air_date.to}
											onChange={(e) =>
												setData("first_air_date", {
													...data.first_air_date,
													to: e.value,
												})
											}
											className="w-44"
										/>
									</div>
								</div>
							</div>

							<div className="absolute left-0 right-0 mt-3.5 h-[1.15px] bg-black-700"></div>

							{/* Language */}
							<div className="mt-7 flex flex-col gap-2 px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Language</h1>

								{/* Content */}
								<InputDropdown
									value={data.with_original_language}
									onChange={(e) => setData("with_original_language", e.value)}
									options={languagesConfig.data}
									optionLabel="english_name"
									placeholder="None Selected"
									isLoading={languagesConfig.isLoading}
									itemTemplate={languagesTemplate}
									valueTemplate={languagesTemplate}
									className="w-full"
									showClear={true}
								/>
							</div>

							<div className="absolute left-0 right-0 mt-3.5 h-[1.15px] bg-black-700"></div>

							{/* Networks */}
							<div className="mt-7 flex flex-col gap-2 px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Networks</h1>

								{/* Content */}
								<MultiSelectInput
									value={data.with_networks}
									onChange={(e) => setData("with_networks", e.value)}
									options={networksConfig.data}
									optionLabel="name"
									placeholder="Filter series by networks"
									isLoading={networksConfig.isLoading}
									itemTemplate={networksTemplate}
									className="w-full"
								/>
							</div>

							<div className="absolute left-0 right-0 mt-3.5 h-[1.15px] bg-black-700"></div>

							{/* Runtime */}
							<div className="slider mb-1 mt-7 flex flex-col gap-2 px-5">
								{/* Header */}
								<h1 className="font-semibold text-white">Runtime</h1>

								{/* Content */}
								<CustomSlider
									value={data.with_runtime}
									min={0}
									max={400}
									step={15}
									range={true}
									onChange={(e) => setData("with_runtime", e.value)}
									tooltipTarget=".slider"
								/>

								{/* Text Helper */}
								<div className="mt-2 flex w-full justify-between text-xs text-gray">
									<p className="relative ml-1.5">
										<span className="absolute bottom-full left-1/2 h-2 w-0.5 -translate-x-1/2 bg-black-700" />
										0
									</p>
									<p className="relative -ml-1">
										<span className="absolute bottom-full left-1/2 h-3 w-0.5 -translate-x-1/2 bg-black-700" />
										190
									</p>
									<p className="relative mr-0.5">
										<span className="absolute bottom-full left-1/2 h-2 w-0.5 -translate-x-1/2 bg-black-700" />
										400
									</p>
								</div>
							</div>
						</AccordionTab>
					</AccordionMenu>

					{/* Apply & Reset Button */}
					<div className="mt-2.5 flex w-full flex-row gap-2">
						<PrimaryButton
							onClick={handleFilterFormReset}
							className="w-full border-red bg-red hover:bg-red/80"
						>
							Reset
						</PrimaryButton>
						<PrimaryButton onClick={handleFilterFormSubmit} className="w-full">
							Apply
						</PrimaryButton>
					</div>
				</div>

				{/* Results of Filters or Default with no Filters Added */}
				<div className="flex w-full flex-col">
					{/* Series */}
					<div className="grid w-full grid-cols-4 gap-3">
						{series.isPending || series.isRefetching
							? skeletonResultsArr.map((_, index) => (
									<div key={index} className="col-span-1 flex flex-col">
										<Skeleton className="h-[160px] w-full rounded-lg" />
										<Skeleton className="mt-1.5 h-4 w-4/5 rounded-lg" />
										<Skeleton className="mt-1.5 h-4 w-3/4 rounded-lg" />
									</div>
								))
							: series.data?.results.map((series, index) => (
									<CinemaCard
										key={index}
										href={route("main.series.detail", {
											id: series.id,
											slug: series.slug,
										})}
										data={series}
									/>
								))}
					</div>

					{/* Pagination */}
					<Pagination
						currentPage={data.page}
						isLoading={series.isPending || series.isRefetching}
						limit={series.data?.metadata.limit}
						totalPages={series.data?.metadata.total_pages}
						onPageChange={(page) => setData("page", page)}
					/>
				</div>
			</section>
		</MainLayout>
	);
};

export default Index;
