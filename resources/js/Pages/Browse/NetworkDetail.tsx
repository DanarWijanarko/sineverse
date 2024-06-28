import { PageProps } from "@/Types";
import { Head } from "@inertiajs/react";
import { useEffect, useState } from "react";

import { useDetailNetwork } from "@/Hooks/Api/useDetails";
import { useDiscoverMovies, useDiscoverSeries } from "@/Hooks/Api/useDiscover";

import CustomTooltip from "@/Components/Common/Tooltip";
import Pagination from "@/Components/Common/Pagination";
import CinemaCard from "@/Components/Cards/CinemaCard";
import Skeleton from "@/Components/Common/Skeleton";
import MainLayout from "@/Layouts/MainLayout";

const NetworkDetail = ({ network_id }: PageProps) => {
	const [currentPage, setCurrentPage] = useState(1);
	const [randomImages, setRandomImages] = useState<string[]>([]);

	const network = useDetailNetwork(network_id, ["networkDetail", network_id], !!network_id);

	const seriesNetwork = useDiscoverSeries(
		{
			page: currentPage,
			sort_by: "popularity.desc",
			timezone: "Asia/Jakarta",
			with_networks: network_id.toString(),
		},
		["seriesNetwork", currentPage, network_id],
		20,
		!!network_id,
	);

	useEffect(() => {
		if (seriesNetwork.data?.results) {
			const randomize = seriesNetwork.data.results
				.sort(() => Math.random() - Math.random())
				.slice(0, 8)
				.map((item) => item.backdrop || "");

			setRandomImages(randomize);
		}
	}, [seriesNetwork.isPending]);

	if (network.isPending) return <MainLayout>Loading</MainLayout>;

	const skeletonResultsArr = Array.from(Array(20).keys());

	return (
		<MainLayout>
			<Head title={network.data?.name} />

			{/* Network Info */}
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

				{/* Header & Network Details */}
				<div className="absolute bottom-16 left-20 right-20 z-20 flex flex-row items-end justify-between">
					{/* Header */}
					<div>
						<h1 className="w-[650px] text-5xl font-extrabold tracking-wider">
							Discover Series Produced by {network.data?.name}
						</h1>
						<p className="mt-3 font-semibold text-gray">
							Get Lists of Series Based on {network.data?.name} Network
						</p>
					</div>

					{/* Network Details */}
					<div className="flex flex-col items-end justify-between gap-5">
						{/* Logo */}
						<img src={network.data?.logo} alt={network.data?.name} className="w-44" />

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
								{network.data?.headquarters}
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
								{network.data?.origin_country}
							</p>

							{/* Homepage */}
							<a
								href={network.data?.homepage}
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
								{network.data?.name}
							</a>
						</div>
					</div>
				</div>
			</section>

			{/* List of Series based on Network */}
			<section className="mt-2 grid grid-cols-5 gap-5 px-20">
				{seriesNetwork.isPending
					? skeletonResultsArr.map((_, index) => (
							<Skeleton key={index} className="col-span-1 h-44 w-full rounded-lg" />
						))
					: seriesNetwork.data?.results.map((data, index) => (
							<CinemaCard
								key={index}
								href={route(`main.${data.media_type}.detail`, {
									id: data.id,
									slug: data.slug,
								})}
								data={data}
							/>
						))}
			</section>

			{/* Pagination */}
			<section className="mt-10 w-full px-20">
				<Pagination
					currentPage={currentPage}
					isLoading={seriesNetwork.isPending}
					totalPages={seriesNetwork.data?.metadata.total_pages}
					limit={seriesNetwork.data?.metadata.limit}
					onPageChange={(page) => setCurrentPage(page)}
				/>
			</section>
		</MainLayout>
	);
};

export default NetworkDetail;
