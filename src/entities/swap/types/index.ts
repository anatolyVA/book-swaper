import { z } from "zod";
import { Book } from "@/entities/book";

interface Swap {
  id: string;
  status: SwapStatus;
  requestedBook: Book;
  offeringBook: Book;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

enum SwapStatus {
  SENT = "SENT",
  ACCEPTED = "ACCEPTED",
  COMPLETED = "COMPLETED",
  DECLINED = "DECLINED",
}

const swapBookSchema = z.object({
  offeringBookId: z
    .string()
    .refine((value) => !!value, { message: "Offering book is required" }),
  requestedBookId: z
    .string()
    .refine((value) => !!value, { message: "Requested book is required" }),
});

export { swapBookSchema, type Swap };
