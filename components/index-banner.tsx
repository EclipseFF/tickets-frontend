import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Button} from "@/components/ui/button";

export default function IndexBanner() {
    return (
        <div className="w-[1130px] rounded-lg pt-8">
            <AspectRatio ratio={2.56}>
                <Image src="/temp/scorpions.png" fill alt="scorpions"/>
                <div className="absolute left-24 text-white top-24">
                    <p className="text-2xl font-extrabold pb-6">SCORPIONS в Астане</p>
                    <div className="flex pb-3">
                        <Image src="/icons/calendar.svg" alt="Дата" width={20} height={20}/>
                        <p className="text-sm pl-1">28 мая 20:00</p>
                    </div>
                    <div className="flex pb-3">
                        <Image src="/icons/location.svg" alt="Место" width={20} height={20}/>
                        <p className="text-sm pl-1">Астана Арена</p>
                    </div>
                    <div className="flex pb-3">
                        <Image src="/icons/price.svg" alt="Место" width={20} height={20}/>
                        <p className="text-sm pl-1">от 20 000</p>
                    </div>
                    <div className="pt-6">
                        <Button variant="green" size="xl" className="font-semibold text-base">Купить билет</Button>
                    </div>
                </div>
            </AspectRatio>
        </div>
    )
}