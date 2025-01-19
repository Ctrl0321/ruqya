import { format } from 'date-fns-tz';

export const convertToTimeZone = (date: Date, timeZone: string): string => {
    return format(date, 'yyyy-MM-dd HH:mm:ssXXX', { timeZone });
};
