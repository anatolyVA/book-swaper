"use client";

import React from "react";
import { Badge } from "@/shared/ui/badge";
import { BookCardCarousel } from "./book.card.carousel";
import { Button } from "@/shared/ui/button";

export const BookCard = ({}) => {
  const nameDemo: string = "Дурак(сигма)";
  const descriptionDemo: string =
    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A aliquam eum ipsa modi non quam. Amet eveniet id laudantium perferendis?";

  const descriptionSlice: string =
    descriptionDemo.length >= 50
      ? descriptionDemo.slice(0, 50) + "..."
      : descriptionDemo;
  return (
    <article className="rounded-2xl overflow-hidden shadow-lg">
      <BookCardCarousel />
      <div className="p-6 pt-2">
        <div className="mb-2">
          <Badge>Classic</Badge>
        </div>

        <h2 className="font-bold text-lg">{nameDemo}</h2>
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
