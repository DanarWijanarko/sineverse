import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { CinemaModel } from "@/Services/Models/Cinemas/CinemaModel";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useTrending = (
    time: "day" | "week",
    queryKey: Array<string>,
    limit: number = 20,
    enabled: boolean = true,
): UseQueryResult<Array<ICinemas>> => {
    return useQuery({
        queryKey,
        enabled,
        queryFn: async () => {
            try {
                const response = await tmdbInstance.get(
                    `/trending/all/${time}`
                );

                return CinemaModel(response.data, limit).results;
            } catch (e) {
                throw console.error(e);
            }
        },
    });
};
