'use client'

import {EventInterface, EventType} from "@/lib/data";
import {types} from "node:util";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {cinemas} from "@/lib/mock-data";
import CinemaCard from "@/components/cards/cinema-card";
import {useEffect, useState} from "react";
import getEventByTypePage from "@/actions/event/get-type-page";
import EventCard from "@/components/event-card";
import getEventImages from "@/actions/event/get-images";
import Link from "next/link";

export default function ListEvents({type}: {type: EventType}) {
    const [events, setEvents] = useState<EventInterface[]>([])

    useEffect(() => {
        getEventByTypePage(type.translatedName, 1).then((res) => {
            setEvents(res)
        })
    }, []);
    return (
        <div className="lg:w-[1152px]">
            {events && (
                <Carousel className="px-2 ">
                    <CarouselContent>
                        {events.map((event) => (
                            <CarouselItem key={event.id} className="basis-[1/7]">
                                <Link href={'/event/' + event.id}>
                                    <EventCard event={event}/>
                                </Link>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="hidden lg:inline-flex"/>
                    <CarouselNext className="hidden lg:inline-flex"/>
                </Carousel>
            )}
        </div>
    )
}