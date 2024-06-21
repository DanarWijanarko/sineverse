import { useMemo } from "react";

export const DOTS = 0;

const range = (start: number, end: number): Array<number> => {
	let length: number = end - start + 1;
	return Array.from({ length }, (_, index) => index + start);
};

export const usePagination = ({
	currentPage,
	siblingCount,
	totalPages,
}: IUsePagination): Array<number> | undefined => {
	return useMemo(() => {
		const totalPagesNumbers: number = siblingCount + 5;

		if (totalPagesNumbers > totalPages) return range(1, totalPages);

		const leftSiblingIndex: number = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex: number = Math.min(currentPage + siblingCount, totalPages);

		const shouldShowLeftDots: boolean = leftSiblingIndex > 2;
		const shouldShowRightDots: boolean = rightSiblingIndex < totalPages - 2;

		const firstPageIndex: number = 1;
		const lastPageIndex: number = totalPages;

		if (!shouldShowLeftDots && shouldShowRightDots) {
			let leftItemCount: number = 3 + 2 * siblingCount;
			let leftRange: Array<number> = range(1, leftItemCount);

			return [...leftRange, DOTS, totalPages];
		}

		if (shouldShowLeftDots && shouldShowRightDots) {
			let middleRange: Array<number> = range(leftSiblingIndex, rightSiblingIndex);

			return [firstPageIndex, DOTS, ...middleRange, lastPageIndex];
		}

		if (shouldShowLeftDots && !shouldShowRightDots) {
			let rightItemCount: number = 3 + 2 * siblingCount;
			let rightRange: Array<number> = range(totalPages - rightItemCount + 1, totalPages);

			return [firstPageIndex, DOTS, ...rightRange];
		}
	}, [currentPage, siblingCount, totalPages]);
};
