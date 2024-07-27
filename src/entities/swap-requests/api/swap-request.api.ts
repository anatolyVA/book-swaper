import { apiWithAuth } from "@/shared/api/axios";
import {
  SwapRequest,
  createSwapRequestSchema,
  SwapRequestStatus,
} from "../types";
import { z } from "zod";

class SwapRequestApi {
  private readonly URL = "/swap-requests";

  async create(values: z.infer<typeof createSwapRequestSchema>) {
    const { data } = await apiWithAuth.post<SwapRequest>(this.URL, values);
    return data;
  }

  async fetchAll() {
    const { data } = await apiWithAuth.get<SwapRequest[]>(this.URL);
    return data;
  }

  async findReceived() {
    const { data } = await apiWithAuth.get<SwapRequest[]>(
      `${this.URL}/received`,
    );
    return data;
  }

  async findSent() {
    const { data } = await apiWithAuth.get<SwapRequest[]>(`${this.URL}/sent`);
    return data;
  }

  async decline(id: string) {
    const { data } = await apiWithAuth.patch<SwapRequest>(`${this.URL}/${id}`, {
      status: SwapRequestStatus.REJECTED,
    });
    return data;
  }

  async accept(id: string) {
    const { data } = await apiWithAuth.patch<SwapRequest>(`${this.URL}/${id}`, {
      status: SwapRequestStatus.ACCEPTED,
    });
    return data;
  }

  async delete(id: string) {
    const { data } = await apiWithAuth.delete<SwapRequest>(`${this.URL}/${id}`);
    return data;
  }
}

export const swapRequestAPI = new SwapRequestApi();
