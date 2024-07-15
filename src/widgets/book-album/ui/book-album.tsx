"use client";

import React from "react";
import { AlbumCard } from "@/entities/book/ui/book.card.album";
import { CreateSwapButton, CreateSwapModal } from "@/features/swap/create";
import { Button } from "@/shared/ui/button";
import { DeleteBookButton } from "@/features/book/delete";
import { Book } from "@/entities/book";
import { useProfile } from "@/entities/user";

export function BookAlbum({ data }: { data: Book }) {
  const profile = useProfile((state) => state.profile);

  return (
    <section className="mb-4 lg:mr-10 w-full sm:w-[404px] lg:w-auto m-auto lg:m-0">
      <AlbumCard className="" data={data.images} />
      <div className="grid grid-cols-2 gap-2 mt-4 ">
        {profile && profile.id === data.ownerId ? (
          <>
            <Button variant="secondary">Edit</Button>
            <DeleteBookButton bookId={data.id} />
          </>
        ) : (
          <CreateSwapModal
            trigger={<CreateSwapButton className="col-span-2" />}
            triggerAsChild
            requestedBook={data}
          />
        )}
      </div>
    </section>
  );
}
