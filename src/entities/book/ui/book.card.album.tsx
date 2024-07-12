"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn } from "@/shared/lib/utils";

interface BookCardAlbumProps {
  className?: string;
}

const images: string[] = ["img 1", "img 2", "img 3", "img 4", "img 5"]; //это потом на удаление

export function AlbumCard({ className }: BookCardAlbumProps) {
  const [image, setImage] = useState(images[0]);
  const onSwapAlbum = (e: React.MouseEvent<HTMLButtonElement>) => {
    setImage(e.currentTarget.name);
  };
  // изза цикла(ебаного) при клике на картинки они рефрешаются сразу все. так что тут уже надо или стэйт создовать с датой, или просто изменить логику
  const buttons = images.map((item) => {
    return (
      <button
        name={item}
        className={cn(
          "w-full rounded-md flex justify-center items-center gap-2 bg-primary/40 text-black transition hover:opacity-80",
          image === item && "opacity-80",
        )}
        onClick={onSwapAlbum}
      >
        {item}
      </button>
    );
  });
  return (
    <div className={cn("min-h-[25rem]", className)}>
      <div className="min-h-[320px] rounded-md w-full lg:min-w-[25rem] flex justify-center items-center bg-primary/40 text-black mb-2">
        {image}
      </div>
      <div className="grid gap-1 grid-cols-5 h-[5rem]">{buttons}</div>
    </div>
  );
}
