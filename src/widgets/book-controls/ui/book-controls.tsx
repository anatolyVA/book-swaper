"use client";

import React from "react";
import { useProfile } from "@/entities/user";
import { Button } from "@/shared/ui/button";
import { DeleteBookButton } from "@/features/book/delete";
import {
  CreateSwapRequestButton,
  CreateSwapRequestModal,
} from "@/features/swap-request/create";
import { Book } from "@/entities/book";
import { cn } from "@/shared/lib/utils";

interface BookControlsProps {
  book: Book;
  className?: string;
}

export function BookControls({ book, className }: BookControlsProps) {
  const profile = useProfile((state) => state.profile);

  return (
    <div className={cn("flex gap-2 w-[200px]", className)}>
      {profile && profile.id === book.ownerId ? (
        <>
          <Button className="w-full" variant="secondary">
            Edit
          </Button>
          <DeleteBookButton bookId={book.id} />
        </>
      ) : (
        <CreateSwapRequestModal
          trigger={<CreateSwapRequestButton className="w-full" />}
          triggerAsChild
          requestedBook={book}
        />
      )}
    </div>
  );
}
