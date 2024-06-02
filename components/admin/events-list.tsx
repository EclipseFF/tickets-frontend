'use client'

import {useEffect, useState} from "react";
import getEventsPage from "@/actions/event/get-page";
import EventCardExpanded from "@/components/event-card-expanded";

type Props = {
    page?: number
}

export default function EventsList({page = 0}: Props) {
    const [events, setEvents] = useState<EventInterface[]>([])
    useEffect(() => {
        getEventsPage(page).then(res => {
            setEvents(res.events)
        })
    }, [])

    return (
        <div className="border p-4">
            {events && events.map((event) => (
                <div key={event.id}>
                    <EventCardExpanded Event={event} />
                </div>
            ))}
        </div>
    )
}