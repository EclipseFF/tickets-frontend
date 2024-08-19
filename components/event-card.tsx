import Image from "next/image";
import {EventImages, EventInterface} from "@/lib/data";
import Link from "next/link";
import {useEffect, useState} from "react";
import getEventImages from "@/actions/event/get-images";
import {staticUrl} from "@/lib/api";

type Props = {
    event: EventInterface
}
export default function EventCard(props: Props) {
    const [images, setImages] = useState<EventImages>()

    useEffect(() => {
        getEventImages(props.event.id).then((res) => {
            setImages(res)
        })
    }, [])

    return (
        <div className="block w-[147px] h-[350px]">

            {(props.event.rating && props.event.rating > -1 ) ? (
                <div className="bg-primaryGreen flex items-center rounded-r-full relative top-[19%] w-12 h-[22px]">
                    <Image src="/icons/rating.svg" alt="Рейтинг" width={12} height={12}/>
                    <p className="font-semibold text-[13px]">
                        {props.event.rating}
                    </p>
                </div>
            ): (
                <div className="bg-primaryGreen flex items-center rounded-r-full relative top-[19%] w-16 h-[22px]">
                    <Image src="/icons/rating.svg" alt="Рейтинг" width={12} height={12}/>
                    <p className="font-semibold text-[13px]">
                        Новое!
                    </p>
                </div>
            )}

            {props.event.ageRestriction && props.event.ageRestriction > -1 && (
                <div
                    className="bg-[#F5BC41] relative left-[78%] top-[58%] bottom-0 w-7 h-7 rounded-full text-white font-semibold text-center ">
                    {props.event.ageRestriction + "+"}
                </div>
            )}
            <Image src={staticUrl + '/' + props.event.id + '/' + images?.main_images[0] || '/temp/cinema-poster.png'} alt={"Постер"} width={147} height={225} className="rounded-xl"/>

            {props.event.title && (
                <p className="font-extrabold line-clamp-2">
                    {props.event.title}
                </p>
            )}
                {
                    props.event.briefDesc && (
                        <p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-2">
                            {props.event.description}
                        </p>
                    )
                }


            {props.event.genres && props.event.genres.length > 0 &&
                (<p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-2">
                {props.event.genres.join(", ")}
            </p>)
            }
        </div>
    )
}