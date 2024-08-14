'use client'
import {Button} from "@/components/ui/button";
import {useState} from "react";
import {useRouter} from "next/navigation";
import {News} from "@/lib/data";
import Image from "next/image";
import {apiUrl} from "@/lib/api";

export default function CreateNewsForm(){
    const [name, setName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [images, setImages] = useState<File[]>([]);
    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    const router = useRouter();

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files) {
            const fileArray = Array.from(files);
            setImages([...images, ...fileArray]);

            const previewUrls = fileArray.map(file => URL.createObjectURL(file));
            setImagePreviews([...imagePreviews, ...previewUrls]);
        }
    };

    const handleDeleteImage = (index: number) => {
        const updatedImages = images.filter((_, i) => i !== index);
        const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

        setImages(updatedImages);
        setImagePreviews(updatedPreviews);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        images.forEach((image, index) => {
            formData.append(`images`, image);
        });

        try {
            const response = await fetch(apiUrl + "/api/v1/news", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                router.push("/admin-panel/news"); // Redirect to the news list after creation
            } else {
                console.error("Failed to create news");
            }
        } catch (error) {
            console.error("An error occurred:", error);
        }
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Создать новое событие</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700">Название</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Описание</label>
                    <textarea
                        className="w-full min-h-40 px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Добавить изображения</label>
                    <input
                        type="file"
                        multiple
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
                        onChange={handleFileChange}
                    />
                    {imagePreviews.length > 0 && (
                        <div className="mt-4 flex flex-wrap gap-4">
                            {imagePreviews.map((preview, index) => (
                                <div key={index} className="relative">
                                    <Image
                                        src={preview}
                                        alt={`Preview ${index + 1}`}
                                        className="object-cover rounded-md"
                                        width={128}
                                        height={128}
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteImage(index)}
                                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full h-6 w-6 flex items-center justify-center"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
                <div className="flex justify-end">
                    <Button type="submit" variant="green">
                        Создать
                    </Button>
                </div>
            </form>
        </div>
    );
};

