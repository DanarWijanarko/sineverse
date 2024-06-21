interface IReleaseDateOpts {
    name: string;
    value: "all_region" | "specify_region";
}

export const releaseDateOptions: Array<IReleaseDateOpts> = [
    { name: "All Region", value: "all_region" },
    { name: "Specify Region", value: "specify_region" },
];

interface ISelectDateOpt {
    primary_from: Date | undefined;
    primary_to: Date | undefined;
    release_from: Date | undefined;
    release_to: Date | undefined;
}

export const selectReleaseDateOption = (
    option: string,
    data: { from: Date | undefined; to: Date | undefined }
): ISelectDateOpt => {
    if (option === "all_region") {
        return {
            primary_from: data.from,
            primary_to: data.to,
            release_from: undefined,
            release_to: undefined,
        };
    } else if (option === "specify_region") {
        return {
            primary_from: undefined,
            primary_to: undefined,
            release_from: data.from,
            release_to: data.to,
        };
    } else {
        return {
            primary_from: undefined,
            primary_to: undefined,
            release_from: undefined,
            release_to: undefined,
        };
    }
};
