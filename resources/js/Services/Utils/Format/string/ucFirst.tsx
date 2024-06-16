export const ucFirst = (value: string | undefined): string | undefined => {
    if (!value) return undefined;

    return value.charAt(0).toUpperCase() + value.slice(1);
};
