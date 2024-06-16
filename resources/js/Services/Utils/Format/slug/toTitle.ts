export const toTitle = (
    value: string,
    separator: string = "-"
): string | undefined => {
    if (!value) return undefined;

    return value
        .split(separator)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
};
