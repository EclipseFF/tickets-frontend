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

export function formatDateToRussianLong(dateString: string): string {
  // Parse the input string into a Date object
  const date = new Date(dateString);

  // Define formatting options to include both date and time
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric', // Optional: remove this line if seconds are not needed
  };

  // Format the date to Russian locale with the specified options
  const formattedDate = new Intl.DateTimeFormat('ru-RU', options).format(date);

  return formattedDate;
}

export function incrementDay(date: Date): Date {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);
  return newDate;
}