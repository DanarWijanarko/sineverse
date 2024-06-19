import { HImg } from "@/Services/Utils/Format/images/HImg";

export const WatchProvidersModel = (
    data: Array<IWatchProviders>,
    media_type: "movie" | "tv"
): Array<IWatchProvidersResults> => {
    return data.map((item): IWatchProvidersResults => {
        return {
            media_type: media_type,
            id: item.provider_id,
            logo: HImg(item.logo_path),
            name: item.provider_name,
            priority: item.display_priority,
        };
    });
};
