import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { DetailCinemaModel } from "@/Services/Models/Details/DetailCinemaModel";
import { DetailCreditModel } from "@/Services/Models/Details/DetailCreditModel";
import { DetailEpisodeModel } from "@/Services/Models/Details/DetailEpisodeModel";
import { DetailMediaModel } from "@/Services/Models/Details/DetailMediaModel";
import { CinemaModel } from "@/Services/Models/Cinemas/CinemaModel";
import { DetailCollectionModel } from "@/Services/Models/Details/DetailCollectionModel";
import { DetailPersonModel } from "@/Services/Models/Details/DetailPersonModel";
import { NetworksModel } from "@/Services/Models/Configs/NetworksModel";
import { DetailNetworkModel } from "@/Services/Models/Details/DetailNetworkModel";
import { DetailCompanyModel } from "@/Services/Models/Details/DetailCompanyModel";

export const useDetailCinema = (
	cinema_id: number,
	queryKey: Array<string>,
	media_type: "tv" | "movie",
	enabled: boolean = true,
): UseQueryResult<ISeriesDetailResult & IMovieDetailResult> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get<ISeriesDetail | IMovieDetail>(
					`/${media_type}/${cinema_id}`,
				);

				return DetailCinemaModel(response.data, media_type);
			} catch (e) {
				throw console.log(e);
			}
		},
	});
};

export const useDetailCredits = (
	cinema_id: number,
	queryKey: Array<string | number>,
	media_type: "tv" | "movie",
	enabled: boolean = true,
): UseQueryResult<Array<ICastResult>> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/${media_type}/${cinema_id}/credits`);

				return DetailCreditModel(response.data.cast);
			} catch (e) {
				throw console.log(e);
			}
		},
	});
};

export const useDetailSeasons = (
	cinema_id: number,
	season_number: number,
	queryKey: Array<string | number>,
	enabled: boolean,
): UseQueryResult<Array<IEpisodesResult>> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/tv/${cinema_id}/season/${season_number}`);

				return DetailEpisodeModel(response.data.episodes);
			} catch (e) {
				throw console.log(e);
			}
		},
	});
};

export const useDetailMedia = (
	cinema_id: number,
	queryKey: Array<string | number>,
	media_type: "tv" | "movie",
	enabled: boolean = true,
): UseQueryResult<IMediaResult> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const responseImg = await tmdbInstance.get(`/${media_type}/${cinema_id}/images`);
				const responseVid = await tmdbInstance.get(`/${media_type}/${cinema_id}/videos`);

				// return responseImg.data;
				return DetailMediaModel(responseImg.data, responseVid.data.results);
			} catch (e) {
				throw console.log(e);
			}
		},
	});
};

export const useDetailRecommendations = (
	cinema_id: number,
	queryKey: Array<string | number>,
	media_type: "tv" | "movie",
	enabled: boolean = true,
): UseQueryResult<ICinemasResults> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(
					`/${media_type}/${cinema_id}/recommendations`,
				);

				return CinemaModel(response.data, 20, media_type);
			} catch (e) {
				throw console.error(e);
			}
		},
	});
};

export const useDetailCollection = (
	collection_id: number | undefined,
	queryKey: Array<string | number | undefined>,
	enabled: boolean = true,
): UseQueryResult<ICollectionDetailResults> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/collection/${collection_id}`);

				return DetailCollectionModel(response.data);
			} catch (e) {
				throw console.error(e);
			}
		},
	});
};

export const useDetailPerson = (
	person_id: number,
	queryKey: Array<string | number>,
	enabled: boolean = true,
) => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/person/${person_id}`, {
					params: {
						append_to_response: "external_ids,images,movie_credits,tv_credits",
					},
				});

				return DetailPersonModel(response.data);
			} catch (e) {
				throw console.error(e);
			}
		},
	});
};

export const useDetailNetwork = (
	network_id: number,
	queryKey: Array<string | number>,
	enabled: boolean = true,
): UseQueryResult<INetworkResults> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/network/${network_id}`);

				return DetailNetworkModel(response.data);
			} catch (e) {
				throw console.error(e);
			}
		},
	});
};

export const useDetailCompany = (
	company_id: number,
	queryKey: Array<string | number>,
	enabled: boolean = true,
): UseQueryResult<ICompanyResults> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const response = await tmdbInstance.get(`/company/${company_id}`);

				return DetailCompanyModel(response.data);
			} catch (e) {
				throw console.log(e);
			}
		},
	});
};
