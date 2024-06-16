// ! Input: ISO_639_1 => 'id'; Output: String => 'Indonesian'
export const language = (iso_639_1: string): string | undefined => {
    if (!iso_639_1) return undefined;

    const language = new Intl.DisplayNames(["en"], { type: "language" });

    return language.of(iso_639_1);
};
