interface ISortBy {
    name: string;
    types: Array<{
        type_name: string;
        value: string;
        index: number | undefined;
    }>;
}

export const sortByMoviesOptions: Array<ISortBy> = [
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
                value: "primary_release_date.desc",
                index: 2,
            },
            {
                type_name: "Oldest",
                value: "primary_release_date.asc",
                index: 2,
            },
        ],
    },
    {
        name: "Name",
        types: [
            {
                type_name: "(A - Z)",
                value: "title.asc",
                index: 3,
            },
            {
                type_name: "(Z - A)",
                value: "title.desc",
                index: 3,
            },
        ],
    },
];
