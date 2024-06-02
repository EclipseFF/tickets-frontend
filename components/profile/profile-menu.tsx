import {
    Command,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {useState} from "react";
import {clsx} from "clsx";
import Link from "next/link";
import {Button} from "@/components/ui/button";
import logout from "@/actions/auth/logout";
import Image from "next/image";

interface Props {
    option: string
    name?: string
    surname?: string
}

export default function ProfileMenu({option, name, surname}: Props) {
    const [user, setUser] = useState<User>();

    return (
        <div className="lg:pr-2">
            <Command className="shadow">
                <CommandList>
                    <CommandItem>
                        <Image src={'/icons/profile.svg'} alt={'Пользователь'} width={24} height={24} />
                        <Link href={'/profile?option=data'}>
                            <p className={clsx("text-base font-medium pl-2", option === "data" ? "text-primaryGreen" : "text-black")}>
                                {surname} {name}
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/ticket.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=tickets'}>
                            <p className={clsx("text-base font-medium pl-2", option === "tickets" ? "text-primaryGreen" : "text-black")}>
                                Мои билеты
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/bank-card.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=cards'}>
                            <p className={clsx("text-base font-medium  pl-2", option === "cards" ? "text-primaryGreen" : "text-black")}>
                                Банковские карты
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/return.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=return'}>
                            <p className={clsx("text-base font-medium pl-2", option === "return" ? "text-primaryGreen" : "text-black")}>
                                О возврате билетов
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/support-service.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=support'}>
                            <p className={clsx("text-base font-medium pl-2", option === "support" ? "text-primaryGreen" : "text-black")}>
                                Служба поддержки
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/questions.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=qa'}>
                            <p className={clsx("text-base font-medium pl-2", option === "qa" ? "text-primaryGreen" : "text-black")}>
                                Вопросы и ответы
                            </p>
                        </Link>
                    </CommandItem>
                    <CommandItem>
                        <Image src={'/icons/document.svg'} alt={'Пользователь'} width={24} height={24}/>
                        <Link href={'/profile?option=offer'}>
                            <p className={clsx("text-base font-medium pl-2", option === "offer" ? "text-primaryGreen" : "text-black")}>
                                Публичный договор (оферта)
                            </p>
                        </Link>
                    </CommandItem>
                </CommandList>
            </Command>

            <Button variant={'ghost'} className="text-primaryGreen font-extrabold text-lg mx-auto block my-3 lg:my-8"
                    onClick={() => logout()}>
                Выйти
            </Button>
        </div>
    )
}