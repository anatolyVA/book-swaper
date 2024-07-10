import { z } from "zod";

interface User {
  id: string;
  email: string;
  role: UserRole;
  profile: UserProfile;

  // Can be ignored
  createdAt: string;
  updatedAt: string;
}

interface UserProfile {
  firstName: string;
  lastName: string;
  country: string;
  city: string;
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

const createUserSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  profile: z.object({
    firstName: z.string().min(2).max(50),
    lastName: z.string().min(2).max(50),
    country: z.string().min(1),
    city: z.string().min(1),
  }),
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const newPasswordSchema = z.object({
  email: z.string().email(),
});

export {
  type User,
  createUserSchema,
  loginSchema,
  newPasswordSchema,
  type UserProfile,
  UserRole,
};
