import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (
  firstName: string,
  lastName: string,
  patronym: string | undefined,
) =>
  patronym
    ? `${lastName} ${firstName[0]}.${patronym[0]}.`
    : `${lastName} ${firstName[0]}.`;
