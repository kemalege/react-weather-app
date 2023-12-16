export const getDate = (dt: number): string => {
    const date = new Date(dt * 1000);
    const dayIndex = date.getDay();

    switch (dayIndex) {
        case 0:
            return "PAZ";
        case 1:
            return "PZT";
        case 2:
            return "SAL";
        case 3:
            return "ÇAR";
        case 4:
            return "PER";
        case 5:
            return "CUM";
        case 6:
            return "CMT";
        default:
            return "";
    }
};

export const getDayMonth = (dt: number): string => {
    const date = new Date(dt * 1000);
    const day = date.getDate();
    const month = date.getMonth() + 1;

    return `${day.toString().padStart(2, '0')}/${month.toString().padStart(2, '0')}`;
};
