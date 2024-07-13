import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { CreateBookForm } from "@/features/book/create";
import { FormModal } from "@/shared/ui/form.modal";
import { SwapBookForm } from "@/features/book/create/ui/swap-book.form";
import { Book } from "@/entities/book";

interface SwapBookModalProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
  requestedBook: Book;
}
export function SwapBookModal({
  trigger,
  triggerAsChild,
  requestedBook,
}: SwapBookModalProps) {
  return (
    <FormModal
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      form={<SwapBookForm requestedBook={requestedBook} />}
      title={"Swap Book"}
    />
  );
}
