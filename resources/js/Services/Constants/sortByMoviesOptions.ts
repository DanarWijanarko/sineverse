interface ISortBy {
    name: string;
    types: Array<{ type_name: string; value: string }>;
}

export const sortByMoviesOptions: Array<ISortBy> = [
    {
        name: "Popularity",
        types: [
            {
                type_name: "Popularity Descending",
                value: "popularity.desc",
            },
            {
                type_name: "Popularity Ascending",
                value: "popularity.asc",
            },
        ],
    },
    {
        name: "Rating",
        types: [
            {
                type_name: "Rating Descending",
                value: "vote_average.desc",
            },
            {
                type_name: "Rating Ascending",
                value: "vote_average.asc",
            },
        ],
    },
    {
        name: "First Air Date",
        types: [
            {
                type_name: "First Air Date Newest",
                value: "primary_release_date.desc",
            },
            {
                type_name: "First Air Date Oldest",
                value: "primary_release_date.asc",
            },
        ],
    },
    {
        name: "Name",
        types: [
            {
                type_name: "Name (A - Z)",
                value: "title.asc",
            },
            {
                type_name: "Name (Z - A)",
                value: "title.desc",
            },
        ],
    },
];
