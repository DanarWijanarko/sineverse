export const mediaType = (
    media_type: string | "movie" | "tv"
): string | undefined => {
    switch (media_type) {
        case "movie":
            return "movies";
        case "tv":
            return "series";
        default:
            return undefined;
    }
};
