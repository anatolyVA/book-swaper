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
      title={"Create book"}
    />
  );
}
