interface IReleaseDateOpts {
    name: string;
    value: number;
}

export const releaseDateOptions: Array<IReleaseDateOpts> = [
    { name: "All Region", value: 0 },
    { name: "Specify Region", value: 1 },
];
