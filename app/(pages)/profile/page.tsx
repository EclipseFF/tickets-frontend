import Link from "next/link";
import Image from "next/image";
import ProfileMenu from "@/components/profile/profile-menu";
import Profile from "@/components/profile/profile";
import {Suspense} from "react";

export default function Page() {
    return (
        <div className="pt-2 lg:pt-8">
            <div className="flex pt-2 lg:pt-5 pb-1 lg:pb-5">
                <Link href={'/'}>
                    <p className="text-lg">Главная</p>
                </Link>
                <Image src={'/icons/arrow-right-grey.svg'} color={'#9797A5'} alt={'Стрелка'} width={24} height={24}/>
                <Link href={'/profile'}>
                    <p className="text-lg font-bold">Профиль</p>
                </Link>
            </div>
            <Suspense fallback={<div>Загрузка...</div>}>
                <Profile />
            </Suspense>
        </div>
    )
}