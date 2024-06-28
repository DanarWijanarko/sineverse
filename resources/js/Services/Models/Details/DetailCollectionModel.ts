import { genresOptions } from "@/Services/Constants/genresOptions";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";
import { decimal } from "@/Services/Utils/Format/numbers/decimal";
import { language } from "@/Services/Utils/Format/regions/language";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { mediaType } from "@/Services/Utils/Format/tmdb/mediaType";

export const DetailCollectionModel = (data: ICollectionDetail): ICollectionDetailResults => {
	const movies = data.parts.map((item): ICinemas => {
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

	return {
		backdrop: HImg(data.backdrop_path),
		id: data.id,
		name: data.name,
		overview: data.overview,
		poster: VImg(data.poster_path),
		results: movies,
	};
};
