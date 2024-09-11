"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";
import { Book, BookCharacteristicValue } from "@/entities/book";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";
import { BookStatusBadge } from "@/entities/book/ui/book.status.badge";

interface BookCardProps {
  data: Book;
  isUserBook?: boolean;
  variant?: "grid" | "list";
  swapTrigger?: React.ReactNode;
  addToFavButton?: React.ReactNode;
}

export const BookCard = ({
  data,
  swapTrigger,
  addToFavButton,
  isUserBook = false,
  variant = "grid",
}: BookCardProps) => {
  const { author } = data;

  const getDescriptionSlice = (maxLength: number): string =>
    data.description.length >= maxLength
      ? data.description.slice(0, maxLength) + "..."
      : data.description;
  return variant === "grid" ? (
    <Card className="flex flex-col overflow-hidden h-full border-0 shadow-none relative">
      <BookCardCarousel
        data={data.images}
        href={`${ROUTES.BOOKS}/${data.id}`}
      />
      <CardFooter className="flex flex-col gap-4 items-start pt-4 flex-1 px-2">
        <div className="flex flex-col flex-1 w-full">
          <div className="flex gap-2 justify-between w-full">
            <BookStatusBadge status={data.status} />
            {isUserBook && (
              <span className="text-xs text-muted-foreground"> Your book</span>
            )}
          </div>
          <Link
            href={`${ROUTES.BOOKS}/${data.id}`}
            className="font-bold text-lg text-clip underline-offset-2 hover:underline"
          >
            {data.title}
          </Link>
          <p className="text-sm">{getDescriptionSlice(50)}</p>
          <p className="text-sm text-muted-foreground">
            {elapseTime(data.createdAt)}
          </p>
        </div>
        <div className="flex gap-2 w-full">
          {swapTrigger}
          {addToFavButton}
        </div>
      </CardFooter>
    </Card>
  ) : (
    <article className="grid grid-cols-[3fr_8fr] gap-4">
      <div className="flex flex-col gap-2 rounded-md overflow-hidden">
        <BookCardCarousel
          data={data.images}
          href={`${ROUTES.BOOKS}/${data.id}`}
          className="h-[250px] w-full"
        />
      </div>
      <main className={`flex flex-col gap-3`}>
        <header className="flex flex-col flex-1">
          <div className="flex gap-2 justify-between">
            <BookStatusBadge status={data.status} />
            {isUserBook && (
              <span className="text-xs text-muted-foreground">Your book</span>
            )}
          </div>
          <Link
            href={`${ROUTES.BOOKS}/${data.id}`}
            className="font-bold text-lg text-clip underline-offset-2 hover:underline"
          >
            {data.title}
          </Link>
          <p className="text-sm">{getDescriptionSlice(200)}</p>
          <p className="text-sm text-muted-foreground">
            {elapseTime(data.createdAt)}
          </p>
        </header>
        <main className="grid grid-cols-2 gap-2 text-sm">
          <BookCharacteristicValue name="Genre" value={data.genre} />
          <BookCharacteristicValue name="Condition" value={data.condition} />
          <BookCharacteristicValue name="Cover type" value={data.coverType} />
          <BookCharacteristicValue name="Language" value={data.language.name} />
        </main>
        <footer className="w-48 flex gap-2">
          {swapTrigger}
          {addToFavButton}
        </footer>
      </main>
    </article>
  );
};

// TODO rename this function
function elapseTime(createdAt: string) {
  const now = new Date();
  const diff = now.getTime() - new Date(createdAt).getTime();

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) {
    return `${days} days ago`;
  } else if (hours > 0) {
    return `${hours} hours ago`;
  } else if (minutes > 0) {
    return `${minutes} minutes ago`;
  } else {
    return `Less than a minute ago`;
  }
}
