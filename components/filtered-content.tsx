'use client'

import {useEffect, useLayoutEffect, useState} from "react";
import {url} from "@/lib/api";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import {EventInterface, EventType} from "@/lib/data";
import getEventByTypePage from "@/actions/event/get-type-page";
import {useSearchParams} from "next/navigation";
import EventCard from "@/components/event-card";


export default function FilteredContent({id, name, translatedName}: EventType) {
    const [content, setContent] = useState<EventInterface[]>([])
    const [isFilterOpened, setIsFilterOpened] = useState(false)
    const page = parseInt(useSearchParams().get("page") || "1")
    useLayoutEffect(() => {
        getEventByTypePage(translatedName, page).then(data => {
            setContent(data)
        })
    }, [page, translatedName])

    return (
        <div>
            <div className="flex pt-2 lg:pt-5 pb-1 lg:pb-5">
                <div className="lg:w-1/2 flex">
                    <Image src="/icons/search.svg" alt="Поиск" width={16} height={16} className="relative left-6"/>
                    <input
                        className="bg-[#F5F5F5] w-full p-3 px-6 text-base font-light rounded-2xl focus:outline-primaryGreen focus:caret-primaryGreen"
                        placeholder="Фильмы, кинотеатры, новости"/>
                </div>
                <div className="flex gap-1 px-2 items-center">
                    <Button variant={"ghost"} onClick={() => setIsFilterOpened(!isFilterOpened)}>
                        <Image src="/icons/filter.svg" alt="Фильтры" width={28} height={28}/>
                        <p className="text-lg font-extrabold">
                            Фильтры
                        </p>
                    </Button>
                </div>
            </div>
            {isFilterOpened && "1asd"}
            <div className="grid grid-cols-1 lg:grid-cols-7 w-4/5 mx-auto">
                {
                    content && content.length > 0 && typeof content !== "string" &&(
                        content.map((e) => (
                            <EventCard key={e.id} event={e}/>
                        ))
                    )

                }
            </div>
        </div>
    )
}