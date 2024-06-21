interface IUsePagination {
	totalPages: number;
	siblingCount: number;
	currentPage: number;
}

interface IPagination {
	isLoading: boolean;
	onPageChange: (page: number) => void;
	totalPages: any;
	siblingCount?: number;
	currentPage: number;
	limit: any;
}
