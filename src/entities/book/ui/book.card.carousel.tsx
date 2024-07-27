"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/shared/ui/carousel";
import React, { DragEventHandler, useCallback } from "react";
import { cn, convertPathToUrl } from "@/shared/lib/utils";
import Link from "next/link";
import { BookImage } from "@/entities/book";
import Image from "next/image";
import { throttle } from "lodash";

interface BookCardCarouselProps {
  data: BookImage[];
  className?: string;
  href: string;
}

export const BookCardCarousel = ({
  data,
  className,
  href,
}: BookCardCarouselProps) => {
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState<number[]>([]);
  const [api, setApi] = React.useState<CarouselApi>();

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const handleZoneMouseMove = (index: number) => {
    if (!api || index === current || count.length === 1) {
      return;
    }
    api.scrollTo(index);
  };
  return (
    <div className="flex flex-col gap-1">
      <Link href={href} className="flex-1 group relative">
        <Carousel setApi={setApi}>
          <CarouselContent className={cn("h-[16rem] flex-1", className)}>
            {data.map((image) => (
              <CarouselItem key={image.id} className="relative bg-muted/40">
                <Image
                  src={convertPathToUrl(image.path)}
                  alt={image.id}
                  fill
                  sizes="16rem"
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="absolute w-full bottom-0 hidden group-hover:flex justify-center h-full">
          {count.length > 1 &&
            count.map((i, index) => (
              <div
                className="h-full w-full px-0.5 pb-2 first:pl-3 last:pr-3 items-end flex"
                onMouseOver={() => handleZoneMouseMove(index)}
                key={index}
              >
                <button
                  key={index}
                  className={cn(
                    "w-full h-1.5 rounded-full",
                    current === index ? "bg-primary" : "bg-primary/30",
                  )}
                  onClick={(e) => {
                    e.preventDefault();
                    api?.scrollTo(index);
                  }}
                ></button>
              </div>
            ))}
        </div>
      </Link>
    </div>
  );
};
