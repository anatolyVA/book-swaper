import React from "react";
import { bookApi, BookCard } from "@/entities/book";
import { notFound } from "next/navigation";
import { getInitials } from "@/shared/lib/utils";
import { Button } from "@/shared/ui/button";
import { BookCardCarousel } from "@/entities/book/ui/book.card.carousel";

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

  return (
    <main className="min-h-[calc(100vh-70px)] grid grid-cols-[3fr_9fr_2fr] px-12 py-8 gap-8 flex-1">
      <section className="grid gap-4 flex-1 grid-rows-[7fr_2fr]">
        <BookCardCarousel className="flex-1 min-h-full" />
        <div className="flex gap-2">
          <Button size="lg" className="w-full">
            Swap
          </Button>
        </div>
      </section>
      <section className="flex flex-col gap-4 flex-1 ">
        <header>
          <h1 className="text-primary text-2xl font-bold">{data.title}</h1>
          <span className="text-lg">
            {getInitials(author.firstName, author.lastName, author.patronym)}
          </span>
        </header>
        <main className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-2 max-w-[600px]">
            <CharacteristicValue name="Condition" value={data.condition} />
            <CharacteristicValue name="Genre" value={data.genre} />
            <CharacteristicValue name="Cover type" value={data.coverType} />
            <CharacteristicValue name="Status" value={data.status} />
            <CharacteristicValue name="Language" value={data.language} />
          </div>
          <CharacteristicValue name="Description" value={data.description} />
        </main>
      </section>
      <section className="flex flex-col gap-2">
        <header>
          <h2 className="text-lg font-bold text-primary">Similar books</h2>
        </header>
        <main>
          <BookCard data={data} variant="list" />
        </main>
      </section>
    </main>
  );
}

function CharacteristicValue({ name, value }: { name: string; value: string }) {
  return (
    <div className="flex gap-2">
      <span className="font-bold">{name}:</span>
      <p>{value.toString()}</p>
    </div>
  );
}
