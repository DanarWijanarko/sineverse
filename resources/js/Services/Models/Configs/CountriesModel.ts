export const CountriesModel = (data: Array<ICountries>) => {
    const Data = data.map((item: ICountries) => {
        return {
            iso_3166_1: item.iso_3166_1,
            english_name: item.english_name,
            native_name: item.native_name,
        };
    });

    return Data;
};
