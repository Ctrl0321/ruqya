import { clsx, ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import {format} from "date-fns";

// export function cn(...inputs: ClassValue[]) {
//   return twMerge(clsx(inputs))
// }

export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

export const getUserTimeZone = () => {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
};

export  const formatDateTimeWithOffset = (date) => {
  if (!date) return undefined;
  const timezoneOffset = -date.getTimezoneOffset();
  const offsetHours = String(Math.floor(Math.abs(timezoneOffset) / 60)).padStart(2, '0');
  const offsetMinutes = String(Math.abs(timezoneOffset) % 60).padStart(2, '0');
  const offsetSign = timezoneOffset >= 0 ? '+' : '-';

  return `${format(date, 'yyyy-MM-dd HH:mm:ss')}${offsetSign}${offsetHours}:${offsetMinutes}`;
};
