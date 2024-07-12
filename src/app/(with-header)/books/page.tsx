import React from "react";
import { bookApi } from "@/entities/book";
import { BookList } from "@/widgets/book-list";

export default async function BooksPage() {
  const books = await bookApi.getBooks();
  return (
    <main className="flex px-12 py-8 min-h-[calc(100vh-70px)]">
      <BookList data={books} />
    </main>
  );
}
