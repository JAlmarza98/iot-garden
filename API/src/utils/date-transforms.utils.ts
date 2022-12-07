export const getDayEndTime = (day: number) => {
    let date = new Date(day);
    date.setHours(24,0,0,0);
    return date.getTime();
}

export const getDayTimeCero = (day: number) => {
    let date = new Date(day);
    date.setHours(0,0,0,0);
    return date.getTime();
}

export const getWeekFirstDay = (day: number) => {
    let date = new Date(day);
    const weekDay = date.getDay();

    switch (weekDay) {
        case 0:
            return getDayTimeCero(date.getTime() - 6);
        case 1:
            return getDayTimeCero(date.getTime());
        default:
            date.setDate(date.getDate() - (weekDay - 1))
            return getDayTimeCero(date.getTime());
    }
}

export const getWeekLastDay = (day: number) => {
    let date = new Date(day);
    const weekDay = date.getDay();

    switch (weekDay) {
        case 0:
            return getDayEndTime(date.getTime());
        case 1:
            return getDayEndTime(date.getTime() + 6);
        default:
            date.setDate(date.getDate() + (weekDay - 7))
            return getDayEndTime(date.getTime());
    }
}

export const getMounthFirstDay = (day: number) => {
    let date = new Date(day);
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    return getDayTimeCero(firstDay.getTime());
}

export const getMounthLastDay = (day: number) => {
    let date = new Date(day);
    var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    return getDayEndTime(lastDay.getTime());
}