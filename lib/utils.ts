import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function shortMonthDayRussian(date: Date) {
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "short",
  })
}

export function extractTime(dateString: string): string {
  const date = new Date(dateString);

  let hours: number | string = date.getHours();
  let minutes: number | string = date.getMinutes();

  hours = hours < 10 ? `0${hours}` : hours;
  minutes = minutes < 10 ? `0${minutes}` : minutes;
  return `${hours}:${minutes}`;
}

export function formatDateToRussian(dateString: string): string {
  const date = new Date(dateString);

  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  };

  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);

  return formattedDate;
}
