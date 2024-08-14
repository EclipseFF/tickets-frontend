import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import IndexBanner from "@/components/index-banner";
import GetLatestNews from "@/actions/news/get-latest";

export default async function IndexNews() {
    const news = await GetLatestNews()

    return (
        <div className="lg:w-[1130px] pb-6">
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
                <CarouselPrevious className="hidden lg:inline-flex" />
                <CarouselNext className="hidden lg:inline-flex" />
            </Carousel>
        </div>
    );
}