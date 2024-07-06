import { Carousel, CarouselContent, CarouselItem } from "@/shared/ui/carousel";

export const BookCardCarousel = () => {
  return (
    <Carousel className="">
      <CarouselContent className="">
        <CarouselItem className="flex h-[220px] bg-orange-200 items-center justify-center">
          Img
        </CarouselItem>
        <CarouselItem className="flex h-[220px] bg-orange-200 items-center justify-center">
          Img
        </CarouselItem>
        <CarouselItem className="flex h-[220px] bg-orange-200 items-center justify-center">
          Img
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
};
