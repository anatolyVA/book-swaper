import { apiWithAuth } from "@/shared/api/axios";

export const logout = async () => {
  const { data } = await apiWithAuth.get("/auth/logout");
  return data;
};
