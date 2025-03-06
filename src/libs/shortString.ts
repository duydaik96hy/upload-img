export const shortString = (str: string | undefined, length: number): string => {
    if (!str) return "";
    if (str.length < length) return str;

    return `${str.slice(0, length)}...`;
};