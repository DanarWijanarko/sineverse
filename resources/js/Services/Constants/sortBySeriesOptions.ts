interface ISortBy {
	name: string;
	types: Array<{ type_name: string; value: string; index: number | undefined }>;
}

export const sortBySeriesOptions: Array<ISortBy> = [
	{
		name: "Popularity",
		types: [
			{
				type_name: "Descending",
				value: "popularity.desc",
				index: 0,
			},
			{
				type_name: "Ascending",
				value: "popularity.asc",
				index: 0,
			},
		],
	},
	{
		name: "Rating",
		types: [
			{
				type_name: "Descending",
				value: "vote_average.desc",
				index: 1,
			},
			{
				type_name: "Ascending",
				value: "vote_average.asc",
				index: 1,
			},
		],
	},
	{
		name: "First Air Date",
		types: [
			{
				type_name: "Newest",
				value: "first_air_date.desc",
				index: 2,
			},
			{
				type_name: "Oldest",
				value: "first_air_date.asc",
				index: 2,
			},
		],
	},
	{
		name: "Name",
		types: [
			{
				type_name: "(A - Z)",
				value: "name.asc",
				index: 3,
			},
			{
				type_name: "(Z - A)",
				value: "name.desc",
				index: 3,
			},
		],
	},
];
