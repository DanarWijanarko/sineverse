interface IFilterMoviesParams {
	page: number;
	sort_by: { type_name: string; value: string; index: number | undefined };
	region: { english_name: string; iso_3166_1: string; native_name: string };
	release_date_options: string;
	release_date: { from: Date | undefined; to: Date | undefined };
	watch_region: { iso_3166_1: string; english_name: string; native_name: string };
	with_genres: Array<IGenres>;
	with_original_language: ILanguages | undefined;
	with_release_type: Array<number>;
	with_runtime: number | [number, number];
	with_watch_providers: Array<any>;
}

interface IFilterSeriesParams {
	page: number;
	sort_by: { type_name: string; value: string; index: number | undefined };
	first_air_date: { from: Date | undefined; to: Date | undefined };
	watch_region: { iso_3166_1: string; english_name: string; native_name: string };
	with_genres: Array<IGenres>;
	with_networks: Array<INetworkResults>;
	with_original_language: ILanguages | undefined;
	with_type: Array<number>;
	with_runtime: number | [number, number];
	with_watch_providers: Array<any>;
}
