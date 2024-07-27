"use client";

import React, { useState } from "react";
import Image from "next/image";
import { cn, convertPathToUrl } from "@/shared/lib/utils";
import { BookImage } from "@/entities/book";

interface BookCardAlbumProps {
  className?: string;
  data: BookImage[];
}

export function AlbumCard({ className, data }: BookCardAlbumProps) {
  const previewImageId = data.find((value) => value.isPreview)?.id;

  const [image, setImage] = useState(previewImageId || data[0].id);
  const onSwapAlbum = (e: React.MouseEvent<HTMLButtonElement>) => {
    setImage(e.currentTarget.name);
  };
  // изза цикла(ебаного) при клике на картинки они рефрешаются сразу все. так что тут уже надо или стэйт создовать с датой, или просто изменить логику
  // А слабо было блять key поставить чтобы оно всё не рефрешилось?
  const buttons = data.map((item) => {
    return (
      <button
        key={item.id}
        name={item.id}
        className={cn(
          "relative w-full rounded-md overflow-hidden flex justify-center items-center gap-2 bg-secondary dark:bg-secondary/20 text-black transition hover:opacity-80",
          image === item.id && "opacity-80",
        )}
        onClick={onSwapAlbum}
      >
        <Image
          src={convertPathToUrl(item.path)}
          alt={item.id}
          fill
          className="object-contain"
        />
      </button>
    );
  });

  const currentImage = data.find((item) => item.id === image);

  return (
    <div className={cn("flex flex-col-reverse lg:flex-row gap-2", className)}>
      {data.length > 1 && (
        <div className="grid grid-cols-5 lg:grid-cols-1 lg:grid-rows-5 gap-2 w-full lg:w-[8rem] min-h-[4rem]">
          {buttons}
        </div>
      )}
      <div className="relative h-[30rem] overflow-hidden rounded-md w-full lg:min-w-[25rem] flex justify-center items-center bg-secondary dark:bg-secondary/20 text-black mb-2">
        <Image
          src={convertPathToUrl(currentImage?.path || "")}
          alt={currentImage?.id || ""}
          className="object-contain"
          fill
        />
      </div>
    </div>
  );
}
