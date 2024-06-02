'use client'

import {EventType} from "@/lib/data";
import {useEffect, useLayoutEffect, useState} from "react";
import getEventTypes from "@/actions/event/get-types";
import ListEvents from "@/components/list-events";

export default function IndexLists() {
    const [types, setTypes] = useState<EventType[]>([]);
    useEffect(() => {
        getEventTypes().then((res) => {
            setTypes(res)
        })
    }, []);

    return (
        <div className="pt-2">
            {types && types.map((type) => (
                <div key={type.name}>
                    <p className="text-3xl px-2 pt-10 font-bold ">{type.name}</p>
                    <ListEvents type={type} />
                </div>
            ))}
        </div>
    )
}