import React from "react";
import { bookApi } from "@/entities/book";
import { BookList } from "@/widgets/book-list";

export default async function BooksPage() {
  const books = await bookApi.getBooks();
  return (
    <main className="flex py-8 min-h-[calc(100vh-70px)] container px-12">
      <BookList data={books} />
    </main>
  );
}
