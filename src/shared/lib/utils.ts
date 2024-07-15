import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  Book,
  BookCondition,
  BookCoverType,
  BookGenre,
  BookStatus,
} from "@/entities/book";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (
  firstName: string,
  lastName: string,
  patronym: string = "",
) =>
  patronym
    ? `${lastName} ${firstName[0]}.${patronym[0]}.`
    : `${lastName} ${firstName[0]}.`;

export const convertPathToUrl = (path: string) => {
  return "http://localhost:8080/" + path.replaceAll("\\", "/"); // domain to .env
};

type Tags = [BookStatus, BookGenre, BookCoverType, string, BookCondition];
export const getBookTags = (book: Book): Tags => [
  book.status,
  book.genre,
  book.coverType,
  book.language.code,
  book.condition,
];

export const beautifyValue = (value: string) =>
  (value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()).replaceAll(
    "_",
    " ",
  );
