'use client';

import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { useRef, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {Textarea} from "@/components/ui/textarea";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {v4} from "uuid";
import {undefined} from "zod";
import {number, string} from "yup";
import Image from "next/image";
import Shahmatka from "@/components/admin/shahmatka";

interface DraggableItemInterface {
    image?: string;
    height?: number;
    width?: number;
    name?: string;
    description?: string;
    isLink: boolean;
    uuid: string;
    left: number;
    top: number;
    moveItem: (newLeft: number, newTop: number, uuid: string) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    tool?: string;
}



export default function CreateSector({eventId, venueId}: {eventId: number, venueId: number}) {
    const DraggableItem: React.FC<DraggableItemInterface> = ({ image, height, width, name, description, isLink, uuid, top, left, moveItem, containerRef, tool }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: 'item',
            item: { initialLeft: left, initialTop: top },
            collect: (monitor) => ({
                isDragging: monitor.isDragging(),
            }),
            end: (item, monitor) => {
                if (!containerRef.current) return;

                const delta = monitor.getDifferenceFromInitialOffset();
                if (delta) {
                    const newLeft = Math.max(0, item.initialLeft + delta.x);
                    const newTop = Math.max(0, item.initialTop + delta.y);

                    const containerRect = containerRef.current.getBoundingClientRect();
                    const maxLeft = containerRect.width - (width || 28);
                    const maxTop = containerRect.height - (height || 28);

                    moveItem(Math.min(newLeft, maxLeft), Math.min(newTop, maxTop), uuid);
                }
            },
        }), [left, top, moveItem, containerRef]);

        return (
            <div
                ref={drag as any}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: 'move',
                    position: 'absolute',
                    left: left,
                    top: top,
                }}
                onClick={() => {
                    if (tool === "delete") {
                        const newItems = [...draggableItems];
                        const index = newItems.findIndex((item) => item.uuid === uuid);
                        newItems.splice(index, 1);
                        setDraggableItems(newItems);
                    }
                }}
            >
                {image && <div style={{width: width, height: height}}>
                    <Image src={image} alt={''} fill/>
                </div>}
                <p className="font-bold z-10 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">{name || ''}</p>
            </div>
        );
    };



    const containerRef = useRef<HTMLDivElement>(null);
    const [draggableItems, setDraggableItems] = useState<DraggableItemInterface[]>([]);
    const [itemToCreate, setItemToCreate] = useState<DraggableItemInterface>({} as DraggableItemInterface);
    const [tool, setTool] = useState("view");
    const [isActive, setIsActive] = useState(false);
    const moveItem = (newLeft: number, newTop: number, uuid: string) => {
        setDraggableItems((prevItems) => {
            const newItems = prevItems.map(item => {
                if (item.uuid === uuid) {
                    return { ...item, left: newLeft, top: newTop };
                }
                return item;
            });
            return newItems;
        });
    };

    return (
        <div>
            <div>
                <Dialog>
                    <DialogTrigger className="mx-2 bg-black text-white h-10 px-4 py-2 rounded-md">
                        Параметры объекта сектора
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Параметры</DialogTitle>
                            <DialogDescription>
                                Введите текст, который будет показываться на шахматке
                                <Textarea id="name"/>
                                Выберите изображение, которое будет показываться на шахматке
                                <Input type="file" id="image" accept="image/*"/>
                                Этот объект - сектор?
                                <Input type="checkbox" id="isLink" className="h-5 w-5" />
                                Укажите высоту изображения в пикселях
                                <Input type="number" id="imageHeight" defaultValue={100}/>
                                Укажите ширину изображения в пикселях
                                <Input type="number" id="imageWidth" defaultValue={100}/>

                                <Button
                                    onClick={() => {
                                        const name = (document.getElementById('name') as HTMLInputElement).value
                                        const file = (document.getElementById('image') as HTMLInputElement).files?.[0]
                                        const isLink = (document.getElementById('isLink') as HTMLInputElement).checked
                                        const imageHeight = (document.getElementById('imageHeight') as HTMLInputElement).value
                                        const imageWidth = (document.getElementById('imageWidth') as HTMLInputElement).value
                                        const newDecorativeObject: DraggableItemInterface = {
                                            containerRef: containerRef,
                                            isLink: isLink,
                                            moveItem: moveItem,
                                            name: name,
                                            image: file ? URL.createObjectURL(file) : '',
                                            height: Number(imageHeight),
                                            width: Number(imageWidth),
                                            uuid: v4(),
                                            left: 0,
                                            top: 0
                                        }
                                        setItemToCreate(newDecorativeObject)
                                    }}
                                >Применить</Button>
                            </DialogDescription>
                        </DialogHeader>
                    </DialogContent>
                </Dialog>

                <Button onClick={() => {
                    if (itemToCreate) {
                        itemToCreate.uuid = v4()
                        setItemToCreate(itemToCreate)
                        setDraggableItems([...draggableItems, itemToCreate])
                    }
                }}>
                    Создать объект
                </Button>

                <select onChange={(e) => setTool(e.target.value)} className="p-2 rounded m-2">
                    <option value="move">Двигать</option>
                    <option value="delete">Удалить</option>
                </select>

                <Button onClick={() => {
                    setDraggableItems([])
                }} variant="destructive">
                    Очистить
                </Button>
            </div>


            <DndProvider backend={HTML5Backend}>
                <div ref={containerRef}
                     className="border shadow min-w-[800px] w-full min-h-[800px] h-full overflow-auto">
                    <div className="relative">
                        {draggableItems.map(item => (
                            <DraggableItem
                                key={item.uuid}
                                uuid={item.uuid}
                                left={item.left}
                                top={item.top}
                                moveItem={moveItem}
                                containerRef={containerRef}
                                isLink={item.isLink}
                                image={item.image}
                                name={item.name}
                                description={item.description}
                                width={item.width}
                                height={item.height}
                                tool={tool}
                            />
                        ))}
                    </div>
                </div>
            </DndProvider>
            <Button variant="green" className="my-2" onClick={() => setIsActive(true)}>
                Сохранить
            </Button>
            {isActive &&
                draggableItems.map((item) => (
                    item.isLink ? (
                        <Shahmatka eventId={eventId} venueId={venueId} sectorUUID={item.uuid} key={item.uuid}/>
                    ) : null
                ))
            }
        </div>
    );
}
