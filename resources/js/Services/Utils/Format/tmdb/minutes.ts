export const minutes = (minute: number | undefined): string | undefined => {
    if (!minute) return undefined;

    let hour = Math.floor(minute / 60);
    let min = minute % 60;

    return `${hour}h${min}m`;
};
