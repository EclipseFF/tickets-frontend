import Image from "next/image";

type Props = {
    id: number,
    name: string,
    rating: number,
    age: number,
    image: string,
    genres: string[],
}
export default function CinemaCard(props: Props) {
    return (
        <div className="block w-[147px] h-[350px]">
            <div className="bg-primaryGreen flex items-center rounded-r-full relative left-0 top-16 w-12 h-[22px]">
                <Image src="/icons/rating.svg" alt="Рейтинг" width={12} height={12} />
                <p className="font-semibold text-[13px]">
                    {props.rating}
                </p>
            </div>
            <div className="bg-[#F5BC41] relative left-[78%] top-[58%] bottom-0 w-7 h-7 rounded-full text-white font-semibold text-center ">
                {props.age + "+"}
            </div>
            <Image src={props.image} alt={props.name} width={147} height={225} className="rounded-xl"/>

            <p className="font-extrabold line-clamp-2">
                {props.name}
            </p>
            <p className="text-sm font-normal pt-0.5 text-secondaryText line-clamp-2">
                {props.genres.join(", ")}
            </p>
        </div>
    )
}