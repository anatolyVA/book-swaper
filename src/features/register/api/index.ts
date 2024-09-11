import { api } from "@/shared/api/axios";
import { createUserSchema } from "@/entities/user";
import { z } from "zod";

export const register = async (
  values: Omit<z.infer<typeof createUserSchema>, "confirmPassword">,
) => {
  const { data } = await api.post("/auth/register", values);
  return data;
};
