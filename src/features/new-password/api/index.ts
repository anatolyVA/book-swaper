import { api } from "@/shared/api/axios";

export const confirmEmail = async (email: string) => {
  const { data } = await api.post("/auth/login", { email });
  return data;
};
