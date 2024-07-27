import React, { useState } from "react";
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
import { swapRequestAPI } from "@/entities/swap-requests";
import { toast } from "sonner";

export function AcceptSwapRequestButton({ requestId }: { requestId: string }) {
  const [open, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    swapRequestAPI
      .accept(requestId)
      .then(() => {
        toast.success("Swap request accepted");
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || "Something went wrong");
      });

    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">Accept</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will transfer your book to the swap state and prevent
            other users from offering you swaps.
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
