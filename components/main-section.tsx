import Image from "next/image";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import CinemaList from "@/components/lists/cinema-list";
import TheaterList from "@/components/lists/theater-list";
import ConcertList from "@/components/lists/concert-list";
import OtherList from "@/components/lists/other-list";

export default function MainSection() {
    return (
        <div className="lg:w-[1152px]">
            <div className="grid grid-cols-1 lg:grid-cols-3 w-4/5 mx-auto">
                <div className="col-span-2 flex">
                    <Image src="/icons/search.svg" alt="Поиск" width={16} height={16} className="relative left-6"/>
                    <input
                        className="bg-[#F5F5F5] w-full p-3 px-6 text-base font-light rounded-2xl focus:outline-primaryGreen focus:caret-primaryGreen"
                        placeholder="Фильмы, кинотеатры, новости"/>
                </div>
                <div className="flex gap-1 px-2 items-center">
                    <Button variant={"ghost"}>
                        <Image src="/icons/filter.svg" alt="Фильтры" width={28} height={28}/>
                        <p className="text-lg font-extrabold">
                            Фильтры
                        </p>
                    </Button>
                </div>
            </div>
            <div>
                <CinemaList/>
            </div>
            <div>
                <ConcertList/>
            </div>
            <div>
                <TheaterList/>
            </div>
            <div>
                <OtherList/>
            </div>
        </div>
    )
}