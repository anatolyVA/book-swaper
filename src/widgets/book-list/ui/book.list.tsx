"use client";

import { BookCard } from "@/entities/book/ui/book.card";
import { Book } from "@/entities/book";
import { CreateSwapButton, CreateSwapModal } from "@/features/swap/create";
import { useRouter } from "next/navigation";
import React from "react";

interface BookListProps {
  data: Book[];
}
export function BookList({ data }: BookListProps) {
  //const profile = useStore(useProfile, (state) => state.profile);
  const router = useRouter();

  return (
    <div className="grid lg:grid-cols-[2fr_10fr] gap-6 w-full min-h-full">
      <div className="border-r hidden lg:block">Filters</div>
      <ul className="grid xl:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 h-fit">
        {data
          //.filter((book) => book.ownerId !== profile?.id)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
          )
          .map((book) => (
            <BookCard
              key={book.id}
              data={book}
              swapTrigger={
                <CreateSwapModal
                  trigger={<CreateSwapButton className="w-full" />}
                  triggerAsChild
                  requestedBook={book}
                />
              }
            />
          ))}
      </ul>
    </div>
  );
}
