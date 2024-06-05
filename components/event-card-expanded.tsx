import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import {Card, CardContent} from "@/components/ui/card";
import {useEffect, useState} from "react";
import getEventImages from "@/actions/event/get-images";
import Image from "next/image";
import {staticUrl, url} from "@/lib/api";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {EventImages, EventInterface} from "@/lib/data";

type Props = {
    Event: EventInterface
}

export default function EventCardExpanded({Event}: Props) {
    const [images, setImages] = useState<EventImages>()
    useEffect(() => {
        getEventImages(Event.id).then((res) => {
            setImages(res)
        })
    }, [])
    return (
        <div className="rounded shadow">
            {Event && (
                <div className="grid grid-cols-4">
                    <div className="col-span-1 px-14">
                        {images && images.posters && images.posters.length > 0 && (
                            <Carousel className="w-full max-w-xs">
                                <CarouselContent>
                                    {images.posters.map((poster, index) => (
                                        <CarouselItem key={index}>
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-ratio-3/4 items-center justify-center p-6">
                                                        <Image src={`${staticUrl}/${Event.id}/${poster}`} alt={'Постеры'} width={400} height={200}/>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                                <p className="text-center">
                                    Постеры к событию
                                </p>
                            </Carousel>

                        )}
                    </div>
                    <div className="col-span-3">
                        <h1>{Event.title}</h1>
                        <p>{Event.briefDesc}</p>
                        <Link href={'/admin-panel/events/' + Event.id}>
                            <Button type="button" variant="green">Редактровать/Удалить</Button>
                        </Link>
                    </div>
                </div>
            )}

        </div>
    )
}