import {redirect} from "next/navigation";
import UploadImagesForm from "@/components/upload-images-form";
import Shahmatka from "@/components/admin/shahmatka";
import VenuesList from "@/components/venues-list";
import {Button} from "@/components/ui/button";

export default function Page({ params }: { params: { id: string } }) {
    const id: number = parseInt(params.id);
    if (isNaN(id)) {
        redirect('/admin-panel/events');
    }

    return (
        <div>
            <h1>Список локаций</h1>
            <p>
                Настройте шахматку для каждой локации, если шахматка не нужна, то тоже нужно это указать
            </p>
            <div>
                <VenuesList id={id} />
            </div>
             {/*<Shahmatka venueId={id} />*/}
        </div>
    )
}