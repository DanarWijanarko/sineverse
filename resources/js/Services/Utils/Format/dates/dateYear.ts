// ! Input: String Date => '2024-01-30'; Output: String => '2024'
export const dateYear = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;

    const getYear = new Intl.DateTimeFormat(["en"], { year: "numeric" });

    return getYear.format(new Date(date));
};
