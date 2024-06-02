import Link from "next/link";
import Image from "next/image";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {others, theaters} from "@/lib/mock-data";
import OtherCard from "@/components/cards/other-card";

export default function OtherList() {
    return (
        <div className="pt-8">
            <div className="flex justify-between">
                <p className="text-3xl font-bold">
                    Другие события
                </p>
                <div>
                    <Link href="/theater" className="flex content-center">
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
                        {others.map((other) => (
                            <CarouselItem key={other.id} className="basis-[1/7]">
                                <OtherCard {...other}/>
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