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
  state: string;
  avatarPath?: string;
  city: string;
}

enum UserRole {
  USER = "USER",
  ADMIN = "ADMIN",
}

interface UserStatistics {
  bookCount: number;
  successSwapsCount: number;
}

const createUserSchema = z
  .object({
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    profile: z.object({
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      country: z
        .string()
        .refine((value) => !!value, { message: "Country is required" }),
      city: z.string(),
      state: z.string(),
    }),
  })
  .superRefine(({ password, confirmPassword }, ctx) => {
    if (password !== confirmPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The passwords did not match",
        path: ["confirmPassword"],
      });
    }
  });

const updateUserSchema = z.object({
  email: z.string().email().optional(),
  oldPassword: z.string().optional(),
  // TODO fix
  newPassword: z.string().min(6).optional(),
  profile: z
    .object({
      firstName: z.string().min(2).max(50),
      lastName: z.string().min(2).max(50),
      country: z
        .string()
        .refine((value) => !!value, { message: "Country is required" }),
      city: z.string(),
      state: z.string(),
    })
    .optional(),
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
  updateUserSchema,
  loginSchema,
  newPasswordSchema,
  type UserProfile,
  type UserStatistics,
  UserRole,
};
