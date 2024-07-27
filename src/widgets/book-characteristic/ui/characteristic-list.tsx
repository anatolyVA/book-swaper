"use client";

import React from "react";
import { beautifyValue, cn, getInitials } from "@/shared/lib/utils";
import {
  Book,
  BookCharacteristicValue,
  BookStatusBadge,
} from "@/entities/book";
import { useProfile, UserInfo } from "@/entities/user";
import { Badge } from "@/shared/ui/badge";

interface BookCharacteristicListProps {
  book: Book;
  className?: string;
}

export function BookCharacteristicList({
  book,
  className,
}: BookCharacteristicListProps) {
  const { author, owner } = book;

  const location = `${owner.profile.city === "" ? owner.profile.state : owner.profile.city}, ${owner.profile.country}`;

  return (
    <section className={cn("flex flex-col gap-6 w-full", className)}>
      <header>
        <BookStatusBadge status={book.status} />
        <h1 className="text-primary text-2xl font-bold mr-16">{book.title}</h1>
        <span className="text-lg">
          {getInitials(author.firstName, author.lastName, author.patronym)}
        </span>
      </header>
      <main className="flex flex-col gap-4">
        <div className="grid lg:grid-cols-2 gap-2 lg:gap-4 lg:w-[330px]">
          <BookCharacteristicValue
            name="Owner`s location"
            disableBeautify
            value={location}
            className="col-span-2"
          />
          <BookCharacteristicValue name="Condition" value={book.condition} />
          <BookCharacteristicValue name="Genre" value={book.genre} />
          <BookCharacteristicValue name="Cover type" value={book.coverType} />
          <BookCharacteristicValue name="Language" value={book.language.name} />
        </div>
        <BookCharacteristicValue
          name="Description"
          disableBeautify
          value={`${book.description}`}
          className="flex-col"
        />
        <UserInfo user={owner} />
      </main>
    </section>
  );
}
