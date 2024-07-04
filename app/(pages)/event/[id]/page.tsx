'use client'

import Event from "@/components/event";
import {redirect} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import {EventImages, EventInterface, Venue} from "@/lib/data";
import getEventById from "@/actions/event/get-by-id";
import getEventImages from "@/actions/event/get-images";
import Image from "next/image";
import {apiUrl, url} from "@/lib/api";
import {Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious} from "@/components/ui/carousel";
import { useEditor, EditorContent } from '@tiptap/react'
import {StarterKit} from "@tiptap/starter-kit";
import {json} from "node:stream/consumers";
import {clsx} from "clsx";
import ImageGallery from "react-image-gallery";
import {Button} from "@/components/ui/button";
import GetVenuesByEvent from "@/actions/venues/get-by-event";
import Link from "next/link";
import {extractTime, formatDateToRussian} from "@/lib/utils";



export default function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params.id)
    if (isNaN(id)) {
        redirect('/')
    }
    const [event, setEvent] = useState<EventInterface>()
    const [image, setImage] = useState<EventImages>()
    const [venues, setVenues] = useState<Venue[]>([])
    const [isLoaded, setIsLoaded] = useState(false)
    const [images, setImages] = useState<any[]>([])
    const editor = useEditor({
        extensions: [
            StarterKit,
        ],
        editable: false,
        content: '<p>Описание</p>',
        editorProps: {
            attributes: {
                class: 'prose text',
            }
        }
    },);

    useEffect(() => {
        getEventById(id).then(res => {
            setEvent(res)
        })
        getEventImages(id).then(res => {
            setImage(res)
            res.posters.forEach((img:string) => {
                const temp = {original: `${url}/api/v1/static/${id}/${img}`}
                console.log(temp)
                setImages([...images, temp])
            })
        })
        GetVenuesByEvent(id).then(res => {
            setVenues(res)
        })

    }, [id])

    editor?.commands.setContent(JSON.parse(event?.description || '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Описание"}]}]}'))

    return (
        <div>
            <div className="grid grid-cols-1 lg:grid-cols-7 lg:w-[1152px] pt-5 lg:pt-10">
                <div className="col-span-2 mx-5 ">
                    <Carousel className="pl-2">
                        <CarouselContent>
                            {image?.main_images.map((img) => (
                                <CarouselItem key={img} className="pl-2">
                                    <Image src={`${apiUrl}/api/v1/static/${id}/${img}`} alt={event?.title || ''}
                                           width={350}
                                           height={490}
                                           className="p-1"
                                    />
                                </CarouselItem>
                            ))}
                        </CarouselContent>
                    </Carousel>
                </div>
                <div className="col-span-3 pl-3">
                    <h1 className="font-semibold text-xl lg:text-4xl">
                        {event?.title}
                    </h1>
                    <div>
                        {event?.description && (
                            <div>
                                <p className="text-base font-normal text-secondaryText pt-2">
                                    Описание
                                </p>
                                <EditorContent editor={editor}/>
                            </div>
                        )}

                    </div>
                </div>
                <div className="col-span-1 pl-3">
                    {event?.venues && event.venues.length > 0 && (
                        <div className="max-h-[120px]">
                            <p className="text-base font-normal text-secondaryText pt-2">
                                Места проведения
                            </p>
                            <div className="text-base font-normal text-secondaryText">
                                {event.venues.map((venue) => (
                                    <div key={venue.id}>
                                        <p className="text-base font-normal text-primaryText">
                                            {venue.name}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {event?.startTime && (
                        <div>
                            <p className="text-base font-normal text-secondaryText pt-2">
                                Дата проведения
                            </p>
                            <p className="text-base font-normal text-primaryText">
                                { formatDateToRussian(event.startTime.toString())}
                            </p>
                            <p className="text-base font-normal text-secondaryText">
                                Начало
                            </p>
                            <p className="text-base font-normal text-primaryText">
                                { extractTime(event.startTime.toString()) }
                            </p>
                            {event?.duration && (
                                <>
                                    <p className="text-base font-normal text-secondaryText">
                                        Длительность
                                    </p>
                                    <p className="text-base font-normal text-primaryText">
                                        {event.duration}
                                    </p>
                                </>
                            )}
                        </div>
                    )}
                </div>
                <div className="col-span-1">
                    {event?.genres && event.genres.length > 0 && (
                        <div className="max-h-[120px]">
                            <p className="text-base font-normal text-secondaryText pt-2">
                                Жанр
                            </p>
                            <div className="text-base font-normal text-secondaryText">
                                {event.genres.map((genre) => (
                                    <div key={genre}>
                                        <p className="text-base font-normal text-primaryText">
                                            {genre}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(event?.ageRestriction && event.ageRestriction > -1 )&& (
                        <div>
                            <p className="text-base font-normal text-secondaryText pt-2 ">
                                Возрастное ограничение
                            </p>
                            <p className={clsx("w-10 h-10 text-center pt-2", "text-white font-semibold text-base rounded-full", event.ageRestriction < 1 && "bg-primaryGreen", event.ageRestriction >= 1 && event.ageRestriction < 15 && "bg-[#F5BC41]", event.ageRestriction >= 15 && "bg-[#F5BC41]")}>
                                {event.ageRestriction}+
                            </p>
                        </div>
                    )}
                </div>
            </div>

            <div className="pt-4 lg:pt-10 flex items-center justify-center">
                <Link href={'#venue'}>
                    <Button variant={'green'} className="mx-auto text-white font-bold text-base">Купить билет</Button>
                </Link>
            </div>

            {image?.posters && (
                <div className="pt-7 p-3 w-4/5 max-w-[1152px]">
                    <h1 className="text-2xl font-semibold">
                        Галерея
                    </h1>
                    <ImageGallery items={images} lazyLoad={false} />
                </div>
            )}
            <p id="venue" className="text-2xl font-semibold">
                Места проведения
            </p>
            {

            }
        </div>
    )
}