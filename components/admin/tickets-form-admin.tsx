'use client'

import {useEffect, useState} from "react";
import {Venue} from "@/lib/data";
import GetVenuesByEvent from "@/actions/venues/get-by-event";
import CreateWithoutSector, {sellDayProps} from "@/components/admin/create-without-sector";
import {Button} from "@/components/ui/button";
import CreateWithSector from "@/components/admin/create-with-sector";
import {useRouter} from "next/navigation";

export function TicketsFormAdmin({eventId}: {eventId: number}) {
    const [venues, setVenues] = useState<Venue[]>([])
    const [isActive, setIsActive] = useState(false)
    const [selectedId, setSelectedId] = useState(-1)
    const router = useRouter()
    useEffect(() => {
        GetVenuesByEvent(eventId).then((data) => setVenues(data));
    }, []);


    return (
        <div className="p-4">
            {venues.length > 0 && (
                venues.map((venue) => (
                    <div key={venue.id} className="p-2 border shadow">
                        <p>{venue.name}</p>
                        {!isActive && (
                            <Button variant="green" onClick={() => {
                                setIsActive(true)
                                setSelectedId(venue.id || -1)
                            }}>Параметры локации</Button>
                        )}
                        {isActive && selectedId === venue.id &&
                            <>
                                <CreateWithoutSector eventId={eventId} venueId={venue.id} />
                                <CreateWithSector eventId={eventId} venueId={venue.id} />
                            </>
                        }
                    </div>
                ))
            )}
            <Button variant="link" onClick={() => router.push('/admin-panel/events')}>
                Завершить
            </Button>
        </div>
    )
}