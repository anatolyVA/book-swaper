import { api, apiWithAuth } from "@/shared/api/axios";
import { User, createUserSchema } from "../types";
import { z } from "zod";

class UserApi {
  private URL = "/users";

  async getUser(id: string) {
    const { data } = await api.get<User>(`${this.URL}/${id}`);
    return data;
  }

  async getUsers() {
    const { data } = await api.get<User[]>(this.URL);
    return data;
  }

  async updateUser(user: User) {
    const { data } = await apiWithAuth.put<User>(
      `${this.URL}/${user.id}`,
      user,
    );
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
}

export const userApi = new UserApi();
