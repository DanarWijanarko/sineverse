interface ISeriesType {
    name: string;
    value: number;
}

export const seriesTypeOptions: Array<ISeriesType> = [
    { name: "Documentary", value: 0 },
    { name: "News", value: 1 },
    { name: "Miniseries", value: 2 },
    { name: "Reality", value: 3 },
    { name: "Scripted", value: 4 },
    { name: "Talk Show", value: 5 },
];
