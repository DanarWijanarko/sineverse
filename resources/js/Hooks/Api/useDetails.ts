import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { DetailCinemaModel } from "@/Services/Models/Cinemas/Details/DetailCinemaModel";
import { DetailCreditModel } from "@/Services/Models/Cinemas/Details/DetailCreditModel";
import { DetailEpisodeModel } from "@/Services/Models/Cinemas/Details/DetailEpisodeModel";
import { DetailMediaModel } from "@/Services/Models/Cinemas/Details/DetailMediaModel";

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
				const response = await tmdbInstance.get(`/${media_type}/${cinema_id}`);

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
