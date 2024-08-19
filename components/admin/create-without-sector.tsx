'use client'

import {useEffect, useState} from "react";
import {TicketType, Venue} from "@/lib/data";
import GetVenueById from "@/actions/venues/get-by-id";
import {Button} from "@/components/ui/button";
import {ru} from "date-fns/locale";
import {Calendar} from "@/components/ui/calendar";
import {formatDateToRussian, formatDateToRussianLong, incrementDay} from "@/lib/utils";
import {Input} from "@/components/ui/input";
import SaveEventWithoutShahm from "@/actions/admin/event/save-without-shahm";
import GetVenuesByEvent from "@/actions/venues/get-by-event";

export interface sellDayProps {
    date: Date
    types: TicketType[]
}

const formatDateToLocalString = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');

    return `${year}-${month}-${day}T${hours}:${minutes}`;
};

const updateSellDay = (
    dates: sellDayProps[],
    dateToUpdate: Date,
    newType: TicketType
): sellDayProps[] => {
    return dates.map(dateEntry =>
        dateEntry.date.getTime() === dateToUpdate.getTime()
            ? { ...dateEntry, types: [...dateEntry.types, newType] }
            : dateEntry
    );
};


const removeTicketType = (
    dates: sellDayProps[],
    dateToUpdate: Date,
    typeIdToRemove: number
): sellDayProps[] => {
    return dates.map(dateEntry =>
        dateEntry.date.getTime() === dateToUpdate.getTime()
            ? {
                ...dateEntry,
                types: dateEntry.types.filter(type => type.id !== typeIdToRemove)
            }
            : dateEntry
    );
};

export default function CreateWithoutSector({eventId, venueId}: {eventId: number, venueId: number}) {
    const [isActive, setIsActive] = useState(false)
    const [dates, setDates] = useState<sellDayProps[]>([])
    const [dateToCreate, setDateToCreate] = useState<Date>(new Date())
    const [newTypeName, setNewTypeName] = useState<string>("")
    const [newTypePrice, setNewTypePrice] = useState<number>(0)


    function HandleSave() {
    }

    function HandleRemoveType(id: number, date: Date) {

        setDates(prevDates => removeTicketType(prevDates, date, id));
    };

    return(
        <div>
            {!isActive && (
                <Button onClick={() => setIsActive(true)} variant="green">
                    Продолжить без создания секторов
                </Button>
            )}

            {isActive && (
                <Button onClick={() => setIsActive(false)} variant="destructive">
                    Отмена
                </Button>
            )}

            {isActive && (
                <div>
                    Выберите даты и количество билетов в каждой дате:

                                {dates.length > 0 && (
                                    <div>
                                        {dates.map((date, index) => (
                                            <div key={index} className="border border-gray-200 p-4 my-2">
                                                <p className="text-3xl px-2 pt-10 font-bold ">
                                                    {formatDateToRussianLong(date.date.toString())}
                                                </p>
                                                <p className="text-lg px-2 font-bold ">
                                                    Типы билетов и их количество
                                                </p>
                                                <div>
                                                    <p>Добавить новый тип билета</p>
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
                                                            const newType: TicketType = {
                                                                id: Math.floor(Math.random() * 1000000),
                                                                name: newTypeName,
                                                                price: newTypePrice
                                                            }

                                                            setDates(prevDates => updateSellDay(prevDates, date.date, newType));
                                                        }
                                                    } className="my-2" variant="green">
                                                        Добавить
                                                    </Button>
                                                    {date.types && date.types.length > 0 && (
                                                        <div>
                                                            {date.types.map((type) => (
                                                                <div
                                                                    key={type.id}
                                                                    className="p-2"
                                                                >
                                                                    <p>Название: {type.name}</p>
                                                                    <p>Стоимость:{type.price}</p>
                                                                    <Input placeholder="Введите количество билетов" type="number" onChange={(e) => type.price = parseInt(e.target.value)}/>
                                                                    <Button variant="destructive" onClick={() => {
                                                                        HandleRemoveType(type.id, date.date)
                                                                    }}>Удалить этот тип билета</Button>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}

                                                </div>
                                                <Button variant="destructive" onClick={() => {
                                                    const newDates = [...dates]
                                                    newDates.splice(index, 1)
                                                    setDates(newDates)
                                                }}>Удалить эту дату</Button>
                                            </div>
                                        ))}
                                    </div>
                                )}


                    Добавить дату продажи билетов
                    <Input
                        type="datetime-local"
                        value={formatDateToLocalString(dateToCreate)}
                        onChange={(e) => setDateToCreate(new Date(e.target.value))}
                        className="w-full"
                    >

                    </Input>
                    <Button onClick={() => setDates([...dates, {date: dateToCreate, types: []}])}>
                        Добавить дату
                    </Button>
                </div>

            )}
            {isActive &&
                <Button
                    onClick={() => HandleSave}
                    variant="green"
                    className="w-96 my-2"

                >

                Сохранить
            </Button>}
        </div>
    )
}