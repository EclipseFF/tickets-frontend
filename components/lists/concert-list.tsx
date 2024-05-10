import Link from "next/link";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {concerts} from "@/lib/mock-data";
import CinemaCard from "@/components/cards/cinema-card";
import TheaterCard from "@/components/cards/theater-card";
import ConcertCard from "@/components/cards/concert-card";

export default function ConcertList() {
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <p className="text-3xl font-bold">
                    Концерты
                </p>
                <div>
                    <Link href="/concert" className="flex content-center">
                        <p className="text-base font-extrabold text-primaryGreen">
                            Все {" 33"}
                        </p>
                        <Image src="/icons/arrow-right.svg" alt="Все результаты" width={6} height={11}/>
                    </Link>
                </div>
            </div>
            <div className="lg:w-[1152px]">
                <Carousel>
                    <CarouselContent>
                        {concerts.map((concert) => (
                            <CarouselItem key={concert.id} className="basis-[1/7]">
                                <ConcertCard {...concert}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </div>
    );
}