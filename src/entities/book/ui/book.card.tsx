"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";
import { Book } from "@/entities/book";
import { Card, CardContent, CardFooter } from "@/shared/ui/card";
import Link from "next/link";
import { ROUTES } from "@/shared/config/routes";

interface BookCardProps {
  data: Book;
  variant?: "grid" | "list";
  swapTrigger?: React.ReactNode;
}

export const BookCard = ({
  data,
  swapTrigger,
  variant = "grid",
}: BookCardProps) => {
  const descriptionSlice: string =
    data.description.length >= 50
      ? data.description.slice(0, 50) + "..."
      : data.description;
  return variant === "grid" ? (
    <Card className="flex flex-col overflow-hidden h-full border-0 shadow-none">
      <BookCardCarousel
        data={data.images}
        href={`${ROUTES.BOOKS}/${data.id}`}
      />
      <CardFooter className="flex flex-col gap-4 items-start pt-4 flex-1 px-2">
        <div className="flex flex-col flex-1">
          <h4 className="font-bold text-lg">{data.title}</h4>
          <p>{descriptionSlice}</p>
        </div>
        {swapTrigger}
      </CardFooter>
    </Card>
  ) : (
    <article className="grid grid-cols-[3fr_9fr] gap-2">
      <div className="flex flex-col gap-2 rounded-md overflow-hidden w-[6rem]">
        <BookCardCarousel
          data={data.images}
          href={`${ROUTES.BOOKS}/${data.id}`}
          className="min-h-[120px] h-full"
        />
      </div>
      <main className={`flex flex-col gap-3`}>
        <header className="flex flex-col">
          <h4 className="font-bold mb-3">{data.title}</h4>
          <p className="text-xs">{descriptionSlice}</p>
        </header>
        <Button size="sm" className="w-[5rem]">
          Details
        </Button>
      </main>
    </article>
  );
};
