import Image from "next/image";
import {EventInterface} from "@/lib/data";

type Props = {
    event: EventInterface
}
export default function EventCard(props: Props) {
    return (
        <div className="block w-[147px] h-[350px]">

            {props.event.rating && props.event.rating > -1 && (
                <div className="bg-primaryGreen flex items-center rounded-r-full relative left-0 top-16 w-12 h-[22px]">
                    <Image src="/icons/rating.svg" alt="Рейтинг" width={12} height={12}/>
                    <p className="font-semibold text-[13px]">
                        {props.event.rating}
                    </p>
                </div>
            )}

            {props.event.ageRestriction && props.event.ageRestriction > -1 && (
                <div
                    className="bg-[#F5BC41] relative left-[78%] top-[58%] bottom-0 w-7 h-7 rounded-full text-white font-semibold text-center ">
                    {props.event.ageRestriction + "+"}
                </div>
            )}
            <Image src={'/temp/cinema-poster.png'} alt={"123"} width={147} height={225} className="rounded-xl"/>

            {props.event.title && (
                <p className="font-extrabold line-clamp-2">
                    {props.event.title}
                </p>
            )}


            {props.event.genres && props.event.genres.length > 0 &&
                (<p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-2">
                {props.event.genres.join(", ")}
            </p>)
            }
        </div>
    )
}