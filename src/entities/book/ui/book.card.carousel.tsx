"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import React from "react";
import { cn } from "@/shared/lib/utils";

interface BookCardCarouselProps {
  className?: string;
}

export const BookCardCarousel = ({ className }: BookCardCarouselProps) => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel setApi={setApi}>
      <CarouselContent className={cn("min-h-[320px] flex-1", className)}>
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
  );
};
