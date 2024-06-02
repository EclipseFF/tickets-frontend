'use client'

import {EventImages, EventInterface} from "@/lib/data";
import {useEffect, useState} from "react";
import getEventById from "@/actions/event/get-by-id";
import Image from "next/image";
import getEventImages from "@/actions/event/get-images";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {staticUrl, url} from "@/lib/api";

export default function Event({id}: {id: number}) {
    const [event, setEvent] = useState<EventInterface>()
    const [image, setImage] = useState<EventImages>()
    useEffect(() => {
        getEventById(id).then(res => {
            setEvent(res)
        })
        getEventImages(id).then(res => {
            setImage(res)
        })
    }, [id])

    return (
        <div className="grid grid-cols-1 lg:grid-cols-5">
            <div className="col-span-1 block">
                <Carousel>
                    <CarouselContent>
                        {image?.main_images.map((img) => (
                            <CarouselItem key={img}>
                                <Image src={`${staticUrl}/${id}/${img}`} alt={event?.title || ''} width={400}
                                           height={200}/>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel>
            </div>
            <div className="col-span-3">
                <h1>
                    {event?.title}
                </h1>
            </div>
            <div className="col-span-1">

            </div>
        </div>
    )
}