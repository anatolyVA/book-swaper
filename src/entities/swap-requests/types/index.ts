import { z } from "zod";
import { Book } from "@/entities/book";
import { User } from "@/entities/user";

const createSwapRequestSchema = z.object({
  offeredBookId: z
    .string()
    .refine((value) => !!value, { message: "Offered book is required" }),
  requestedBookId: z
    .string()
    .refine((value) => !!value, { message: "Requested book is required" }),
});

enum SwapRequestStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

interface SwapRequest {
  id: string;
  offeredBookId: string;
  requestedBookId: string;
  requesterId: string;
  recipientId: string;

  offeredBook: Book;
  requestedBook: Book;
  requester: User;
  recipient: User;

  status: SwapRequestStatus;

  createdAt: Date;
  updatedAt: Date;
}

export { createSwapRequestSchema, type SwapRequest, SwapRequestStatus };
