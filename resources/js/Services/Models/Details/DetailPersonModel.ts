import { baseImgUrl } from "@/Services/Axios/TmdbInstance";
import { genresOptions } from "@/Services/Constants/genresOptions";
import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";
import { decimal } from "@/Services/Utils/Format/numbers/decimal";
import { language } from "@/Services/Utils/Format/regions/language";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { gender } from "@/Services/Utils/Format/tmdb/gender";
import { mediaType } from "@/Services/Utils/Format/tmdb/mediaType";

const externalIdsFormat = (external_ids: TExternalIDS) => {
	return Object.entries({
		imdb_id: external_ids.imdb_id,
		facebook_id: external_ids.facebook_id,
		instagram_id: external_ids.instagram_id,
		tiktok_id: external_ids.tiktok_id,
		twitter_id: external_ids.twitter_id,
		youtube_id: external_ids.youtube_id,
	})
		.filter(([key, value]) => value !== null)
		.map(([key, value]) => {
			const media = key.split("_")[0];
			return {
				id: value,
				media: media,
			};
		});
};

const tvCreditsFormat = (data: Array<ISeries>) => {
	return data.map((item) => {
		return {
			slug: toSlug(item.name),
			media_type: mediaType(item.media_type),
			backdrop: HImg(item.backdrop_path),
			genres: item.genre_ids.map(
				(id: number) => genresOptions.find((genre) => genre.id == id)?.name,
			),
			id: item.id,
			original_language: language(item.original_language),
			original_title: item.original_name,
			overview: item.overview,
			poster: VImg(item.poster_path),
			popularity: item.popularity,
			release_date: item.first_air_date,
			title: item.name,
			vote_average: decimal(item.vote_average),
			vote_count: item.vote_count,
		};
	});
};

const movieCreditsFormat = (data: Array<IMovies>) => {
	return data.map((item) => {
		return {
			slug: toSlug(item.title),
			media_type: mediaType(item.media_type),
			backdrop: HImg(item.backdrop_path),
			genres: item.genre_ids.map(
				(id: number) => genresOptions.find((genre) => genre.id == id)?.name,
			),
			id: item.id,
			original_language: language(item.original_language),
			original_title: item.original_title,
			overview: item.overview,
			poster: VImg(item.poster_path),
			popularity: item.popularity,
			release_date: item.release_date,
			title: item.title,
			vote_average: decimal(item.vote_average),
			vote_count: item.vote_count,
		};
	});
};

export const DetailPersonModel = (data: IPerson): IPersonResult => {
	return {
		also_known_as: data.also_known_as,
		biography: data.biography,
		birthday: dateLong(data.birthday),
		deathday: dateLong(data.deathday),
		external_ids: externalIdsFormat(data.external_ids),
		gender: gender(data.gender),
		homepage: data.homepage,
		id: data.id,
		images: data.images.profiles.map((img) => baseImgUrl + img.file_path),
		imdb_id: data.imdb_id,
		known_for_department: data.known_for_department,
		name: data.name,
		place_of_birth: data.place_of_birth,
		popularity: data.popularity,
		profile: VImg(data.profile_path),
		tv_credits: tvCreditsFormat(data.tv_credits.cast),
		movie_credits: movieCreditsFormat(data.movie_credits.cast),
	};
};
