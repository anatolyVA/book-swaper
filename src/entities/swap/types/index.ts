import { z } from "zod";

const swapBookSchema = z.object({
  offeringBookId: z
    .string()
    .refine((value) => !!value, { message: "Offering book is required" }),
  requestedBookId: z
    .string()
    .refine((value) => !!value, { message: "Requested book is required" }),
});

export { swapBookSchema };
