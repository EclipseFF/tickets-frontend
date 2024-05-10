"use client"
import Link from "next/link";
import {usePathname} from "next/navigation";
import {clsx} from "clsx";

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
    return (
        <div className="flex gap-4">
            {Links.map((link) => (
                <Link key={link.name} href={link.href}>
                    <p className={clsx("font-bold text-base", pathname === link.href ? "text-white bg-primaryGreen" : "text-primaryText",
                        "w-24 h-12 rounded-md m-auto flex justify-center items-center font-extrabold text-lg")}>
                        {link.name}
                    </p>
                </Link>
            ))}
        </div>
    )
}