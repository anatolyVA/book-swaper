export enum ROUTES {
  HOME = "/",
  LOGIN = "/auth#sign-in",
  SIGN_UP = "/auth#sign-up",
  PROFILE = "/profile",
  BOOKS = "/books",
  BOOK = "/books/:id",
}

export const PROTECTED_ROUTES = ["/profile"];
