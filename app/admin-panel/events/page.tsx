import Navbar from "@/components/admin/navbar";
import EventsList from "@/components/admin/events-list";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function Page() {



    return (
        <div>
            <h1>Админ панель</h1>
            <div className="grid grid-cols-10">
                <div className="">
                    <Navbar />
                </div>
                <div className="col-span-9">
                    <Link href={'/admin-panel/events/create'}>
                        <Button variant="green" className="m-4">Создать новое событие</Button>
                    </Link>
                    <EventsList />
                </div>
            </div>
        </div>
    )
}