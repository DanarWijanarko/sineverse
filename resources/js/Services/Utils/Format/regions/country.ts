// ! Input: ISO_3166_1 => 'ID'; Output: String => 'Indonesia'
export const country = (iso_3166_1: string): string | undefined => {
	if (!iso_3166_1) return undefined;

	const country = new Intl.DisplayNames(["en"], { type: "region" });

	return country.of(iso_3166_1);
};
