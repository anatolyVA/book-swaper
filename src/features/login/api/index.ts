import axios from "axios";
import { api } from "@/shared/api/axios";

export const login = async (email: string, password: string) => {
  const { data } = await api.post("/auth/login", { email, password });
  return data;
};
