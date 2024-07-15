import React from "react";
import { bookApi } from "@/entities/book";
import { BookList } from "@/widgets/book-list";
import { HEADER_HEIGHT } from "@/shared/config/const";

export default async function BooksPage() {
  const books = await bookApi.getBooks().catch((err) => {
    console.log(err);
    return [];
  });

  return (
    <main
      className={`flex py-8 min-h-[calc(100vh-${HEADER_HEIGHT})] container px-8`}
    >
      <BookList data={books} />
    </main>
  );
}
