"use client";

import React, { useEffect } from "react";
import { Book, BookCard } from "@/entities/book";

interface SimilarBookListProps {
  tags: string[];
}

export function SimilarBookList({ tags }: SimilarBookListProps) {
  const [similarBooks, setSimilarBooks] = React.useState<Book[]>([]);

  useEffect(() => {
    setSimilarBooks([]);
  }, []);

  return (
    <section className="flex flex-col gap-4">
      <header>
        <h2 className="text-lg font-bold text-primary">Similar books</h2>
      </header>
      <main className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
        {similarBooks.length > 0
          ? similarBooks.map((book) => <BookCard key={book.id} data={book} />)
          : "No similar books"}
      </main>
    </section>
  );
}
