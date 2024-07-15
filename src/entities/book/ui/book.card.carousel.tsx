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
import { cn, convertPathToUrl } from "@/shared/lib/utils";
import Link from "next/link";
import { BookImage } from "@/entities/book";
import Image from "next/image";
import { WheelGesturesPlugin } from "embla-carousel-wheel-gestures";
import { Card, CardContent } from "@/shared/ui/card";

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
    console.log(data);

    setCount(api.scrollSnapList());
    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="flex flex-col gap-1">
      <Link href={href} className="flex-1">
        <Carousel
          setApi={setApi}
          plugins={[
            WheelGesturesPlugin({
              forceWheelAxis: "y",
            }),
          ]}
        >
          <CarouselContent className={cn("h-[24rem] flex-1", className)}>
            {data.map((image) => (
              <CarouselItem
                key={image.id}
                className="relative bg-secondary dark:bg-secondary/20"
              >
                <Image
                  src={convertPathToUrl(image.path)}
                  alt={image.id}
                  fill
                  className="object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </Link>
      <div className="flex gap-0.5 justify-center mt-1">
        {count.length > 1 &&
          count.map((i, index) => (
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
    </div>
  );
};
