import { dateYear } from "@/Services/Utils/Format/dates/dateYear";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { minutes } from "@/Services/Utils/Format/tmdb/minutes";

export const DetailEpisodeModel = (data: Array<IEpisodes>): Array<IEpisodesResult> => {
	const Data = data.map((ep): IEpisodesResult => {
		return {
			air_date: dateYear(ep.air_date),
			episode_number: ep.episode_number,
			id: ep.id,
			name: ep.name,
			overview: ep.overview,
			runtime: minutes(ep.runtime),
			season_number: ep.season_number,
			show_id: ep.show_id,
			backdrop: HImg(ep.still_path),
			vote_average: ep.vote_average,
			vote_count: ep.vote_count,
		};
	});

	return Data;
};
