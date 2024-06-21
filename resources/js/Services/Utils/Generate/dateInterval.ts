interface IDateInterval {
    today: Date;
    lastMonth: Date;
    listMonth: { month: string; startDate: Date; endDate: Date }[];
}

// ? from now to Next 3 Month
export const dateInterval = (interval: number = 2): IDateInterval => {
    var today = new Date();
    var lastMonth = new Date(
        today.getFullYear(),
        today.getMonth() + interval,
        today.getDate()
    );

    var dateResult: IDateInterval = {
        today: today,
        lastMonth: lastMonth,
        listMonth: [],
    };

    for (var i = 0; i <= interval; i++) {
        var startDate = new Date(today.getFullYear(), today.getMonth() + i, 1);

        var endDate = new Date(
            today.getFullYear(),
            today.getMonth() + i + 1,
            0
        );

        var monthData = {
            month: startDate.toLocaleDateString("en", { month: "long" }),
            startDate: startDate,
            endDate: endDate,
        };

        dateResult.listMonth.push(monthData);
    }

    return dateResult;
};
