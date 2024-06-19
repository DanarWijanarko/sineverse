import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { WatchProvidersModel } from "@/Services/Models/Configs/WatchProvidersModel";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useWatchProviders = (
    params: { watch_region: string },
    queryKey: Array<string>,
    media_type: "movie" | "tv",
    enabled: boolean = true
): UseQueryResult<Array<IWatchProvidersResults>> => {
    return useQuery({
        queryKey,
        enabled,
        queryFn: async () => {
            try {
                const response = await tmdbInstance.get(
                    `/watch/providers/${media_type}`,
                    {
                        params: {
                            watch_region: params.watch_region,
                        },
                    }
                );

                return WatchProvidersModel(response.data.results, media_type);
            } catch (e) {
                throw console.error(e);
            }
        },
    });
};