import React from "react";
import { CreateBookForm } from "@/features/book/create";
import { FormModal } from "@/shared/ui/form.modal";

interface CreateBookModalProps {
  trigger: React.ReactNode;
  triggerAsChild?: boolean;
}
export function CreateBookModal({
  trigger,
  triggerAsChild,
}: CreateBookModalProps) {
  return (
    <FormModal
      trigger={trigger}
      triggerAsChild={triggerAsChild}
      form={<CreateBookForm />}
      title={"Add book"}
    />
  );
}
