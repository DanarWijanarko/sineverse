interface IMoviesType {
    name: string;
    value: number;
}

export const moviesTypeOptions: Array<IMoviesType> = [
    { name: "Premiere", value: 1 },
    { name: "Theatrical (limited)", value: 2 },
    { name: "Theatrical", value: 3 },
    { name: "Digital", value: 4 },
    { name: "Physical", value: 5 },
    { name: "Talk TV", value: 6 },
];
