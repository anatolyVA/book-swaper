import { apiWithAuth } from "@/shared/api/axios";
import { swapBookSchema } from "@/entities/book";
import { z } from "zod";

class SwapApi {
  private URL = "/swaps";
  async createSwap(values: z.infer<typeof swapBookSchema>) {
    const { data } = await apiWithAuth.post(this.URL, values);
    return data;
  }
}
export const swapApi = new SwapApi();
