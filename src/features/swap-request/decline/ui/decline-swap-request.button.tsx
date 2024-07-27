import React, { useState } from "react";
import { Button } from "@/shared/ui/button";
import { swapRequestAPI } from "@/entities/swap-requests";
import { toast } from "sonner";
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

export function DeclineSwapRequestButton({ requestId }: { requestId: string }) {
  const [open, setOpen] = useState(false);
  const handleClick = (e: React.MouseEvent) => {
    swapRequestAPI
      .decline(requestId)
      .then(() => {
        toast.success("Swap request declined");
      })
      .catch(({ response }) => {
        toast.error(response?.data?.message || "Something went wrong");
      });

    setOpen(false);
  };
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button size="sm">Decline</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action will result in the irreversible rejection of the request
            to swap your book.
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
