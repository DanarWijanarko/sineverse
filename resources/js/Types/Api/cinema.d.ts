interface IAPIResponse {
    page: number;
    results: Array<IMovies & ISeries>;
    total_pages: number;
    total_results: number;
}

interface IMoviesParams {
    page: number;
    sort_by: string;
    region: string;
    primary_release_date_from?: Date | undefined;
    primary_release_date_to?: Date | undefined;
    release_date_from?: Date | undefined;
    release_date_to?: Date | undefined;
    vote_average_from?: number | undefined;
    vote_average_to?: number | undefined;
    watch_region?: string | undefined;
    with_companies?: string | undefined;
    with_genres?: string | undefined;
    with_original_language?: string | undefined;
    with_release_type?: string | undefined;
    with_runtime_from?: number | undefined;
    with_runtime_to?: number | undefined;
    with_watch_providers?: string | undefined;
}

interface ISeriesParams {
    page: number;
    sort_by: string;
    timezone: string;
    air_date_from?: Date | undefined;
    air_date_to?: Date | undefined;
    first_air_date_from?: Date | undefined;
    first_air_date_to?: Date | undefined;
    vote_average_from?: string | undefined;
    vote_average_to?: string | undefined;
    watch_region?: string | undefined;
    with_companies?: string | undefined;
    with_genres?: string | undefined;
    with_networks?: string | undefined;
    with_original_language?: string | undefined;
    with_type?: number | undefined;
    with_runtime_from?: string | undefined;
    with_runtime_to?: string | undefined;
    with_watch_providers?: string | undefined;
}

interface IMovies {
    media_type: string;
    backdrop_path: string;
    genre_ids: Array<number>;
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: Date;
    title: string;
    vote_average: number;
    vote_count: number;
}

interface ISeries {
    media_type: string;
    backdrop_path: string;
    first_air_date: Date;
    genre_ids: Array<number>;
    id: number;
    name: string;
    origin_country: Array<string>;
    original_language: string;
    original_name: string;
    overview: string;
    popularity: number;
    poster_path: string;
    vote_average: number;
    vote_count: number;
}

interface ICinemas {
    slug: string;
    media_type: string | undefined;
    backdrop: string | undefined;
    genres: Array<string | undefined>;
    id: number;
    original_language: string | undefined;
    original_title: string | undefined;
    overview: string | undefined;
    poster: string | undefined;
    popularity: number | undefined;
    release_date: Date;
    title: string | undefined;
    vote_average: string | undefined;
    vote_count: number | undefined;
}

interface IMetadata {
    total_pages: number;
    total_results: number;
    current_page: number;
    limit: number;
}

interface ICinemasResults {
    metadata: IMetadata;
    results: Array<ICinemas>;
}
