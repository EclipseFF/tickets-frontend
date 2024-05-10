import Image from "next/image";
import {shortMonthDayRussian} from "@/lib/utils";

type Props = {
    id: number,
    name: string,
    age: number,
    image: string,
    price: number,
    date: Date,
    theater: string,
    description: string
}
export default function TheaterCard(props: Props) {
    return (
        <div className="block w-[147px] h-[380px]">
            <div className="bg-primaryGreen text-white font-extrabold text-sm flex items-center rounded-full relative left-[6%] top-[60%] w-fit h-[22px]">
                {"\xa0 от " + props.price + "₸ \xa0"}
            </div>
            <div className="bg-[#F5BC41] relative left-[78%] top-[53%] w-7 h-7 rounded-full text-white font-semibold text-center ">
                {props.age + "+"}
            </div>
            <Image src={props.image} alt={props.name} width={147} height={225} className="rounded-xl"/>
            <p className="font-extrabold line-clamp-2">
                {props.name}
            </p>
            <p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-1">
                {shortMonthDayRussian(props.date) + " • " + props.theater}
            </p>
            <p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-2">
                {props.description}
            </p>
        </div>
    )
}