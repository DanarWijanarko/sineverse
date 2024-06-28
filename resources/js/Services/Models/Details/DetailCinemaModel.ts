import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";
import { decimal } from "@/Services/Utils/Format/numbers/decimal";
import { language } from "@/Services/Utils/Format/regions/language";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { mediaType } from "@/Services/Utils/Format/tmdb/mediaType";
import { minutes } from "@/Services/Utils/Format/tmdb/minutes";

export const DetailCinemaModel = (
	dataProps: ISeriesDetail | IMovieDetail,
	media_type: "tv" | "movie",
): ISeriesDetailResult | IMovieDetailResult | undefined => {
	if (media_type === "tv") {
		const data = dataProps as ISeriesDetail;

		return {
			media_type: mediaType(media_type),
			backdrop: HImg(data.backdrop_path),
			runtime: data.episode_run_time,
			first_air_date: dateLong(data.first_air_date),
			genres: data.genres,
			id: data.id,
			last_air_date: dateLong(data.last_air_date),
			title: data.name,
			networks: data.networks.map((item) => {
				return {
					id: item.id,
					name: item.name,
					slug: toSlug(item.name),
				};
			}),
			number_of_episodes: data.number_of_episodes,
			number_of_seasons: data.number_of_seasons,
			original_language: language(data.original_language),
			original_title: data.original_name,
			overview: data.overview,
			popularity: data.popularity,
			poster: VImg(data.poster_path),
			production_companies: data.production_companies.map((item) => {
				return {
					id: item.id,
					name: item.name,
					slug: toSlug(item.name),
				};
			}),
			vote_average: decimal(data.vote_average),
			vote_count: data.vote_count,
		};
	} else if (media_type === "movie") {
		const data = dataProps as IMovieDetail;

		return {
			media_type: mediaType(media_type),
			backdrop: HImg(data.backdrop_path),
			belongs_to_collection: {
				id: data.belongs_to_collection.id,
				name: data.belongs_to_collection.name,
				slug: toSlug(data.belongs_to_collection.name),
			},
			budget: data.budget,
			genres: data.genres,
			id: data.id,
			original_language: language(data.original_language),
			original_title: data.original_title,
			overview: data.overview,
			popularity: data.popularity,
			poster: VImg(data.poster_path),
			production_companies: data.production_companies.map((item) => {
				return {
					id: item.id,
					name: item.name,
					slug: toSlug(item.name),
				};
			}),
			release_date: dateLong(data.release_date),
			revenue: data.revenue,
			runtime: minutes(data.runtime),
			title: data.title,
			vote_average: decimal(data.vote_average),
			vote_count: data.vote_count,
		};
	} else {
		return undefined;
	}
};
