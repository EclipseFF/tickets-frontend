import Image from "next/image";
import Link from "next/link";

export default function Footer() {
    return (
        <div className="bg-[#F9F9FA] w-full flex justify-center">
            <div className="w-4/5 grid grid-cols-4 justify-items-center pb-12 pt-10">
                <Link href="/">
                    <Image src="/logo.svg" alt="Лого" width={165} height={154} />
                </Link>
                <div className="grid gap-4">
                    <h1 className="font-extrabold ">О нас</h1>
                    <p className="font-normal">Правила возврата билета</p>
                    <p className="font-normal">Мы на связи</p>
                    <p className="font-normal">F.A.Q.</p>
                    <p className="font-normal">Публичный договор (оферта)</p>
                    <p className="font-normal">Реклама</p>
                </div>
                <div className="grid gap-4">
                    <h1 className="font-extrabold ">Интересное</h1>
                    <p className="font-normal">Кино</p>
                    <p className="font-normal">Концерты</p>
                    <p className="font-normal">Театры</p>
                    <p className="font-normal">Спорт</p>
                    <p className="font-normal">Киноархив</p>
                    <p className="font-normal">Статьи</p>
                </div>
                <div>
                    <h1 className="font-extrabold pb-4">Социальные сети</h1>
                    <Link href="https://www.instagram.com">
                        <Image src="/icons/instagram.svg" alt="Инстаграм" width={24} height={24} />
                    </Link>
                </div>
            </div>
        </div>
    )
}