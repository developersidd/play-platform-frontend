import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatCounting = (num) => {
  num = parseInt(num);
  // format as billion
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + "B";
  } else if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + "M"; // format as 1M for millions
  } else if (num >= 1000) {
    return (num / 1000).toFixed(1) + "k"; // format as 1k for thousands
  } else {
    return num.toString(); // return the number as-is if below 1000
  }
};

export function formatFileSize(bytes) {
  const units = ["bytes", "KB", "MB", "GB", "TB"];

  if (bytes === 0) return "0 bytes";

  const i = Math.floor(Math.log(bytes) / Math.log(1024)); // Calculate the unit index

  // Convert bytes to the appropriate unit and round to two decimal places
  const size = (bytes / Math.pow(1024, i)).toFixed(2);

  return `${size} ${units[i]}`;
}
