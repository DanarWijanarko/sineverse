interface ICollections {
	backdrop_path: string;
	id: number;
	name: string;
	original_language: string;
	original_name: string;
	overview: string;
	poster_path: string;
}

interface ICollectionsResults {
	backdrop: string;
	id: number;
	name: string;
	original_language: string | undefined;
	original_name: string;
	overview: string;
	poster: string;
}

interface ICollectionDetail {
	backdrop_path: string;
	id: number;
	name: string;
	overview: string;
	parts: Array<IMovies>;
	poster_path: string;
}

interface ICollectionDetailResults {
	backdrop: string;
	id: number;
	name: string;
	overview: string;
	results: Array<ICinemas>;
	poster: string;
}
