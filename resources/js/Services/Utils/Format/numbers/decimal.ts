// ! Input: Number => '7.666666'; Output: String => '7.6'
export const decimal = (num: number | bigint): string | undefined => {
    if (!num) return undefined;

    const number = new Intl.NumberFormat(["en"], {
        style: "decimal",
        maximumSignificantDigits: 2,
    });

    return number.format(num);
};
