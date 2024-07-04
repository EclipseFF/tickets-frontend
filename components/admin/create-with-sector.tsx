'use client'

import {useEffect, useState} from "react";
import {Venue} from "@/lib/data";
import GetVenueById from "@/actions/venues/get-by-id";
import {Button} from "@/components/ui/button";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import CreateSector from "@/components/admin/create-sector";

export default  function CreateWithSector({eventId, venueId}: {eventId: number, venueId: number}) {
    const [venue, setVenue] = useState<Venue>({} as Venue)
    const [createSector, setCreateSector] = useState(false)
    useEffect(() => {
        GetVenueById(venueId).then((data) => setVenue(data));
    }, []);
    return (
        <div>
            <p>{venue.name}</p>
            <p>
                Создать сектора?
            </p>

            {!createSector && <Button onClick={() => setCreateSector(true)}>Да</Button>}
            {createSector && <Button onClick={() => setCreateSector(false)} variant="destructive">Удалить сектора</Button>}
            {createSector && (
                <CreateSector eventId={eventId} venueId={venue.id || 0} />
            )}
        </div>
    )
}