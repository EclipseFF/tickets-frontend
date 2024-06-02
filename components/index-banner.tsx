import Image from "next/image";
import {AspectRatio} from "@/components/ui/aspect-ratio";
import {Button} from "@/components/ui/button";

export default function IndexBanner() {
    return (
        <div className="lg:w-[1130px] rounded-lg pt-8 px-2">
            <AspectRatio ratio={2.56}>
                <Image src="/temp/scorpions.png" fill alt="scorpions"/>
                <div className="absolute left-1 lg:left-24 text-white top-[10%] lg:top-[25%]">
                    <p className="text-xs lg:text-2xl font-extrabold pb-3 lg:pb-6">SCORPIONS в Астане</p>
                    <div className="flex pb-1 lg:pb-3">
                        <Image src="/icons/calendar.svg" alt="Дата" width={20} height={20}/>
                        <p className="text-sm pl-1">28 мая 20:00</p>
                    </div>
                    <div className="flex pb-1 lg:pb-3">
                        <Image src="/icons/location.svg" alt="Место" width={20} height={20}/>
                        <p className="text-sm pl-1">Астана Арена</p>
                    </div>
                    <div className="flex pb-1 lg:pb-3">
                        <Image src="/icons/price.svg" alt="Место" width={20} height={20}/>
                        <p className="text-sm pl-1">от 20 000</p>
                    </div>
                    <div className="pt-2 lg:pt-6">
                        <Button variant="green" className="lg:h-12 h-5 rounded-md px-2 lg:px-8 font-semibold text-base">Купить билет</Button>
                    </div>
                </div>
            </AspectRatio>

        </div>
    )
}