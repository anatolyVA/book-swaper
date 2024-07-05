import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shared/ui/carousel"

export const BookCarousel = () => {
    return (
        <Carousel className="">
            <CarouselContent className="">
                <CarouselItem className="h-[220px] bg-orange-200">1</CarouselItem>
                <CarouselItem className="h-[220px] bg-orange-100">2</CarouselItem>
                <CarouselItem className="h-[220px] bg-orange-50">3</CarouselItem>
            </CarouselContent>
        </Carousel>
    )
}

