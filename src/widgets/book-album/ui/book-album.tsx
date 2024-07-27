"use client";

import React from "react";
import { AlbumCard } from "@/entities/book/ui/book.card.album";
import { Book } from "@/entities/book";

export function BookAlbum({ book }: { book: Book }) {
  return (
    <section className="w-full">
      <AlbumCard className="" data={book.images} />
    </section>
  );
}
