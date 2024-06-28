import CinemaCard from "@/Components/Cards/CinemaCard";
import Pagination from "@/Components/Common/Pagination";
import Skeleton from "@/Components/Common/Skeleton";
import { TabItem, TabMenu } from "@/Components/Common/TabMenu";
import CustomTooltip from "@/Components/Common/Tooltip";
import { useDetailCompany } from "@/Hooks/Api/useDetails";
import { useDiscoverMovies, useDiscoverSeries } from "@/Hooks/Api/useDiscover";
import { useMultiState } from "@/Hooks/useMultiState";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/Types";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

const CompanyDetail = ({ company_id }: PageProps) => {
	const [seriesPage, setSeriesPage] = useState(1);
	const [moviesPage, setMoviesPage] = useState(1);
	const [randomImages, setRandomImages] = useState<string[]>([]);

	const company = useDetailCompany(company_id, ["companyDetail"], !!company_id);

	const seriesCompany = useDiscoverSeries(
		{
			page: seriesPage,
			sort_by: "popularity.desc",
			timezone: "Asia/Jakarta",
			with_companies: company_id.toString(),
		},
		["seriesCompany", seriesPage],
		20,
		!!company_id,
	);

	const moviesCompany = useDiscoverMovies(
		{
			page: moviesPage,
			region: "ID",
			sort_by: "popularity.desc",
			with_companies: company_id.toString(),
		},
		["moviesCompany", moviesPage],
		20,
		!!company_id,
	);

	useEffect(() => {
		if (seriesCompany.data?.results) {
			const randomize = seriesCompany.data.results
				.sort(() => Math.random() - Math.random())
				.slice(0, 8)
				.map((item) => item.backdrop || "");

			setRandomImages(randomize);
		}
	}, [seriesCompany.isPending]);

	if (company.isPending) return <MainLayout>Loading</MainLayout>;

	const skeletonResultsArr = Array.from(Array(20).keys());

	return (
		<MainLayout>
			<Head title={company.data?.name} />

			{/* Company Info */}
			<section className="relative h-[500px] w-full overflow-hidden">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-65" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Images */}
				<div className="absolute left-0 top-0 z-0 grid h-full w-full grid-cols-4">
					{randomImages?.map((res, index) => (
						<img
							key={index}
							src={res}
							alt="photo"
							className="col-span-1 h-full w-full object-cover"
						/>
					))}
				</div>

				{/* Header & Company Details */}
				<div className="absolute bottom-16 left-20 right-20 z-20 flex flex-row items-end justify-between">
					{/* Header */}
					<div>
						<h1 className="w-[650px] text-5xl font-extrabold tracking-wider">
							Discover Series or Movies Produced by {company.data?.name}
						</h1>
						<p className="mt-3 font-semibold text-gray">
							Get Lists of Series Based on {company.data?.name} Company
						</p>
					</div>

					{/* Company Details */}
					<div className="flex flex-col items-end justify-between gap-5">
						{/* Logo */}
						<img src={company.data?.logo} alt={company.data?.name} className="w-44" />

						{/* Headquarters, Country, Homepage */}
						<div className="flex w-full flex-row gap-3">
							{/* Tooltip */}
							<>
								<CustomTooltip target=".headquarters" position="top">
									Headquarters
								</CustomTooltip>
								<CustomTooltip target=".country" position="top">
									Country
								</CustomTooltip>
								<CustomTooltip target=".homepage" position="top">
									Homepage
								</CustomTooltip>
							</>

							{/* Headquarters */}
							<p className="flex flex-row items-center gap-0.5 text-sm text-gray">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="currentColor"
									className="headquarters h-5 w-5 text-white"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M18.364 4.636a9 9 0 0 1 .203 12.519l-.203 .21l-4.243 4.242a3 3 0 0 1 -4.097 .135l-.144 -.135l-4.244 -4.243a9 9 0 0 1 12.728 -12.728zm-6.364 3.364a3 3 0 1 0 0 6a3 3 0 0 0 0 -6z" />
								</svg>
								{company.data?.headquarters}
							</p>

							{/* Country */}
							<p className="flex flex-row items-center gap-0.5 text-sm text-gray">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="country h-5 w-5 text-white"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
									<path d="M3.6 9h16.8" />
									<path d="M3.6 15h16.8" />
									<path d="M11.5 3a17 17 0 0 0 0 18" />
									<path d="M12.5 3a17 17 0 0 1 0 18" />
								</svg>
								{company.data?.origin_country}
							</p>

							{/* Homepage */}
							<a
								href={company.data?.homepage}
								target="_blank"
								className="flex flex-row items-center gap-0.5 text-sm text-gray hover:text-white"
							>
								<svg
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth={2}
									strokeLinecap="round"
									strokeLinejoin="round"
									className="homepage h-5 w-5 text-white"
								>
									<path stroke="none" d="M0 0h24v24H0z" fill="none" />
									<path d="M9 15l6 -6" />
									<path d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464" />
									<path d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463" />
								</svg>
								{company.data?.name}
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* List of Series or Network based on Network */}
			<TabMenu rootClassName="px-20 mt-2" headerClassName="text-lg" activeIndex={0}>
				<TabItem name="Series">
					{/* Results Series */}
					<div className="grid grid-cols-5 gap-5">
						{seriesCompany.isPending
							? skeletonResultsArr.map((_, index) => (
									<Skeleton
										key={index}
										className="col-span-1 h-44 w-full rounded-lg"
									/>
								))
							: seriesCompany.data?.results.map((data, index) => (
									<CinemaCard
										key={index}
										href={route(`main.${data.media_type}.detail`, {
											id: data.id,
											slug: data.slug,
										})}
										data={data}
									/>
								))}
					</div>

					{/* Pagination */}
					<section className="mt-10 w-full">
						<Pagination
							currentPage={seriesPage}
							isLoading={seriesCompany.isPending}
							totalPages={seriesCompany.data?.metadata.total_pages}
							limit={seriesCompany.data?.metadata.limit}
							onPageChange={(page) => setSeriesPage(page)}
						/>
					</section>
				</TabItem>

				<TabItem name="Movies">
					{/* Results Series */}
					<div className="grid grid-cols-5 gap-5">
						{moviesCompany.isPending
							? skeletonResultsArr.map((_, index) => (
									<Skeleton
										key={index}
										className="col-span-1 h-44 w-full rounded-lg"
									/>
								))
							: moviesCompany.data?.results.map((data, index) => (
									<CinemaCard
										key={index}
										href={route(`main.${data.media_type}.detail`, {
											id: data.id,
											slug: data.slug,
										})}
										data={data}
									/>
								))}
					</div>

					{/* Pagination */}
					<section className="mt-10 w-full">
						<Pagination
							currentPage={moviesPage}
							isLoading={moviesCompany.isPending}
							totalPages={moviesCompany.data?.metadata.total_pages}
							limit={moviesCompany.data?.metadata.limit}
							onPageChange={(page) => setMoviesPage(page)}
						/>
					</section>
				</TabItem>
			</TabMenu>
		</MainLayout>
	);
};

export default CompanyDetail;
