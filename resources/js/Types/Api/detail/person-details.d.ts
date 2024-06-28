type TExternalIDS = {
	freebase_mid: string | undefined;
	freebase_id: string | undefined;
	imdb_id: string | undefined;
	tvrage_id: string | undefined;
	wikidata_id: string | undefined;
	facebook_id: string | undefined;
	instagram_id: string | undefined;
	tiktok_id: string | undefined;
	twitter_id: string | undefined;
	youtube_id: string | undefined;
};

interface IPersons {
	gender: number;
	id: number;
	known_for_department: string | undefined;
	name: string | undefined;
	profile_path: string;
}

interface IPersonsResult {
	gender: number;
	id: number;
	known_for_department: string | undefined;
	name: string | undefined;
	profile: string;
}

interface IPerson {
	also_known_as: Array<string>;
	biography: string | undefined;
	birthday: Date | undefined;
	deathday: Date | undefined;
	external_ids: TExternalIDS;
	gender: number;
	homepage: string | undefined;
	id: number;
	images: { profiles: Array<{ file_path: string }> };
	imdb_id: string | undefined;
	known_for_department: string | undefined;
	name: string | undefined;
	place_of_birth: string | undefined;
	popularity: number | undefined;
	profile_path: string;
	tv_credits: { cast: Array<ISeries> };
	movie_credits: { cast: Array<IMovies> };
}

interface IPersonResult {
	also_known_as: Array<string>;
	biography: string | undefined;
	birthday: string | undefined;
	deathday: string | undefined;
	external_ids: Array<{ id: string | undefined; media: string }> | undefined;
	gender: string | undefined;
	homepage: string | undefined;
	id: number;
	images: Array<string>;
	imdb_id: string | undefined;
	known_for_department: string | undefined;
	name: string | undefined;
	place_of_birth: string | undefined;
	popularity: number | undefined;
	profile: string;
	tv_credits: Array<ICinemas>;
	movie_credits: Array<ICinemas>;
}
