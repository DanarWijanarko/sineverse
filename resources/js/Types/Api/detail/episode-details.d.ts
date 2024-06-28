interface IEpisodes {
	air_date: Date | undefined;
	episode_number: number | undefined;
	id: number;
	name: string | undefined;
	overview: string | undefined;
	runtime: number | undefined;
	season_number: number | undefined;
	show_id: number | undefined;
	still_path: string;
	vote_average: number | undefined;
	vote_count: number | undefined;
}

interface IEpisodesResult {
	air_date: string | undefined;
	episode_number: number | undefined;
	id: number;
	name: string | undefined;
	overview: string | undefined;
	runtime: string | undefined;
	season_number: number | undefined;
	show_id: number | undefined;
	backdrop: string;
	vote_average: number | undefined;
	vote_count: number | undefined;
}
