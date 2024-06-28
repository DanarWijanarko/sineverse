import CinemaCard from "@/Components/Cards/CinemaCard";
import Skeleton from "@/Components/Common/Skeleton";
import { useDetailCollection } from "@/Hooks/Api/useDetails";
import MainLayout from "@/Layouts/MainLayout";
import { PageProps } from "@/Types";
import { Head } from "@inertiajs/react";
import React from "react";

const CollectionDetail = ({ collection_id }: PageProps) => {
	const detail = useDetailCollection(collection_id, ["detailCollection"], !!collection_id);

	const skeletonResultsArr = Array.from(Array(10).keys());

	if (detail.isPending) {
		return (
			<MainLayout>
				<section className="relative h-[500px] w-full overflow-hidden">
					<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-65" />
					<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

					{/* Images */}
					<Skeleton className="absolute left-0 top-0 h-full w-full" />

					{/* Header & Network Details */}
					<div className="absolute bottom-16 left-20 right-20 z-20 flex flex-col items-start gap-5">
						<Skeleton className="h-6 w-[350px] rounded-lg" />
						<div className="flex flex-col gap-2">
							<Skeleton className="h-3 w-52 rounded-lg" />
							<Skeleton className="h-3 w-40 rounded-lg" />
							<Skeleton className="h-3 w-32 rounded-lg" />
						</div>
					</div>
				</section>

				<section className="mt-2 grid grid-cols-5 gap-5 px-20">
					{skeletonResultsArr.map((_, index) => (
						<Skeleton key={index} className="col-span-1 h-44 w-full rounded-lg" />
					))}
				</section>
			</MainLayout>
		);
	}

	return (
		<MainLayout>
			<Head title={detail.data?.name} />

			{/* Network Info */}
			<section className="relative h-[500px] w-full overflow-hidden">
				<span className="absolute left-0 top-0 z-10 h-full w-full bg-black-800 bg-opacity-65" />
				<span className="to-transparent absolute bottom-0 left-0 z-10 h-1/2 w-full bg-gradient-to-t from-black-800" />

				{/* Images */}
				<img
					src={detail.data?.backdrop}
					alt="photo"
					className="absolute left-0 top-0 h-full w-full object-cover"
				/>

				{/* Header & Network Details */}
				<div className="absolute bottom-16 left-20 right-20 z-20 flex flex-col items-start gap-5">
					{/* Collection Name */}
					<h1 className="w-[650px] text-5xl font-extrabold tracking-wider">
						{detail.data?.name}
					</h1>

					<p className="w-1/2 text-sm font-semibold tracking-wide text-gray">
						{detail.data?.overview}
					</p>
				</div>
			</section>

			{/* List of Series based on Network */}
			<section className="mt-2 grid grid-cols-5 gap-5 px-20">
				{detail.isPending
					? skeletonResultsArr.map((_, index) => (
							<Skeleton key={index} className="col-span-1 h-44 w-full rounded-lg" />
						))
					: detail.data?.results.map((data, index) => (
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
		</MainLayout>
	);
};

export default CollectionDetail;
