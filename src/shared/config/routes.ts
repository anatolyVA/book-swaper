export enum ROUTES {
  HOME = "/",
  SIGN_IN = "/sign-in",
  SIGN_UP = "/sign-up",
  PROFILE = "/profile",
  BOOKS = "/books",
  BOOK = "/books/:id",
}

export const PROTECTED_ROUTES = ["/profile"];
