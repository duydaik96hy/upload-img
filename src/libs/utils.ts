export const formatDate = (date: Date | string | number): string => {
    const dates = new Date(date);
    const day = dates.getDate();
    const month = dates.getMonth() + 1;
    const year = dates.getFullYear();
    return `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;
};