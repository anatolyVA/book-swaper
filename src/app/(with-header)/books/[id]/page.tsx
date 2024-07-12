import React from "react";
import { bookApi, BookCard } from "@/entities/book";
import { notFound } from "next/navigation";
import { getInitials } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { BookCardCarousel } from "@/entities/book/ui/book.card.carousel";
import { AlbumCard } from "@/entities/book/ui/book.card.album";

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

  const { author } = data;
  //<BookCardCarousel className="flex-1 min-h-full min-w-[30rem]" />
  return (
    <main className="flex flex-col pt-8 pb-12 gap-8 min-h-[calc(100vh-70px)] container">
      <div className="flex flex-col lg:flex-row flex-1">
        <section className="mb-4 lg:mr-10 w-full sm:w-[404px] lg:w-auto m-auto lg:m-0">
          <AlbumCard className="" />
          <Button size="lg" className="w-full mt-4">
            Swap
          </Button>
        </section>

        <section className="flex flex-col gap-6 ">
          <header>
            <h1 className="text-primary text-2xl font-bold">{data.title}</h1>
            <span className="text-lg">
              {getInitials(author.firstName, author.lastName, author.patronym)}
            </span>
          </header>
          <main className="flex flex-col gap-4">
            <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 max-w-[600px]">
              <CharacteristicValue name="Condition" value={data.condition} />
              <CharacteristicValue name="Genre" value={data.genre} />
              <CharacteristicValue name="Cover type" value={data.coverType} />
              <CharacteristicValue name="Status" value={data.status} />
              <CharacteristicValue name="Language" value={data.language} />
            </div>
            <CharacteristicValue
              name="Description"
              value={`${data.description}`}
              className=""
            />
          </main>
        </section>
      </div>
      <section className="flex flex-col gap-4">
        <header>
          <h2 className="text-lg font-bold text-primary">Similar books</h2>
        </header>
        <main className="grid gap-4 xl:grid-cols-4 md:grid-cols-2">
          <BookCard data={data} variant="list" />
          <BookCard data={data} variant="list" />
          <BookCard data={data} variant="list" />
          <BookCard data={data} variant="list" />
        </main>
      </section>
    </main>
  );
}

function CharacteristicValue({
  name,
  value,
  className,
}: {
  name: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={`flex ${name === "Description" ? "flex-col" : "xl:flex-col"} ${className}`}
    >
      <span className="mr-1 font-bold text-gray-400">{name}:</span>
      <p>{value.toString()}</p>
    </div>
  );
}
