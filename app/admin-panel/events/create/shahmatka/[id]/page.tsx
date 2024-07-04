import {redirect} from "next/navigation";
import {TicketsFormAdmin} from "@/components/admin/tickets-form-admin";

export default function Page({ params }: { params: { id: string } }) {
    const id: number = parseInt(params.id);
    if (isNaN(id)) {
        redirect('/admin-panel/events');
    }

    return (
        <div>
            <TicketsFormAdmin eventId={id} />
        </div>
    )
}