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
    <main className="px-12 py-8 gap-8">
      <div className="flex justify-center flex-col 795:flex-row mb-4">
        <section className=" mb-4 795:mr-10 w-[404px] 795:w-auto m-auto 795:m-0">
          <AlbumCard className=" min-h-full" />
        </section>

        <section className="flex flex-col gap-6 ">
          <header>
            <h1 className="text-primary text-2xl font-bold">{data.title}</h1>
            <span className="text-lg">
              {getInitials(author.firstName, author.lastName, author.patronym)}
            </span>
          </header>
          <main className="flex flex-col gap-4">
            <div className="grid 1100:grid-cols-2 gap-2 1100:gap-4 max-w-[600px]">
              <CharacteristicValue name="Condition" value={data.condition} />
              <CharacteristicValue name="Genre" value={data.genre} />
              <CharacteristicValue name="Cover type" value={data.coverType} />
              <CharacteristicValue name="Status" value={data.status} />
              <CharacteristicValue name="Language" value={data.language} />
            </div>
            <CharacteristicValue
              name="Description"
              value={`${data.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti deserunt fugiat incidunt iure minus numquam quaerat quam repellat, similique suscipit tempore temporibus voluptatibus! A aliquid assumenda cupiditate delectus deleniti dignissimos dolore doloremque eius eligendi error facere, fugiat impedit labore nisi, nulla odio placeat quasi, rem veritatis voluptatum. Ad distinctio dolor dolore, eius est facere incidunt nulla obcaecati omnis repellat saepe suscipit temporibus. Alias architecto, autem commodi consectetur consequuntur cumque cupiditate deserunt doloremque ducimus est et facilis incidunt inventore ipsam iste iure laborum minima modi molestias natus nihil numquam officia pariatur qui reiciendis repudiandae totam veniam? Ab modi quaerat repudiandae.`}
              className="hidden 1100:block"
            />
          </main>
          <div className="flex gap-2">
            <Button size="lg" className="">
              Swap
            </Button>
          </div>
        </section>
      </div>
      <CharacteristicValue
        name="Description"
        value={`${data.description} Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis deleniti deserunt fugiat incidunt iure minus numquam quaerat quam repellat, similique suscipit tempore temporibus voluptatibus! A aliquid assumenda cupiditate delectus deleniti dignissimos dolore doloremque eius eligendi error facere, fugiat impedit labore nisi, nulla odio placeat quasi, rem veritatis voluptatum. Ad distinctio dolor dolore, eius est facere incidunt nulla obcaecati omnis repellat saepe suscipit temporibus. Alias architecto, autem commodi consectetur consequuntur cumque cupiditate deserunt doloremque ducimus est et facilis incidunt inventore ipsam iste iure laborum minima modi molestias natus nihil numquam officia pariatur qui reiciendis repudiandae totam veniam? Ab modi quaerat repudiandae.`}
        className="1100:hidden max-w-[900px] mb-4"
      />
      <section>
        <header className="mb-4">
          <h2 className="text-lg font-bold text-primary">Similar books</h2>
        </header>
        <main className="flex">
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
      className={` flex ${name === "Description" ? "flex-col" : "1100:flex-col"} gap-2 ${className}`}
    >
      <span className="font-bold text-gray-400">{name}:</span>
      <p>{value.toString()}</p>
    </div>
  );
}
