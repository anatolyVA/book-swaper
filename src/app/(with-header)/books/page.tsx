import React from "react";
import { Author, Book, bookApi, Language } from "@/entities/book";
import { BookList } from "@/widgets/book-list";
import { HEADER_HEIGHT } from "@/shared/config/const";
import { api } from "@/shared/api/axios";

export default async function BooksPage() {
  const data = await bookApi.getBooks().catch((err) => {
    console.log(err);
    return {
      books: [] as Book[],
      total: 0,
    };
  });

  // will be added limit 5
  const languages = await api
    .get<Language[]>("/languages")
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
      return [] as Language[];
    });

  // will be added limit 5
  const authors = await api
    .get<Author[]>("/authors")
    .then(({ data }) => data)
    .catch((err) => {
      console.log(err);
      return [] as Author[];
    });

  return (
    <main
      className={`flex py-8 min-h-[calc(100vh-${HEADER_HEIGHT})] container px-8`}
    >
      <BookList
        data={data.books}
        totalCount={data.total}
        authors={authors}
        languages={languages}
      />
    </main>
  );
}
