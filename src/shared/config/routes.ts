export enum ROUTES {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  PROFILE = "/i",
  USER_BOOKS = "/i/books",
  USER_SWAPS = "/i/swaps",
  BOOKS = "/books",
  BOOK = "/books/:id",
}

export const PROTECTED_ROUTES = ["/i", "/i/books", "/i/swaps"];
