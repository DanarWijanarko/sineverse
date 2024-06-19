export const dateWeek = (
    time: "now" | "next" | "prev",
    weekInterval: number = 1 // 1 => next a week from now
): Date | undefined => {
    var date = new Date();

    switch (time) {
        case "now":
            date = date;
            break;
        case "next":
            date = new Date(
                date.getTime() + weekInterval * 7 * 24 * 60 * 60 * 1000
            );
            break;
        case "prev":
            date = new Date(
                date.getTime() - weekInterval * 7 * 24 * 60 * 60 * 1000
            );
            break;
    }

    return date;
};
