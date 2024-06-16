// ! Input: String Date => '2024-01-30'; Output: String => '30'
export const dateDay = (date: Date): string | undefined => {
    if (!date) return undefined;

    const getDay = new Intl.DateTimeFormat(["en"], { day: "2-digit" });

    return getDay.format(new Date(date));
};
