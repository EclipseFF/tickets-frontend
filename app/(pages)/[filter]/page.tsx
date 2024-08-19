'use client'

import {Button} from "@/components/ui/button";
import Image from "next/image";
import FilteredContent from "@/components/filtered-content";
import getEventTypes from "@/actions/event/get-types";
import {useEffect, useLayoutEffect, useState} from "react";
import getEventType from "@/actions/event/get-type";
import {useRouter} from "next/navigation";
import {EventType} from "@/lib/data";

export default function Page({ params }: { params: { filter: string } }) {
    const router = useRouter();
    const [eventType, setEventType] = useState<EventType>();
    useLayoutEffect(() => {
        getEventType(params.filter).then(type => {
            if (!type) router.replace('/')
            setEventType(type);
        })
    }, []);
    return (
        <div className="lg:w-[1152px]">
            <h1 className="text-3xl font-bold lg:pt-5 lg:pb-3 pl-3">
                {eventType?.name}
            </h1>

            <FilteredContent id={eventType?.id} name={eventType?.name} translatedName={eventType?.translatedName} />
        </div>
    )
}