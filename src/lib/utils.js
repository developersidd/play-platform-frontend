import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatViews = (num) => {
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // format as 1M for millions
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"; // format as 1k for thousands
  } else {
    return num.toString(); // return the number as-is if below 1000
  }
};
