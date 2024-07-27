"use client";

import React from "react";
import { Button } from "@/shared/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/ui/alert-dialog";
import { bookApi } from "@/entities/book";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/config/routes";
import { toast } from "sonner";

export function DeleteBookButton({ bookId }: { bookId: string }) {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    bookApi
      .deleteBook(bookId)
      .then(() => {
        router.push(ROUTES.BOOKS);
        router.refresh();
      })
      .catch((err) => {
        const message = err?.response?.data?.message || "Something went wrong";
        toast.error(message);
      });
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full">
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your book
            and remove data from our server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleClick}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
