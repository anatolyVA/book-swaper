"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";
import { Book } from "@/entities/book";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Link from "next/link";

interface BookCardProps {
  data: Book;
  variant?: "grid" | "list";
}

export const BookCard = ({ data, variant = "grid" }: BookCardProps) => {
  const tags = [
    data.condition,
    data.genre,
    data.coverType,
    data.status,
    data.language,
  ];

  const descriptionSlice: string =
    data.description.length >= 50
      ? data.description.slice(0, 50) + "..."
      : data.description;
  return variant === "grid" ? (
    <Card className="overflow-hidden">
      <BookCardCarousel />
      <CardFooter className="flex flex-col gap-4 items-start pt-4">
        <div>
          <h4 className="font-bold text-lg">{data.title}</h4>
          <p>{descriptionSlice}</p>
        </div>
        <Button className="w-full">Swap</Button>
        <Link href={`/books/${data.id}`}>Goto</Link>
      </CardFooter>
    </Card>
  ) : (
    <article className="grid grid-cols-[3fr_9fr] gap-2">
      <div className="flex flex-col gap-2">
        <BookCardCarousel className="min-h-[120px] h-full" />
        <Button size="sm">Details</Button>
      </div>
      <main className="flex flex-col gap-3">
        <header className="flex flex-col">
          <h4 className="font-bold">{data.title}</h4>
          <p className="text-xs">{descriptionSlice}</p>
        </header>
      </main>
    </article>
  );
};
