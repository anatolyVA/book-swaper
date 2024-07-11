import { api } from "@/shared/api/axios";
import { createUserSchema } from "@/entities/user";
import { z } from "zod";

export const register = async (values: z.infer<typeof createUserSchema>) => {
  const { data } = await api.post("/auth/register", values);
  return data;
};
