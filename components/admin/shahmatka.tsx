'use client';

import { Venue } from "@/lib/data";
import {useEffect, useRef, useState} from "react";
import GetVenuesByEvent from "@/actions/venues/get-by-event";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {Dialog, DialogTrigger, DialogTitle, DialogContent, DialogDescription, DialogHeader} from "@/components/ui/dialog";
import {types} from "node:util";
import SeatTypePopup from "@/components/seat-type-popup";
import Image from "next/image";
import {Textarea} from "@/components/ui/textarea";
import {v4} from "uuid";

interface Type {
    id: number;
    name: string;
    price: number;
}

interface Seat {
    num: number;
    left: number;
    top: number;
    price: number
    bgColor?: string
    textColor?: string
    types?: Type[]
}

interface SelectedSeat {
    Seat: Seat;
    rowIndex: number;
    seatIndex: number;
}

interface DraggableSeatProps {
    seat: Seat;
    rowIndex: number;
    seatIndex: number;
    moveSeat: (rowIndex: number, seatIndex: number, newLeft: number, newTop: number) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    tool: string;
    rowForPopup: number;
}

interface DraggableItem {
    name?: string;
    image?: string;
    uuid: string;
    left: number;
    top: number;
}

interface DraggableItemProps {
    dragItem: DraggableItem;
    moveItem: (newLeft: number, newTop: number, uuid: string) => void;
    containerRef: React.RefObject<HTMLDivElement>;
    tool?: string;
}


export default function Shahmatka({ eventId, venueId, sectorUUID }: { eventId: number, venueId: number, sectorUUID: string }) {
    const [seats, setSeats] = useState<Seat[][]>([[]]);
    const containerRef = useRef<HTMLDivElement>(null);
    const [x, setX] = useState(10);
    const [y, setY] = useState(10);
    const [tool, setTool] = useState("view");
    const [defaultPrice, setDefaultPrice] = useState<number>(1000);
    const [changedPrice, setChangedPrice] = useState<number>(1000);
    const [bgColor, setBgColor] = useState<string>("");
    const [textColor, setTextColor] = useState<string>("");
    const [reverse, setReverse] = useState<boolean>(false);
    const [countAgain, setCountAgain] = useState<boolean>(false);
    const [changedTypes, setChangedTypes] = useState<Type[]>([]);
    const [newTypeName, setNewTypeName] = useState<string>("");
    const [newTypePrice, setNewTypePrice] = useState<number>(0);
    const [showPopup, setShowPopup] = useState<boolean>(false);
    const [selectedSeat, setSelectedSeat] = useState<SelectedSeat>();
    const [draggableItems, setDraggableItems] = useState<DraggableItem[]>([])
    const [draggableItemToCreate, setDraggableItemToCreate] = useState<DraggableItem>({} as DraggableItem);
    const [selectedType, setSelectedType] = useState<Type>({} as Type);
    const DraggableItem: React.FC<DraggableItemProps> = ({ dragItem, moveItem, containerRef, tool }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "item",
            item: {initialLeft: dragItem.left, initialTop: dragItem.top},
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
                    const maxLeft = containerRect.width - 28; // assuming seat width
                    const maxTop = containerRect.height - 28; // assuming seat height

                    moveItem(Math.min(newLeft, maxLeft), Math.min(newTop, maxTop), dragItem.uuid);
                    dragItem.top = newTop;
                    dragItem.left = newLeft;
                    item.initialLeft = newLeft;
                    item.initialTop = newTop;
                }
            }
        }));



        return (
            <div
                ref={drag}
                style={{
                    opacity: isDragging ? 0.5 : 1,
                    cursor: "move",
                    position: "absolute",
                    left: dragItem.left,
                    top: dragItem.top,
                }}
                onClick={() => {
                    if (tool === "delete") {
                        const newItems = [...draggableItems];
                        newItems.splice(newItems.findIndex(item => item.uuid === dragItem.uuid), 1);
                        setDraggableItems(newItems)
                    }
                }}
            >
                <div>
                    {dragItem.image && <Image src={dragItem.image} width={800} height={28} alt={dragItem.name as string} />}
                    <p className="text-3xl font-bold text-center">
                        {dragItem.name}
                    </p>
                </div>
            </div>
        );
    };




    const DraggableSeat: React.FC<DraggableSeatProps> = ({ seat, rowIndex, seatIndex, moveSeat, containerRef, tool, rowForPopup }) => {
        const [{ isDragging }, drag] = useDrag(() => ({
            type: "seat",
            item: { rowIndex, seatIndex, initialLeft: seat.left, initialTop: seat.top },
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
                    const maxLeft = containerRect.width - 28; // assuming seat width
                    const maxTop = containerRect.height - 28; // assuming seat height

                    moveSeat(item.rowIndex, item.seatIndex, Math.min(newLeft, maxLeft), Math.min(newTop, maxTop));
                    seat.top = newTop;
                    seat.left = newLeft;
                    item.initialLeft = newLeft;
                    item.initialTop = newTop;
                }
            }

        }));



        return (
            <div
                ref={drag}
                className={`absolute w-7 m-1 h-7 rounded border text-center text-clip overflow-hidden`}
                style={{
                    left: `${seat.left}px`,
                    top: `${seat.top}px`,
                    opacity: isDragging ? 0.5 : 1,
                    backgroundColor: seat.bgColor,
                    color: seat.textColor
                }}
                onClick={
                    () => {
                        if (tool === "delete") {
                            const newSeats = [...seats];
                            newSeats[rowIndex].splice(seatIndex, 1);
                            setSeats(newSeats);
                        }
                        if (tool === "changePrice") {
                            const newSeats = [...seats];
                            newSeats[rowIndex][seatIndex].price = changedPrice;
                            setSeats(newSeats);
                        }
                        if (tool === "color") {
                            const newSeats = [...seats];
                            newSeats[rowIndex][seatIndex].bgColor = bgColor;
                            newSeats[rowIndex][seatIndex].textColor = textColor;
                            setSeats(newSeats);
                        }
                        if (tool === "editSeat") {

                            const newSeats = seats.map((row, rIndex) =>
                                rIndex === rowIndex
                                    ? row.map((seat, sIndex) =>
                                        sIndex === seatIndex
                                            ? {
                                                ...seat,
                                                types: seat.types
                                                    ? seat.types.some(type => type.name === selectedType.name)
                                                        ? seat.types.filter(type => type.name !== selectedType.name)
                                                        : [...seat.types, selectedType]
                                                    : [selectedType]
                                            }
                                            : seat
                                    )
                                    : row
                            );
                            setSeats(newSeats);

                        }

                    }
                }
            >
                <div onClick={() => {

                    if (tool === "view") {
                        setSelectedSeat({ Seat: seat, rowIndex, seatIndex });
                        setShowPopup(true);
                    }
                }}>
                    {seat.num}
                </div>
            </div>
        );
    };






    useEffect(() => {
        setSeats(InitialCreate(x, y, defaultPrice, countAgain, reverse));
    }, [x, y, defaultPrice, countAgain,reverse]);

    const moveSeat = (rowIndex: number, seatIndex: number, newLeft: number, newTop: number) => {
        setSeats((prevSeats) => {
            const newSeats = [...prevSeats];
            const row = newSeats[rowIndex];
            const seatToMove = row[seatIndex];
            const updatedSeat = { ...seatToMove, left: newLeft, top: newTop };
            newSeats[rowIndex][seatIndex] = updatedSeat;
            return newSeats;
        });
    };

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
        <DndProvider backend={HTML5Backend}>
            <div className="pb-4 border my-3 p-1">
                <h1 className="text-2xl">
                    Параметры шахматки
                </h1>
                <p>
                    Число рядов
                </p>
                <Input
                    value={x}
                    onChange={(e) => setX(parseInt(e.target.value))}
                    placeholder="Рядов"
                    type="number"
                />
                <p>
                    Число столбцов
                </p>
                <Input
                    value={y}
                    onChange={(e) => setY(parseInt(e.target.value))}
                    placeholder="Столбцов"
                    type="number"
                />
                <p>
                    Цена по умолчанию
                </p>
                <Input
                    value={defaultPrice}
                    onChange={(e) => setDefaultPrice(parseInt(e.target.value))}
                    placeholder="Цена по умолчанию"
                    type="number"
                />
                <div className="flex flex-col space-y-2 py-2">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="count" onCheckedChange={() => setCountAgain(!countAgain)}  />
                        <label
                            htmlFor="count"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Начинать отсчет в каждом ряду заново
                        </label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Checkbox id="reverse" onCheckedChange={() => setReverse(!reverse)} />
                        <label
                            htmlFor="reverse"
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        >
                            Ряды в обратном порядке
                        </label>
                    </div>
                </div>

            </div>

            <div>

                <div className=" border shadow min-w-[800px] w-full min-h-[800px] h-full overflow-auto" ref={containerRef}>
                    <div className="bg-primaryGreen p-2">
                        <h1 className="text-2xl m-2">
                            Панель инструментов
                        </h1>
                        <Button onClick={() =>
                            {
                                const newSeat:Seat = {
                                    left: 0, num: findMissingOrNextHighest(seats), price: defaultPrice, top: 0

                                }
                                setSeats((seats) => [...seats, [newSeat]]);

                            }

                        } className="mx-2">Создать место</Button>

                        <Button onClick={() =>
                        {
                            const newSeats = shiftValuesLeft(seats, countAgain);

                            setSeats(newSeats);

                        }

                        }>Пересчитать номера мест</Button>

                        <Button onClick={() =>
                        {



                            setSeats(seats.filter(row => row.length > 0 && row.some(seat => seat.num !== null && seat.num !== undefined)));

                        }

                        } className="mx-2">Удалить пустые ряды</Button>

                        <Dialog>
                            <DialogTrigger className="mx-2 bg-black text-white h-10 px-4 py-2 rounded-md">
                                Параметра декоративного объекта
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Параметры</DialogTitle>
                                    <DialogDescription>
                                            Введите текст, который будет показываться на шахматке
                                        <Textarea id="name" />
                                            Выберите изображение, которое будет показываться на шахматке
                                        <Input type="file" id="image" />
                                        <Button
                                            onClick={() => {
                                                const name = (document.getElementById('name') as HTMLInputElement).value
                                                const file = (document.getElementById('image') as HTMLInputElement).files?.[0]
                                                const newDecorativeObject: DraggableItem = {
                                                    name: name,
                                                    image: file ? URL.createObjectURL(file) : '',
                                                    uuid: v4(),
                                                    left: 0,
                                                    top: 0
                                                }
                                                setDraggableItemToCreate(newDecorativeObject)
                                            }}
                                        >Применить</Button>
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                        <Button onClick={() => setDraggableItems([...draggableItems, { ...draggableItemToCreate, uuid: v4() }])}>
                            Создать декоративный объект
                        </Button>

                        <div>
                            <h1 className="m-2">
                                Выберите действие
                            </h1>
                            <select onChange={(e) => setTool(e.target.value)} className="p-2 rounded m-2">
                                <option value="view">Просмотр</option>
                                <option value="move">Двигать</option>
                                <option value="delete">Удалить</option>
                                <option value="changePrice">Изменить цену</option>
                                <option value="color">Цвет</option>
                                <option value="editSeat">Изменить параметры места</option>
                            </select>
                        </div>

                        {tool === 'editSeat' && (

                            <div>
                                <h1 className="m-2 text-lg">
                                    Изменить типы мест: добавитьразделение на детские и взрослые, добавить вип-места и т.д.
                                </h1>
                                {changedTypes && changedTypes.length > 0 && (
                                    changedTypes.map((type) => (
                                        <div key={type.id} className="bg-white rounded p-2">
                                            <div>
                                                <p>
                                                    {type.name}
                                                </p>
                                                <p>
                                                    Номера мест с этим типом: {
                                                        seats
                                                            .map((row) => row
                                                                .filter((seat) => seat.types?.find(t => t.id === type.id))
                                                                .map((seat) => seat.num)
                                                            ).join('  ')
                                                }
                                                </p>
                                            </div>
                                            <p>Цена: {type.price} тг</p>
                                            {selectedType && selectedType.id === type.id ? (
                                                <Button onClick={() => setSelectedType({} as Type)} variant='secondary'>Отменить</Button>
                                            ) : <Button onClick={() => setSelectedType(type)} variant='default'>Выбрать</Button>}
                                            <Button variant='destructive' onClick={() => setChangedTypes(changedTypes.filter((t) => t.id !== type.id))} className="ml-2">Удалить</Button>
                                        </div>
                                    )

                                ))}
                                <div>
                                    <p>Добавить новый тип мест</p>
                                    <div className="flex gap-2">
                                        <Input
                                            onChange={(e) => setNewTypeName(e.target.value)}
                                            placeholder="Название (например Взрослый или Студенческий)"
                                            type="text"
                                        />
                                        <Input
                                            onChange={(e) => setNewTypePrice(parseInt(e.target.value))}
                                            placeholder="Стоимость только числами, например 1000"
                                            type="number"
                                        />
                                    </div>
                                    <Button onClick={
                                        () => {
                                            const newType: Type = {
                                                id: changedTypes.length + 1,
                                                name: newTypeName,
                                                price: newTypePrice
                                            }
                                            setChangedTypes([...changedTypes, newType]);
                                        }
                                    } className="my-2">
                                        Добавить
                                    </Button>
                                </div>
                            </div>

                        )}

                        {tool === 'changePrice' && (
                            <Input
                                value={changedPrice}
                                onChange={(e) => setChangedPrice(parseInt(e.target.value))}
                                placeholder="Изменить цену мест"
                                type="number"
                            />
                        )}
                        {tool === 'color' && (
                            <div>
                                <p>
                                    Изменить цвет мест
                                </p>
                                <Input
                                    onChange={(e) => setBgColor(e.target.value)}
                                    type="color"
                                />
                                <p>
                                    Изменить цвет текста
                                </p>
                                <Input
                                    onChange={(e) => setTextColor(e.target.value)}
                                    type="color"
                                />
                            </div>
                        )}
                    </div>
                    <div className="relative">
                        {draggableItems.map((item, index) => (
                            <DraggableItem
                                key={index}
                                dragItem={item}
                                moveItem={moveItem}
                                containerRef={containerRef}
                                tool={tool}
                            />
                        ))}

                        {seats.map((row, rowIndex) =>
                            row.map((seat, seatIndex) => (
                                <DraggableSeat
                                    key={`${rowIndex}-${seatIndex}`}
                                    seat={seat}
                                    rowIndex={rowIndex}
                                    seatIndex={seatIndex}
                                    moveSeat={moveSeat}
                                    containerRef={containerRef}
                                    tool={tool}
                                    rowForPopup={rowIndex}
                                />
                            ))
                        )}
                    </div>
                </div>
            </div>
            <div>
                <Button onClick={() => console.log(seats)}>Сохранить</Button>
            </div>
            {showPopup && (
                <div
                    className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:w-1/6 bg-white shadow h-[300px] w-[300px]"
                >
                    {
                        selectedSeat && selectedSeat.seatIndex !== null && selectedSeat.rowIndex !== null && (
                            <p className="p-2">
                                {selectedSeat.rowIndex + 1} ряд, {selectedSeat.Seat.num} место
                            </p>
                        )
                    }
                    {
                        selectedSeat?.Seat.types && selectedSeat.Seat.types.length > 0  ? selectedSeat?.Seat.types.map(
                            (type) => (
                                <div className="p-2" key={type.id}>
                                    <p>{type.name}</p>
                                    <p>Стоимость: {type.price} тг</p>
                                </div>
                            )
                        ) : (
                            <p className="p-2">
                                Стоимость: {selectedSeat?.Seat.price} тг
                            </p>
                        )
                    }
                    <button
                        type="button"
                        onClick={() => setShowPopup(false)}
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1 text-xs opacity-75 group-hover:opacity-100 transition-opacity"


                    >
                        <Image src={'/icons/close.svg'} alt={'Закрыть'} width={16} height={16}/>
                    </button>

                </div>
            )}
        </DndProvider>
    );
}

function InitialCreate(rows: number, cols: number, price: number, countAgain: boolean, reverse: boolean): Seat[][] {
    const result: Seat[][] = [];
    const seatWidth = 28;
    const seatHeight = 28;
    const seatMargin = 4;
    const topPadding = 200;
    let counter = 1;
    if (reverse) {
        for (let i = rows - 1; i >= 0; i--) {
            const row: Seat[] = [];
            for (let j = cols - 1; j >= 0; j--) {
                const seat: Seat = {
                    num: counter++,
                    left: j * (seatWidth + 2 * seatMargin),
                    top: i * (seatHeight + 2 * seatMargin) + topPadding,
                    price: price
                };
                row.push(seat);
            }
            if (countAgain) {
                counter = 1;
            }
            result.push(row);
        }
    } else {
        for (let i = 0; i < rows; i++) {
            const row: Seat[] = [];
            for (let j = 0; j < cols; j++) {
                const seat: Seat = {
                    num: counter++,
                    left: j * (seatWidth + 2 * seatMargin),
                    top: i * (seatHeight + 2 * seatMargin) + topPadding,
                    price: price
                };
                row.push(seat);
            }
            if (countAgain) {
                counter = 1;
            }
            result.push(row);
        }
    }


    return result;
}

function findMissingOrNextHighest(arr: Seat[][]): number {
    let max = 0;
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[i].length; j++) {
            if (arr[i][j].num > max) {
                max = arr[i][j].num;
            }
        }
    }

    for (let num = 1; num <= max + 1; num++) {
        let found = false;
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr[i].length; j++) {
                if (arr[i][j].num === num) {
                    found = true;
                    break;
                }
            }
            if (found) {
                break;
            }
        }
        if (!found) {
            return num;
        }
    }

    return max + 1;
}

function shiftValuesLeft(seats: Seat[][], repeat: boolean): Seat[][] {
    const shiftedSeats: Seat[][] = [];
    if (!repeat) {
        let counter = 1;
        for (let i = 0; i < seats.length; i++) {
            const sortedSeats = seats[i].slice().sort((a, b) => a.num - b.num);
            let shiftedSubArray: Seat[] = [];
            for (let j = 0; j < sortedSeats.length; j++) {
                const seat = sortedSeats[j];
                seat.num = counter;
                shiftedSubArray.push(seat);
                counter++;
            }
            shiftedSeats.push(shiftedSubArray);
        }
    } else {
        for (let i = 0; i < seats.length; i++) {
            const sortedSeats = seats[i].slice().sort((a, b) => a.num - b.num);
            const shiftedSubArray = sortedSeats.map((seat, index) => ({
                ...seat,
                num: index + 1
            }));
            shiftedSeats.push(shiftedSubArray);
        }
    }


    return shiftedSeats;
}

function getNonEmptyRowsCount(seats: Seat[][]): number {
    let count = 0;
    for (let i = 0; i < seats.length; i++) {
        if (seats[i].length > 0) {
            count++
        }
    }
    return count;
}