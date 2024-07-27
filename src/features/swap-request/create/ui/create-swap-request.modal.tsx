import React from "react";
import { FormModal } from "@/shared/ui/form.modal";
import { Book } from "@/entities/book";
import { CreateSwapRequestForm } from "./create-swap-request.form";

interface SwapBookModalProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
  requestedBook: Book;
}
export function CreateSwapRequestModal({
  trigger,
  triggerAsChild,
  requestedBook,
}: SwapBookModalProps) {
  return (
    <FormModal
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      form={<CreateSwapRequestForm requestedBook={requestedBook} />}
      title={"Create swap request"}
    />
  );
}
