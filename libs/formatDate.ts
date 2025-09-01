import { differenceInCalendarDays, formatDistanceToNow } from "date-fns";

export const hourFromNow = (date: string): string => {
  const createdAt = new Date(date + "Z"); // Ensure the date is in UTC
  const result = formatDistanceToNow(createdAt, { addSuffix: true });
  return result
}

export const isDisplayedByHour = (date: string) : boolean => {
  const now = new Date();
  const createdAt = new Date(date);
  const different = differenceInCalendarDays(now, createdAt);
  return different < 3
}
export const formatDate = (date: string): string => {
  const createdAt = new Date(date);
  return createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};