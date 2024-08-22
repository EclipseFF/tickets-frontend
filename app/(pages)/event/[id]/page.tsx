'use client'

import Event from "@/components/event";
import {redirect} from "next/navigation";
import {useEffect, useLayoutEffect, useState} from "react";
import {EventDay, EventImages, EventInterface, TicketTypeForClient, Venue} from "@/lib/data";
import getEventById from "@/actions/event/get-by-id";
import getEventImages from "@/actions/event/get-images";
import Image from "next/image";
import {apiUrl} from "@/lib/api";
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
import VenuesList from "@/components/venues-list";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import GetTicketTypesForDateNoShah from "@/actions/ticket/get-types-for-date";
import GetDatesForVenueNoShah from "@/actions/ticket/get-dates-for-venue";
import {Input} from "@/components/ui/input";
import BuyTickets from "@/actions/ticket/buy-tickets";
import getSession from "@/actions/auth/session";
import {register} from "@/actions/auth/register";
import GetDatesVenueShah from "@/actions/ticket/get-dates-venue-shah";
import {Seat} from "@/components/admin/shahmatka";



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
    const [dates, setDates] = useState<EventDay[]>([])
    const [datesShah, setDatesShah] = useState<Seat[]>([])
    const [selectedDate, setSelectedDate] = useState<EventDay>()
    const [selectedShahDate, setSelectedShahDate] = useState<Date>()
    const [selectedType, setSelectedType] = useState<TicketTypeForClient>()
    const [ticketCount, setTicketCount] = useState<number>(0)
    const [session, setSession] = useState<string>('')

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
                const temp = {original: `${apiUrl}/api/v1/static/${id}/${img}`}
                setImages([...images, temp])
            })
        })
        GetVenuesByEvent(id).then(res => {
            setVenues(res)
        })

        getSession().then(res => {
            res !== null ? setSession(res) : setSession('')
        })
    }, [id])

    editor?.commands.setContent(JSON.parse(event?.description || '{"type":"doc","content":[{"type":"paragraph","content":[{"type":"text","text":"Описание"}]}]}'))

    function handlerReg() {
        const phone = (document.getElementById('phone') as HTMLInputElement).value
        const pass = (document.getElementById('pass') as HTMLInputElement).value
        register({email: '', password: pass, phone: phone}).then(res => {
            if (res === "success") {
                getSession().then(res => {
                    res !== null ? setSession(res) : setSession('')
                })
            }
        })
    }


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

            {image?.posters && image.posters.length > 0 && (
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
                event?.venues && event.venues.length > 0 && (
                    event.venues.map((venue) => (
                        <div key={venue.id} className="flex justify-center gap-5 items-center">
                            <p>{venue.name}</p>
                            <p>{venue.location}</p>
                            <div className="text-white bg-primaryGreen rounded-md p-2 px-6 font-bold text-base" onClick={() => {
                                GetDatesForVenueNoShah(venue?.id, event?.id).then((dates) => {
                                    setDates(dates);
                                })

                                GetDatesVenueShah(venue?.id, event?.id).then((dates) => {
                                    setDatesShah(dates);
                                })
                            }}>
                                <Dialog>
                                    <DialogTrigger>Купить</DialogTrigger>
                                    <DialogContent>
                                        <DialogHeader>
                                            <DialogTitle>Покупка билетов</DialogTitle>
                                            <DialogDescription>

                                                {
                                                    session === "" && (
                                                        <span className="block">
                                                            Введите номер телефона и пароль для регистрации
                                                            <Input type="text" id="phone" placeholder="Номер телефона"></Input>
                                                            <Input type="password" id="pass" placeholder="Пароль"></Input>
                                                            <Button variant={'green'} onClick={() => handlerReg()}>Далее</Button>
                                                        </span>

                                                    )
                                                }

                                                {!selectedDate && session !== "" &&

                                                    dates.map((date) => (
                                                    <span className="block" key={date.id} onClick={() => setSelectedDate(date)}>
                                                        {date.date}
                                                    </span>
                                                ))}


                                                {datesShah && session !== ""  && (
                                                    (getUniqueSeatsByDate(datesShah).map((date) => (
                                                        <span className="block" key={date.id} onClick={() => setSelectedShahDate(date.date)}>
                                                            {date.date?.toString()}
                                                        </span>
                                                    )))
                                                )}

                                                {
                                                    selectedShahDate && session !== "" && (
                                                        <div className=" border shadow min-w-[200px] w-full min-h-[200px] h-full overflow-auto">
                                                            {
                                                                datesShah.map((seat) => (
                                                                    <div className="block text-black" key={seat.id}>
                                                                        {
                                                                            <div
                                                                                className={`absolute w-7 m-1 h-7 rounded border text-center text-clip overflow-hidden`}
                                                                                style={{
                                                                                    left: `${seat.left + 25}px`,
                                                                                    top: `${seat.top}px`,
                                                                                    backgroundColor: seat.bgColor,
                                                                                    color: seat.textColor
                                                                                }}
                                                                            >
                                                                                <div>
                                                                                    {seat.num}
                                                                                </div>
                                                                            </div>
                                                                        }
                                                                    </div>
                                                                ))
                                                            }
                                                        </div>
                                                    )
                                                }

                                                {
                                                    selectedDate && !selectedType && session !== "" && (
                                                        <span className="block">

                                                            Выберите тип билета
                                                            {selectedDate.types && selectedDate.types.map((type) => (
                                                                <span className="block" key={type.id} onClick={() => {
                                                                    setSelectedType(type)
                                                                }
                                                                }>
                                                                    {type.name}
                                                                </span>
                                                            ))}
                                                        </span>
                                                    )
                                                }

                                                {
                                                    selectedType && session !== "" && selectedDate && (
                                                        <span>
                                                            <Input type="number"
                                                                   placeholder="Сколько билетов вы хотите купить?"
                                                                   onInput={(e) => setTicketCount(parseInt(e.currentTarget.value))}></Input>
                                                            <Button variant={'green'} onClick={() => {
                                                                getSession().then((session) => {
                                                                    if (session) {
                                                                        BuyTickets(session, venue?.id, event?.id, selectedType.id, ticketCount).then((data) => {
                                                                            if (data) {
                                                                                window.location.reload();
                                                                            }
                                                                        })
                                                                    } else {
                                                                        console.log("no session")
                                                                    }
                                                                })

                                                            }}>Оформить</Button>
                                                        </span>
                                                    )
                                                }
                                            </DialogDescription>
                                        </DialogHeader>
                                    </DialogContent>
                                </Dialog>
                            </div>

                        </div>
                    ))
                )
            }
        </div>
    )
}

function getUniqueSeatsByDate(seats: Seat[]): Seat[] {
    const uniqueDates = new Set<number>(); // Use a Set to track unique dates
    const uniqueSeats: Seat[] = [];

    for (const seat of seats) {
        if (seat.date !== undefined) {
            const dateKey = seat.date.getTime();

            if (!uniqueDates.has(dateKey)) {
                uniqueDates.add(dateKey);
                uniqueSeats.push(seat);
            }
        }
    }

    return uniqueSeats;
}