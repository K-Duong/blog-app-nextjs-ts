import { formatDistanceToNow } from "date-fns";

export const hourFromNow = (date: string): string => {
  const createdAt = new Date(date);
  const result = formatDistanceToNow(createdAt, { addSuffix: true });
  return result
}

export const formatDate = (date: string): string => {
  const createdAt = new Date(date);
  return createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};