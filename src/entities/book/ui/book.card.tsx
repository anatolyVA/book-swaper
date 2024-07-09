"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";
import { Book } from "@/entities/book";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";

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
    <Card className="overflow-hidden">
      <BookCardCarousel />
      <CardFooter className="flex flex-col gap-4 items-start pt-4">
        <div>
          <h4 className="font-bold text-lg">{data.title}</h4>
          <p>{descriptionSlice}</p>
        </div>
        <Button className="w-full">Swap</Button>
      </CardFooter>
    </Card>
  );
};
