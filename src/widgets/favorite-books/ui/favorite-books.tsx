"use client";

import React from "react";
import { favoriteBookAPI } from "@/entities/favorites";
import { Book, BookCard } from "@/entities/book";

export function FavoriteBooks() {
  const [books, setBooks] = React.useState<Book[]>([]);

  React.useEffect(() => {
    favoriteBookAPI
      .fetchAll()
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-2xl">Favorite books</h2>
      <ul className="grid gap-2">
        {books.map((book) => (
          <BookCard variant="list" key={book.id} data={book} />
        ))}
      </ul>
    </div>
  );
}
