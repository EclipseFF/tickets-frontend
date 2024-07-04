import {redirect} from "next/navigation";
import UploadImagesForm from "@/components/upload-images-form";

export default function Page({ params }: { params: { id: string } }) {
    const id: number = parseInt(params.id);
    if (isNaN(id)) {
        redirect('/admin-panel/events');
    }
    return (
        <div>
            <h1>Images</h1>
            <UploadImagesForm id={id} />
        </div>
    )
}