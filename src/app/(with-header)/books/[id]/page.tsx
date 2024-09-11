import React from "react";
import { bookApi } from "@/entities/book";
import { notFound } from "next/navigation";
import { getBookTags } from "@/shared/lib/utils";
import { BookCharacteristicList } from "@/widgets/book-characteristic";
import { SimilarBookList } from "@/widgets/similar-books";
import { HEADER_HEIGHT } from "@/shared/config/const";
import { BookAlbum } from "@/widgets/book-album";
import { BookControls } from "@/widgets/book-controls";
import { FavoriteButton } from "@/features/book/favorite";

interface BookPageProps {
  params: {
    id: string;
  };
}

export default async function BookPage({ params }: BookPageProps) {
  const { id } = params;

  const data = await bookApi
    .getBook(id)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      notFound();
    });

  const similarBooks = await bookApi
    .getSimilarBooks(id)
    .then((data) => data)
    .catch((err) => {
      console.log(err);
      return [];
    });

  return (
    <main
      className="flex flex-col pt-8 pb-12 gap-8 container px-8"
      style={{
        minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
      }}
    >
      <div className="grid lg:grid-cols-[6fr_4fr] gap-8">
        <BookAlbum book={data} />
        <div className="flex flex-col gap-4 relative">
          <FavoriteButton bookId={id} className="absolute top-4 right-4" />
          <BookCharacteristicList book={data} className="flex-1" />

          {/* TODO: replace this */}
          <BookControls book={data} className="self-center" />
        </div>
      </div>
      <SimilarBookList data={similarBooks} />
    </main>
  );
}
