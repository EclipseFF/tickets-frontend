import {redirect} from "next/navigation";
import UploadImagesForm from "@/components/upload-images-form";

export default function Page({ params }: { params: { id: string } }) {
    const id: number = parseInt(params.id);
    if (isNaN(id)) {
        redirect('/admin-panel/events');
    }
    return (
        <div className="flex flex-col gap-4 pt-20 items-center">
            <h1>Загрузить изображения.</h1>
            <h1 className="font-semibold">Внимание, для постеров необходимо загружать изображения размером 150 на 350 пикселей.</h1>
            <h1 className="font-semibold">Для изображений галереии ограничений нет </h1>
            <UploadImagesForm id={id} />
        </div>
    )
}