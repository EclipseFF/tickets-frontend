import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import IndexBanner from "@/components/index-banner";

export default function IndexSlider() {
    return (
        <div className="w-[1130px] pb-6">
            <Carousel>
                <CarouselContent>
                    <CarouselItem>
                        <IndexBanner />
                    </CarouselItem>
                    <CarouselItem>
                        <IndexBanner />
                    </CarouselItem>
                    <CarouselItem>
                        <IndexBanner />
                    </CarouselItem>
                </CarouselContent>
                <CarouselPrevious/>
                <CarouselNext/>
            </Carousel>
        </div>
    );
}