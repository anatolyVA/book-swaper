import React from "react";
import { beautifyValue, getInitials } from "@/shared/lib/utils";
import { Book } from "@/entities/book";

interface BookCharacteristicListProps {
  data: Book;
}

export function BookCharacteristicList({ data }: BookCharacteristicListProps) {
  const { author } = data;

  return (
    <section className="flex flex-col gap-6 w-full">
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
          <CharacteristicValue name="Language" value={data.language.name} />
        </div>
        <CharacteristicValue
          name="Description"
          value={`${data.description}`}
          className=""
        />
      </main>
    </section>
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
      <p>{beautifyValue(value.toString())}</p>
    </div>
  );
}
