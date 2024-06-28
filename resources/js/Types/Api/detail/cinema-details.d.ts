interface ICinemaDetail {
	backdrop_path: string;
	genres: Array<IGenres>;
	id: number;
	original_language: string;
	overview: string;
	popularity: number;
	poster_path: string;
	production_companies: Array<{ id: number; name: string }>;
	vote_average: number;
	vote_count: number | undefined;
}

interface ISeriesDetail extends ICinemaDetail {
	episode_run_time: Array<number> | undefined;
	first_air_date: Date | undefined;
	last_air_date: Date | undefined;
	name: string;
	networks: Array<{ id: number; name: string }>;
	number_of_episodes: number;
	number_of_seasons: number;
	original_name: string;
}

interface IMovieDetail extends ICinemaDetail {
	belongs_to_collection: { id: number; name: string };
	budget: number | undefined;
	original_title: string;
	release_date: Date | undefined;
	revenue: number | undefined;
	runtime: number | undefined;
	title: string;
}

interface ISeriesDetailResult {
	media_type: string | undefined;
	backdrop: string;
	first_air_date: string | undefined;
	genres: Array<IGenres>;
	id: number;
	last_air_date: string | undefined;
	networks: Array<{ id: number; name: string; slug: string }>;
	number_of_episodes: number;
	number_of_seasons: number;
	original_language: string | undefined;
	original_title: string;
	overview: string;
	popularity: number;
	poster: string;
	production_companies: Array<{ id: number; name: string; slug: string }>;
	runtime: Array<number> | undefined;
	title: string;
	vote_average: string | undefined;
	vote_count: number | undefined;
}

interface IMovieDetailResult {
	media_type: string | undefined;
	backdrop: string;
	belongs_to_collection: { id: number; name: string; slug: string } | undefined;
	budget: number | undefined;
	genres: Array<IGenres>;
	id: number;
	original_language: string | undefined;
	original_title: string;
	overview: string;
	popularity: number;
	poster: string;
	production_companies: Array<{ id: number; name: string; slug: string }>;
	release_date: string | undefined;
	revenue: number | undefined;
	runtime: string | undefined;
	title: string;
	vote_average: string | undefined;
	vote_count: number | undefined;
}
