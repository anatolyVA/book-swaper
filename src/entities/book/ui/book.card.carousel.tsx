"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/shared/ui/carousel";
import React from "react";
import { cn } from "@/shared/lib/utils";
import Link from "next/link";

interface BookCardCarouselProps {
  className?: string;
  href: string;
}

export const BookCardCarousel = ({
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

  return (
    <Link href={href} className="relative">
      <Carousel setApi={setApi}>
        <CarouselContent className={cn("h-72 flex-1", className)}>
          <CarouselItem className="flex bg-primary/20 items-center justify-center">
            Img
          </CarouselItem>
          <CarouselItem className="flex bg-primary/15 items-center justify-center">
            Img
          </CarouselItem>
          <CarouselItem className="flex bg-primary/10 items-center justify-center">
            Img
          </CarouselItem>
        </CarouselContent>
      </Carousel>
      <div className="py-1 text-center absolute bottom-2 right-4 space-x-0.5">
        {count.map((i, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full",
              current === index ? "bg-primary" : "bg-primary/30",
            )}
            onClick={(e) => {
              e.preventDefault();
              api?.scrollTo(index);
            }}
          ></button>
        ))}
      </div>
    </Link>
  );
};
