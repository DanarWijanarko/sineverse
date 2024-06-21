export const handleMultiSelect = (listData: Array<any>, compare: any) => {
    const newProviderIds = listData.includes(compare)
        ? listData.filter((id) => id !== compare)
        : [...listData, compare];

    return newProviderIds;
};
