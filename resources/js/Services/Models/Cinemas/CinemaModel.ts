import { language } from "@/Services/Utils/Format/regions/language";
import { genresOptions } from "@/Services/Constants/genresOptions";
import { mediaType } from "@/Services/Utils/Format/tmdb/mediaType";
import { dateLong } from "@/Services/Utils/Format/dates/dateLong";
import { decimal } from "@/Services/Utils/Format/numbers/decimal";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";

export const CinemaModel = (
	data: IAPIResponse,
	limit: number = 20,
	media_type?: "movie" | "tv",
): ICinemasResults => {
	if (limit > 20) throw console.error("Error!!! Maximum Limit is 20!");

	const total_results = data.total_results;
	const total_pages = data.total_pages;

	const current_page = data.page;
	const next_page = current_page + 1 <= total_pages ? current_page + 1 : null;
	const prev_page = current_page - 1 >= 1 ? current_page - 1 : null;
	const last_page = total_pages;

	const start_per_page = (current_page - 1) * limit + 1;
	const end_per_page = Math.min(current_page * limit, total_results);

	const startIndex = (current_page - 1) * limit;
	const endIndex = startIndex + limit;
	const results = limit == 20 ? data.results : data.results.slice(startIndex, endIndex);

	const meta_data: IMetadata = {
		total_pages,
		total_results,
		current_page,
		limit,
	};

	const Data = results.map((item): ICinemas => {
		if (item.media_type == "movie" || media_type == "movie") {
			return {
				slug: toSlug(item.title),
				media_type: mediaType(item.media_type ? item.media_type : media_type),
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
		}

		// ? Series
		return {
			slug: toSlug(item.name),
			media_type: mediaType(item.media_type ? item.media_type : media_type),
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

	return { metadata: meta_data, results: Data };
};
