import { DOTS, usePagination } from "@/Hooks/usePagination";
import React from "react";
import Skeleton from "./Skeleton";
import ChevronIcon from "../Icons/ChevronIcon";

const Pagination = ({
	currentPage,
	isLoading,
	limit,
	onPageChange,
	siblingCount = 1,
	totalPages,
}: IPagination) => {
	totalPages = totalPages >= 500 ? 500 : totalPages;

	const paginationRange = usePagination({
		currentPage,
		totalPages,
		siblingCount,
	});

	if (
		currentPage === 0 ||
		(paginationRange && paginationRange?.length < 2) ||
		paginationRange?.length === undefined
	) {
		return undefined;
	}

	const start_per_page = (currentPage - 1) * limit + 1;
	const end_per_page = Math.min(currentPage * limit, totalPages);

	const onNext = (): void => {
		onPageChange(currentPage + 1);
	};

	const onPrev = (): void => {
		onPageChange(currentPage - 1);
	};

	if (isLoading) {
		return (
			<div className="mt-5 flex w-full flex-row items-center justify-between">
				<Skeleton className="h-4 w-44 rounded-lg" />
				<Skeleton className="h-8 w-52 rounded-lg" />
			</div>
		);
	}

	return (
		<div className="mt-5 flex w-full flex-row items-center justify-between rounded-lg">
			{/* Pagination Information */}
			<div className="flex flex-row items-center justify-between">
				<p className="text-sm text-gray">
					Showing <span className="font-bold text-white">{start_per_page}</span> to{" "}
					<span className="font-bold text-white">{end_per_page}</span> of{" "}
					<span className="font-bold text-white">{totalPages}</span>
				</p>
			</div>

			{/* Pagination Navigation Button */}
			<div className="flex flex-row rounded-lg bg-black-900">
				{/* Previous Button */}
				<button
					onClick={onPrev}
					disabled={currentPage === 1}
					className="rounded-l-lg border-y border-l border-black-700 p-1 disabled:opacity-50"
				>
					<ChevronIcon type="left" className="h-4 w-4" />
				</button>

				{/* Page Numbers */}
				{paginationRange.map((pageNum, index) => {
					if (pageNum === DOTS) {
						return (
							<p
								key={index}
								className="border-y border-l border-black-700 px-2.5 py-1 text-sm"
							>
								...
							</p>
						);
					}

					return (
						<button
							key={index}
							onClick={() => onPageChange(pageNum)}
							disabled={currentPage === pageNum}
							className="border-y border-l border-black-700 px-2.5 py-1 text-sm transition-all duration-300 hover:bg-green disabled:bg-green"
						>
							{pageNum}
						</button>
					);
				})}

				{/* Next Button */}
				<button
					onClick={onNext}
					disabled={currentPage === totalPages}
					className="rounded-r-lg border border-black-700 p-1 disabled:opacity-50"
				>
					<ChevronIcon type="right" className="h-4 w-4" />
				</button>
			</div>
		</div>
	);
};

export default Pagination;
