import { apiWithAuth } from "@/shared/api/axios";
import { Swap, swapBookSchema } from "../types";
import { z } from "zod";

class SwapApi {
  private URL = "/swaps";
  async getSwap(id: string) {
    const { data } = await apiWithAuth.get<Swap>(this.URL + `/${id}`);
    return data;
  }
}
export const swapApi = new SwapApi();
