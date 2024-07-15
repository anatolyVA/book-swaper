import React from "react";
import { FormModal } from "@/shared/ui/form.modal";
import { Book } from "@/entities/book";
import { CreateSwapForm } from "./create-swap.form";

interface SwapBookModalProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
  requestedBook: Book;
}
export function CreateSwapModal({
  trigger,
  triggerAsChild,
  requestedBook,
}: SwapBookModalProps) {
  return (
    <FormModal
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      form={<CreateSwapForm requestedBook={requestedBook} />}
      title={"Swap Book"}
    />
  );
}
