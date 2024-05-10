import Link from "next/link";
import Image from "next/image";
import {cinemas} from "@/lib/mock-data";
import CinemaCard from "@/components/cards/cinema-card";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";

export default function CinemaList() {
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <p className="text-3xl font-bold">
                    Кино
                </p>
                <div>
                    <Link href="/cinema" className="flex content-center">
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
                            {cinemas.map((cinema) => (
                                <CarouselItem key={cinema.id} className="basis-[1/7]">
                                    <CinemaCard {...cinema}/>
                                </CarouselItem>
                            ))}
                    </CarouselContent>
                    <CarouselPrevious/>
                    <CarouselNext/>
                </Carousel>
            </div>
        </div>
    )
}