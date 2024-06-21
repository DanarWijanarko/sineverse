import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { CinemaModel } from "@/Services/Models/Cinemas/CinemaModel";
import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { dateInterval } from "@/Services/Utils/Generate/dateInterval";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

interface IComingSoonParams {
    page: number;
    sort_by: string;
    region: string | undefined;
    timezone: string | undefined;
}

interface IComingSoonResults {
    date: {
        month: string;
        startDate: Date;
        endDate: Date;
    };
    data: Array<ICinemas>;
}

export const useComingSoon = (
    params: IComingSoonParams,
    queryKey: Array<string>,
    limit: number = 20,
    enabled: boolean = true
): UseQueryResult<Array<IComingSoonResults>> => {
    return useQuery({
        queryKey,
        enabled,
        queryFn: async () => {
            try {
                const moviesResponse = await tmdbInstance.get(
                    `/discover/movie`,
                    {
                        params: {
                            include_adult: false,
                            page: params.page,
                            sort_by: params.sort_by,
                            region: params.region,
                            "release_date.gte": dateInterval().today,
                            "release_date.lte": dateInterval(3).lastMonth,
                            with_release_type: "2|3",
                        },
                    }
                );
                const seriesResponse = await tmdbInstance.get(`/discover/tv`, {
                    params: {
                        include_adult: false,
                        include_null_first_air_dates: false,
                        page: params.page,
                        sort_by: params.sort_by,
                        timezone: params.timezone,
                        "first_air_date.gte": dateInterval().today,
                        "first_air_date.lte": dateInterval(3).lastMonth,
                        with_type: 4,
                    },
                });

                const moviesData = CinemaModel(
                    moviesResponse.data,
                    limit,
                    "movie"
                ).results;
                const seriesData = CinemaModel(
                    seriesResponse.data,
                    limit,
                    "tv"
                ).results;

                const cinemasData = moviesData.concat(
                    seriesData.filter(
                        (series) =>
                            !moviesData.some((movie) => movie.id === series.id)
                    )
                );

                const results = dateInterval().listMonth.map((interval) => {
                    const data = cinemasData
                        .filter((cinema) => {
                            const release_date = new Date(cinema.release_date);

                            return (
                                release_date >= interval.startDate &&
                                release_date <= interval.endDate
                            );
                        })
                        .slice(0, 12)
                        .sort(
                            (a, b) =>
                                new Date(a.release_date).getDate() -
                                new Date(b.release_date).getDate()
                        );
                    return {
                        date: {
                            month: interval.month,
                            startDate: dateLong(interval.startDate),
                            endDate: dateLong(interval.endDate),
                        },
                        data: data,
                    };
                });

                return results;
            } catch (e) {
                throw console.log(e);
            }
        },
    });
};
