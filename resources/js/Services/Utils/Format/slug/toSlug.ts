export const toSlug = (value: string, separator: string = "-"): string => {
    // if (!value) return undefined;

    return value
        .toString()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .toLowerCase()
        .trim()
        .replace(/\s+/g, separator)
        .replace(/[^\w-]+/g, "")
        .replace(/--+/g, separator);
};
