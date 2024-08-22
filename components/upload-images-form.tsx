'use client'

import {useState} from "react";
import Image from "next/image";
import {Button} from "@/components/ui/button";
import UploadImages from "@/actions/admin/event/upload-images";
import {apiUrl} from "@/lib/api";
import {useRouter} from "next/navigation";

export default function UploadImagesForm({id}: { id: number }) {
    const router = useRouter()
    const [mainImages, setMainImages] = useState<File[]>([]);
    const [posters, setPosters] = useState<File[]>([]);

    const handleMainFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files);
            setMainImages(prevImages => [...prevImages, ...fileArray]);
        }
    };

    const removeMainImage = (index: number) => {
        setMainImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const removeMainImages = () => {
        setMainImages([]);
    };



    const handlePosterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const fileArray = Array.from(event.target.files);
            setPosters(prevImages => [...prevImages, ...fileArray]);
        }
    };


    const removePosterImage = (index: number) => {
        setPosters(prevImages => prevImages.filter((_, i) => i !== index));
    };

    const removePosterImages = () => {
        setPosters([]);
    };

    const handlerServerUpload = () => {
        let formData = new FormData();
        formData.append("eventId", id.toString());
        mainImages.forEach((image) => {
            formData.append("main_images", image);
        })

        posters.forEach((image) => {
            formData.append("posters", image);
        })

        fetch(`${apiUrl}/api/v1/event/images/upload`, {
            method: "POST",
            body: formData
        }).then((res) => {
            if (res.ok) {
                router.push("/admin-panel/events/create/shahmatka/" + id)
            }
        })
    }

    return (
        <div className="max-w-md mx-auto my-8 p-4 bg-white rounded-lg shadow-md">
            <div className="flex flex-col items-center">
                <label className="cursor-pointer">
                    <div className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-center">
                        <p className="text-gray-500">Нажмите, чтобы загрузить постеры</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleMainFileChange}
                        />
                    </div>
                </label>
            </div>

            {mainImages.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Предпросмотр постеров</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {mainImages.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-full h-auto object-cover rounded-lg"
                                    width={200}
                                    height={200}
                                />
                                <button
                                    type="button"
                                    onClick={() => removeMainImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-75 group-hover:opacity-100 transition-opacity"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="flex flex-col items-center pt-10">
                <label className="cursor-pointer">
                    <div className="w-full px-4 py-2 border-2 border-dashed border-gray-300 rounded-md text-center">
                        <p className="text-gray-500">Нажмите, чтобы загрузить изображения в галерею</p>
                        <input
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handlePosterFileChange}
                        />
                    </div>
                </label>
            </div>

            {posters.length > 0 && (
                <div className="mt-4">
                    <h3 className="text-lg font-semibold mb-2">Предпросмотр галереии</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {posters.map((image, index) => (
                            <div key={index} className="relative group">
                                <Image
                                    src={URL.createObjectURL(image)}
                                    alt={`preview-${index}`}
                                    className="w-full h-auto object-cover rounded-lg"
                                    width={200}
                                    height={200}
                                />
                                <button
                                    type="button"
                                    onClick={() => removePosterImage(index)}
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-75 group-hover:opacity-100 transition-opacity"
                                >
                                    &times;
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}



            <div className="flex justify-between pt-5">
                <Button variant='green' onClick={() => handlerServerUpload()}>
                    Загрузить
                </Button>
                <Button variant="destructive" onClick={() => (removeMainImages(), removePosterImages()) }>
                    Удалить все
                </Button>
            </div>
        </div>
    );
}