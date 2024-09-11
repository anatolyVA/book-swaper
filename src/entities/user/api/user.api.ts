import { api, apiWithAuth } from "@/shared/api/axios";
import {
  User,
  createUserSchema,
  UserStatistics,
  updateUserSchema,
} from "../types";
import { z } from "zod";

class UserApi {
  private URL = "/users";

  async getCurrentUser() {
    const { data } = await apiWithAuth.get<User>(`${this.URL}/me`);
    return data;
  }

  async getUser(id: string) {
    const { data } = await api.get<User>(`${this.URL}/${id}`);
    return data;
  }

  async getUsers() {
    const { data } = await api.get<User[]>(this.URL);
    return data;
  }

  async updateUser(id: string, values: z.infer<typeof updateUserSchema>) {
    const { data } = await apiWithAuth.patch<User>(`${this.URL}/${id}`, values);
    return data;
  }

  async deleteUser(id: string) {
    const { data } = await apiWithAuth.delete<User>(`${this.URL}/${id}`);
    return data;
  }

  async createUser(values: z.infer<typeof createUserSchema>) {
    const { data } = await api.post(this.URL, values);
    return data;
  }

  async getStatistics(id: string) {
    const { data } = await api.get<UserStatistics>(
      `${this.URL}/${id}/statistics`,
    );
    return data;
  }

  async getCurrentUserStatistics() {
    const { data } = await apiWithAuth.get<UserStatistics>(
      `${this.URL}/me/statistics`,
    );
    return data;
  }
}

export const userApi = new UserApi();
