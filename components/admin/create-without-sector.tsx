'use client'

import {useEffect, useState} from "react";
import {Venue} from "@/lib/data";
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
    tickets: number
}

export default function CreateWithoutSector({eventId, venueId}: {eventId: number, venueId: number}) {
    const [isActive, setIsActive] = useState(false)
    const [dates, setDates] = useState<sellDayProps[]>([])
    const [dateToCreate, setDateToCreate] = useState<Date>(new Date())

    function HandleSave() {
        SaveEventWithoutShahm(venueId, eventId, dates)
            .then(() => {
                setIsActive(false)
            })
    }


    return(
        <div>
            {!isActive && (
                <Button onClick={() => setIsActive(true)}>
                    Продолжить без создания секторов
                </Button>
            )}

            {isActive && (
                <Button onClick={() => setIsActive(false)}>
                    Отменить создание
                </Button>
            )}

            {isActive && (
                <div>
                    Выберите даты и количество билетов в каждой дате:

                                {dates.length > 0 && (
                                    <div>
                                        {dates.map((date, index) => (
                                            <div key={index}>
                                                <p>
                                                    {formatDateToRussianLong(date.date.toString())}
                                                </p>
                                                <Input
                                                    type="number"
                                                    value={date.tickets}
                                                    onChange={(e) => {
                                                        const newDates = [...dates]
                                                        newDates[index].tickets = parseInt(e.target.value)
                                                        setDates(newDates)
                                                    }}
                                                />
                                                <Button variant="destructive" onClick={() => {
                                                    const newDates = [...dates]
                                                    newDates.splice(index, 1)
                                                    setDates(newDates)
                                                }}>Удалить</Button>
                                            </div>
                                        ))}
                                    </div>
                                )}


                    Добавить дату продажи билетов
                    <Input type="datetime-local" value={dateToCreate.toISOString().substring(0, 16)} onChange={(e) => setDateToCreate(new Date(e.target.value))} className="w-full"></Input>
                    <Button onClick={() => setDates([...dates, {date: dateToCreate, tickets: 0}])}>
                        Добавить дату
                    </Button>
                </div>

            )}
            {isActive && <Button onClick={() =>HandleSave}>
                Сохранить
            </Button>}
        </div>
    )
}