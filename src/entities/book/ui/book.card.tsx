"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";
import { Book } from "@/entities/book";

interface BookCardProps {
  data: Book;
}
export const BookCard = ({ data }: BookCardProps) => {
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
  return (
    <article className="rounded-2xl overflow-hidden shadow-lg">
      <BookCardCarousel />
      <div className="p-6 pt-2">
        <div className="mb-2">
          {tags.map(
            (tag) =>
              tag && (
                <Badge key={tag} className="mr-2">
                  {tag}
                </Badge>
              ),
          )}
        </div>

        <h2 className="font-bold text-lg">{data.title}</h2>
        <p className="mb-4">{descriptionSlice}</p>
        <Button
          className="w-full"
          onClick={() =>
            alert("otkrivaetsia modalka(skoree vsego eto budet page) /swap")
          }
        >
          Swap
        </Button>
      </div>
    </article>
  );
};
