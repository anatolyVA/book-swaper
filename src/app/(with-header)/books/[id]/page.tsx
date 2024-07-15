import React from "react";
import { bookApi } from "@/entities/book";
import { notFound } from "next/navigation";
import { getBookTags } from "@/shared/lib/utils";
import { BookCharacteristicList } from "@/widgets/book-characteristic";
import { SimilarBookList } from "@/widgets/similar-books";
import { HEADER_HEIGHT } from "@/shared/config/const";
import { BookAlbum } from "@/widgets/book-album";

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

  return (
    <main
      className="flex flex-col pt-8 pb-12 gap-8 container px-8"
      style={{
        minHeight: `calc(100dvh - ${HEADER_HEIGHT})`,
      }}
    >
      <div className="flex flex-col lg:flex-row">
        <BookAlbum data={data} />
        <BookCharacteristicList data={data} />
      </div>

      <SimilarBookList tags={getBookTags(data)} />
    </main>
  );
}
