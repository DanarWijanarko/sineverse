import { tmdbInstance } from "@/Services/Axios/TmdbInstance";
import { SearchModel } from "@/Services/Models/Configs/SearchModel";
import { UseQueryResult, useQuery } from "@tanstack/react-query";

export const useSearch = (
	query: string,
	queryKey: Array<string | number>,
	enabled: boolean = true,
): UseQueryResult<
	Array<
		| {
				media_type: string;
				results: Array<ICinemas>;
		  }
		| {
				media_type: string;
				results: Array<IPersonsResult>;
		  }
		| {
				media_type: string;
				results: Array<IKeywordsResult>;
		  }
		| {
				media_type: string;
				results: Array<ICompaniesResult>;
		  }
		| {
				media_type: string;
				results: Array<ICollectionsResults>;
		  }
	>
> => {
	return useQuery({
		queryKey,
		enabled,
		queryFn: async () => {
			try {
				const requests = [
					(await tmdbInstance.get("/search/tv", { params: { query } })).data,
					(await tmdbInstance.get("/search/movie", { params: { query } })).data,
					(await tmdbInstance.get("/search/person", { params: { query } })).data,
					(await tmdbInstance.get("/search/keyword", { params: { query } })).data,
					(await tmdbInstance.get("/search/company", { params: { query } })).data,
					(await tmdbInstance.get("/search/collection", { params: { query } })).data,
				];

				const responses = await Promise.all(requests);

				return SearchModel(responses);
			} catch (e) {
				throw console.error(e);
			}
		},
	});
};
