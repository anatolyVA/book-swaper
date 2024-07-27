"use client";

import React, { useEffect } from "react";
import { Book, BookCard } from "@/entities/book";
import { cn } from "@/shared/lib/utils";
import {
  CreateSwapRequestButton,
  CreateSwapRequestModal,
} from "@/features/swap-request/create";
import { AddToFavoriteButton } from "@/features/book/add-to-favorite";
import { useProfile } from "@/entities/user";

interface SimilarBookListProps {
  data: Book[];
  className?: string;
}

export function SimilarBookList({ data, className }: SimilarBookListProps) {
  const profile = useProfile((state) => state.profile);

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <header>
        <h2 className="text-lg font-bold text-primary">Similar books</h2>
      </header>
      <main className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {data.length > 0
          ? data.map((book) => (
              <BookCard
                key={book.id}
                data={book}
                isUserBook={profile && profile.id === book.owner.id}
                swapTrigger={
                  <CreateSwapRequestModal
                    trigger={<CreateSwapRequestButton className="w-full" />}
                    triggerAsChild
                    requestedBook={book}
                  />
                }
                addToFavButton={<AddToFavoriteButton />}
              />
            ))
          : "No similar books"}
      </main>
    </section>
  );
}
