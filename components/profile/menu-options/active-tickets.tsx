import Image from "next/image";

export default function ActiveTickets() {
    return (
        <div className="grid justify-items-center min-h-[600px]">
            <div className="pt-1 lg:pt-5">
                <Image src={'/no-tickets.svg'} alt={'Нет билетов'} width={113} height={112} className="mx-auto"/>
                <h1 className="font-extrabold text-lg text-center lg:pt-5">
                    Нет билетов
                </h1>
                <p className="font-medium text-[15px] text-secondaryText text-center max-w-[330px]">
                    В этом разделе будут отображаться активные
                    билеты
                </p>
            </div>
        </div>
    )
}