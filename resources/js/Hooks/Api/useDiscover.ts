import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { CinemaModel } from "@/Services/Models/Cinemas/CinemaModel";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useDiscoverMovies = (
    params: IMoviesParams,
    queryKey: Array<string | number>,
    limit: number = 20,
    enabled: boolean = true
): UseQueryResult<ICinemasResults> => {
    return useQuery({
        queryKey,
        enabled,
        queryFn: async () => {
            try {
                const response = await tmdbInstance.get(`/discover/movie`, {
                    params: {
                        include_adult: true,
                        page: params.page,
                        sort_by: params.sort_by,
                        region: params.region,
                        "primary_release_date.gte":
                            params.primary_release_date_from,
                        "primary_release_date.lte":
                            params.primary_release_date_to,
                        "release_date.gte": params.release_date_from,
                        "release_date.lte": params.release_date_to,
                        "vote_average.gte": params.vote_average_from,
                        "vote_average.lte": params.vote_average_to,
                        watch_region: params.watch_region,
                        with_companies: params.with_companies,
                        with_genres: params.with_genres,
                        with_original_language: params.with_original_language,
                        with_release_type: params.with_release_type,
                        "with_runtime.gte": params.with_runtime_from,
                        "with_runtime.lte": params.with_runtime_to,
                        with_watch_providers: params.with_watch_providers,
                    },
                });

                return CinemaModel(response.data, limit, "movie");
            } catch (e) {
                throw console.error(e);
            }
        },
    });
};

export const useDiscoverSeries = (
    params: ISeriesParams,
    queryKey: Array<string | number>,
    limit: number = 20,
    enabled: boolean = true
): UseQueryResult<ICinemasResults> => {
    return useQuery({
        queryKey,
        enabled,
        queryFn: async () => {
            try {
                const response = await tmdbInstance.get(`/discover/tv`, {
                    params: {
                        include_adult: false,
                        include_null_first_air_dates: false,
                        page: params.page,
                        sort_by: params.sort_by,
                        timezone: params.timezone,
                        "air_date.gte": params.air_date_from,
                        "air_date.lte": params.air_date_to,
                        "first_air_date.gte": params.first_air_date_from,
                        "first_air_date.lte": params.first_air_date_to,
                        watch_region: params.watch_region,
                        with_companies: params.with_companies,
                        with_genres: params.with_genres,
                        with_networks: params.with_networks,
                        with_type: params.with_type,
                        with_original_language: params.with_original_language,
                        "with_runtime.gte": params.with_runtime_from,
                        "with_runtime.lte": params.with_runtime_to,
                        with_watch_providers: params.with_watch_providers,
                    },
                });

                return CinemaModel(response.data, limit, "tv");
            } catch (e) {
                throw console.error(e);
            }
        },
    });
};
