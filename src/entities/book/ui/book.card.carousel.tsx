import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/shared/ui/carousel";
import React from "react";

export const BookCardCarousel = () => {
  const [api, setApi] = React.useState<CarouselApi>();

  return (
    <Carousel className="" setApi={setApi}>
      <CarouselContent className="">
        <CarouselItem className="flex h-[320px] bg-gray-900 items-center justify-center">
          Img
        </CarouselItem>
        <CarouselItem className="flex h-[320px] bg-gray-800 items-center justify-center">
          Img
        </CarouselItem>
        <CarouselItem className="flex h-[320px] bg-gray-700 items-center justify-center">
          Img
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
