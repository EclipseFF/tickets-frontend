"use client";
import Image from "next/image";
import {Input} from "@/components/ui/input";import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuItem,
    DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {useEffect, useState} from "react";
import LoginRegister from "@/components/auth/login-register";
import Link from "next/link";
import getSession from "@/actions/auth/session";
import getUserBySession from "@/actions/user/get-by-session";
import getAdditionalData from "@/actions/user/get-additional-data";
import {AdditionalUserData, User} from "@/lib/data";


export default function Header() {
    const [city, setCity] = useState("Астана");
    const [lang, setLang] = useState("Рус");
    const [user, setUser] = useState<User>();
    const [session, setSession] = useState<string>();

    useEffect(() => {
        getSession().then(session => {
            if (session) {
                setSession(session)
                getUserBySession(session).then(u => {
                    if (u) {
                        setUser(u)
                    }
                })
            }
        })

    }, [])
    return (
        <header className="flex items-center justify-between gap-4 lg:h-[70px] lg:min-w-[1152px]">
            <div className="flex items-center">
                <Image src="/logo.svg" alt="logo" width={99} height={74} />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><span className="font-bold text-base pr-2">{city}</span><Image src="/icons/arrow-down.svg" alt="Выбрать город" width={13} height={12} /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Выберите город</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={city} onValueChange={setCity}>
                            <DropdownMenuRadioItem value="Астана">Астана</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Алмата">Алмата</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Атырау">Атырау</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="flex items-center">
                <div className="flex items-center ">
                    <Image src="/icons/search.svg" alt={"Поиск"} width={22} height={22}/>

                    <input
                        className="p-3 text-base font-light rounded-2xl focus:outline-primaryGreen focus:caret-primaryGreen"
                        placeholder="Поиск"/>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost"><span className="font-bold text-base">{lang}</span><Image src="/icons/arrow-down.svg" alt="Выбрать язык" width={22} height={6} className="pl-2" /></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>Выберите язык</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={lang} onValueChange={setLang}>
                            <DropdownMenuRadioItem value="Рус">Русский</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="Каз">Казахский</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                {(user && session) ? (
                    <Link href={'/profile'}>
                        <Button variant="secondary"><span className="font-bold text-base">Профиль</span></Button>
                    </Link>
                ) :
                    <Link href={'/auth'}>
                        <Button variant="green"><span className="font-bold text-base">Войти</span></Button>
                    </Link>
                }

            </div>
        </header>
    )
}