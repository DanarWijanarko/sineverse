// ! Input: String Date => '2024-01-30'; Output: String => 'January 30, 2024'
export const dateLong = (date: Date | undefined): string | undefined => {
    if (!date) return undefined;

    const getDate = new Intl.DateTimeFormat(["en"], {
        dateStyle: "long",
    });

    return getDate.format(new Date(date));
};
