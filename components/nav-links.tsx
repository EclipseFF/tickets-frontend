"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import {useEffect, useState} from "react";
import getEventTypes from "@/actions/event/get-types";
import {EventType} from "@/lib/data";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";


export default function NavLinks() {
    const pathname = usePathname()
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);

    useEffect(()=>{
        getEventTypes().then(types => {
            setEventTypes(types)
        })
    }, [])

    if (pathname === '/profile') return null
    return (
        <div>
            <Carousel opts={{loop: true}}>
                <CarouselContent>
                    <CarouselItem className="basis-1/7">
                        <Link href={'/'}>
                            <p className={clsx("font-bold text-base", pathname === '/' ? "text-white bg-primaryGreen" : "text-primaryText",
                                "min-w-24 w-fit  h-12 rounded-md m-auto flex justify-center items-center font-extrabold text-lg")}>
                                &#160;Главная&#160;
                            </p>
                        </Link>
                    </CarouselItem>

                        {eventTypes.map((link) => (
                            link.name && link.translatedName ?
                                <CarouselItem key={link.name} className="basis-[1/7]">
                                    <Link href={link.translatedName}>
                                        <p className={clsx("font-bold text-base", pathname === '/' + link.translatedName ? "text-white bg-primaryGreen" : "text-primaryText",
                                            "min-w-24 w-fit  h-12 rounded-md m-auto flex justify-center items-center font-extrabold text-lg")}>
                                            &#160;{link.name}&#160;
                                        </p>
                                    </Link>
                                </CarouselItem>  : null
                        ))}

                </CarouselContent>
            </Carousel>
        </div>
    )
}