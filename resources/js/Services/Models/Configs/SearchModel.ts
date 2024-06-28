import { language } from "@/Services/Utils/Format/regions/language";
import { genresOptions } from "@/Services/Constants/genresOptions";
import { decimal } from "@/Services/Utils/Format/numbers/decimal";
import { country } from "@/Services/Utils/Format/regions/country";
import { toSlug } from "@/Services/Utils/Format/slug/toSlug";
import { HImg } from "@/Services/Utils/Format/images/HImg";
import { VImg } from "@/Services/Utils/Format/images/VImg";

export const SearchModel = (data: Array<{ results: Array<any> }>) => {
	const results = {
		series: data[0]?.results,
		movies: data[1]?.results,
		person: data[2]?.results,
		keyword: data[3]?.results,
		company: data[4]?.results,
		collection: data[5]?.results,
	};

	const series: { media_type: string; results: Array<ICinemas> } = {
		media_type: "Series",
		results: results.series.map((item: ISeries): ICinemas => {
			return {
				slug: toSlug(item.name),
				media_type: "series",
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
		}),
	};

	const movies: { media_type: string; results: Array<ICinemas> } = {
		media_type: "Movies",
		results: results.movies.map((item: IMovies): ICinemas => {
			return {
				slug: toSlug(item.title),
				media_type: "movies",
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
		}),
	};

	const person: { media_type: string; results: Array<IPersonsResult> } = {
		media_type: "Persons",
		results: results.person.map((item: IPersons): IPersonsResult => {
			return {
				gender: item.gender,
				id: item.id,
				known_for_department: item.known_for_department,
				name: item.name,
				profile: HImg(item.profile_path),
			};
		}),
	};

	const keyword: { media_type: string; results: Array<IKeywordsResult> } = {
		media_type: "Keywords",
		results: results.keyword.map((item: IKeywords): IKeywordsResult => {
			return {
				id: item.id,
				name: item.name,
				slug: toSlug(item.name),
			};
		}),
	};

	const company: { media_type: string; results: Array<ICompaniesResult> } = {
		media_type: "Companies",
		results: results.company.map((item: ICompanies): ICompaniesResult => {
			return {
				id: item.id,
				logo: HImg(item.logo_path),
				name: item.name,
				origin_country: country(item.origin_country),
			};
		}),
	};

	const collection: { media_type: string; results: Array<ICollectionsResults> } = {
		media_type: "Collections",
		results: results.collection.map((item: ICollections): ICollectionsResults => {
			return {
				backdrop: HImg(item.backdrop_path),
				id: item.id,
				name: item.name,
				original_language: language(item.original_language),
				original_name: item.original_name,
				overview: item.overview,
				poster: VImg(item.poster_path),
			};
		}),
	};

	const resultArrays = [series, movies, person, keyword, company, collection];

	const sortedArrays = resultArrays.sort((a, b) => b.results.length - a.results.length);

	return sortedArrays;
};
