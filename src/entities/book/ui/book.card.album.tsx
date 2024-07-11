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
        className={`w-full flex justify-center items-center gap-2 ${image === item ? "bg-[rgba(255,255,255,.8)]" : "bg-white"} text-black`}
        onClick={onSwapAlbum}
      >
        {item}
      </button>
    );
  });
  return (
    <div className={cn("min-h-[25rem]", className)}>
      <div className="min-h-[320px] w-full 795:min-w-[25rem] flex justify-center items-center bg-white text-black mb-4">
        {image}
      </div>
      <div className="flex gap-1 h-[5rem]">{buttons}</div>
    </div>
  );
}
