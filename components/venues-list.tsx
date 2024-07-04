'use client'

import {Venue} from "@/lib/data";
import GetVenuesByEvent from "@/actions/venues/get-by-event";
import {useEffect, useState} from "react";
import getVenues from "@/actions/venues/get";
import Link from "next/link";

export default function VenuesList({id}: {id: number}) {
    const [venues, setVenues] = useState<Venue[]>([]);
    useEffect(() => {
        GetVenuesByEvent(id).then(data => setVenues(data))
    }, []);

    return (
        <div>
            {id}

            <div>
                {venues && venues.length > 0 ? (
                    venues.map(venue => (
                        <div key={venue.id}>
                            <Link href={`/admin-panel/events/create/shahmatka/${venue.id}`}>
                                <h1>{venue.name}</h1>
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>
                        <p>Локации не выбраны. Добавить билеты?</p>
                    </div>
                )}
            </div>
        </div>
    )
}