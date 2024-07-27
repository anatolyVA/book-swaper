import React from "react";
import { BookStatus } from "@/entities/book";
import { beautifyValue, cn } from "@/shared/lib/utils";

export function BookStatusBadge({ status }: { status: BookStatus }) {
  const dotColor: Record<BookStatus, string> = {
    [BookStatus.AVAILABLE]: "bg-green-500",
    [BookStatus.IN_SWAP]: "bg-yellow-500",
    [BookStatus.SWAPPED]: "bg-red-500",
  };

  return (
    <div className="flex gap-2 items-center text-xs">
      <div className={cn("w-1.5 h-1.5 rounded-full", dotColor[status])}></div>
      <span>{beautifyValue(status)}</span>
    </div>
  );
}
