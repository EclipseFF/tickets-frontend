"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";
import {useEffect, useState} from "react";
import getEventTypes from "@/actions/event/get-types";
import {EventType} from "@/lib/data";

const Links = [
    {
        name: "Все",
        href: "/",
    },
    {
        name: "Кино",
        href: "/cinema",
    },
    {
        name: "Концерты",
        href: "/concerts",
    },
    {
        name: "Театр",
        href: "/theatre",
    },
    {
        name: "Спорт",
        href: "/sport",
    }
]

export default function NavLinks() {
    const pathname = usePathname()
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);

    useEffect(()=>{
        getEventTypes().then(types => {
            setEventTypes(types)
        })
    }, [])

    if (pathname === '/profile') return null
    return (
        <div className="flex gap-4">

            <Link href={'/'}>
                <p className={clsx("font-bold text-base", pathname === '/' ? "text-white bg-primaryGreen" : "text-primaryText",
                    "min-w-24 w-fit  h-12 rounded-md m-auto flex justify-center items-center font-extrabold text-lg")}>
                    &#160;Главная&#160;
                </p>
            </Link>

            {eventTypes.map((link) => (
                link.name && link.translatedName ?
                <Link key={link.name} href={link.translatedName}>
                    <p className={clsx("font-bold text-base", pathname === '/' + link.translatedName ? "text-white bg-primaryGreen" : "text-primaryText",
                        "min-w-24 w-fit  h-12 rounded-md m-auto flex justify-center items-center font-extrabold text-lg")}>
                        &#160;{link.name}&#160;
                    </p>
                </Link> : null
            ))}
        </div>
    )
}