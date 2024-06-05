'use client'


import { Button } from "@/components/ui/button"

import {useEffect, useState} from "react";
import getEventTypes from "@/actions/event/get-types";
import getVenues from "@/actions/venues/get";

import { EditorContent, FloatingMenu, BubbleMenu, useEditor } from '@tiptap/react'
import Link from '@tiptap/extension-link'
import {Textarea} from "@/components/ui/textarea";
import getGenres from "@/actions/event/get-genres";
import {Calendar} from "@/components/ui/calendar";

import {ru} from "date-fns/locale";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {StarterKit} from "@tiptap/starter-kit";
import CreateSector from "@/components/admin/create-sector";
import createEvent from "@/actions/admin/event/create";
import {EventInterface, EventReq, EventType, Venue} from "@/lib/data";


export default function CreateEventForm() {

    function handleEventCreate() {
        setSelectedGenres(selectedGenres.filter(v => selectedGenres.indexOf(v) === selectedGenres.lastIndexOf(v)))
        let age = parseInt(ageRestriction.replace(/\D/g, ''));
        if (isNaN(age)) {
            age = -1
        }
        let priceParam = parseFloat(price)
        if (isNaN(priceParam)) {
            priceParam = -1
        }
        const temp: EventReq = {
            id: 0,
            title: title,
            eventType: selectedTypes,
            description: undefined,
            briefDesc: briefDesc,
            genres: selectedGenres,
            venues: selectedVenues,
            startTime: startDate,
            endTime: endDate,
            price: priceParam,
            ageRestriction: age,
            rating: -1,
            duration: duration
        }
        const text = JSON.stringify(editor?.getJSON())

        console.log(text)
        const res = createEvent(temp, text)
        res.then((data) => {
            if (data !== "error") {
                console.log(data)
            }
        })
    }



    function handleEventTypeCreate() {
        if (newType !== "") {
            const temp: EventType = {
                name: newType,
            }
            setTypes([...types, temp])
            setNewType("")
            // @ts-ignore
            document.getElementById('typecreate').value = "";
        }
    }

    function handleEventTypeUpdate(e: number | string | undefined) {
        if (e !== "" && e !== undefined) {
            let temp: EventType = {}
            if (e && typeof e === 'number' ) {
                temp.id = e

            }
            if (e && typeof e === 'string' ) {
                temp.name = e
            }
            if (selectedTypes.findIndex(t => t.id === temp.id) !== -1) {
                setSelectedTypes(selectedTypes.filter(t => t.id !== temp.id))
            }
            else {
                setSelectedTypes([...selectedTypes, temp])
            }
        }
    }

    function handleGenreCreate() {
        if (newGenre !== "") {
            setGenres([...genres, newGenre])
            setNewGenre("")
            // @ts-ignore
            document.getElementById('genrecreate').value = "";
        }
    }

    function handleGenreUpdate(e: string) {
        if (e !== "") {
            if (selectedGenres.findIndex(t => t === e) !== -1) {
                setSelectedGenres(selectedGenres.filter(t => t !== e))
            }
            else {
                setSelectedGenres([...selectedGenres, e])
            }
        }
    }
    function handleVenueUpdate(id: number | undefined, name: string | undefined, location: string | undefined) {
        if (id) {
            let temp: Venue = {
                id: id
            }
            if (selectedVenues.findIndex(t => t.id === id) !== -1) {
                setSelectedVenues(selectedVenues.filter(t => t.id !== id))
            }
            else {
                setSelectedVenues([...selectedVenues, temp])
            }
        } else {
            if (name && location && name !== "" && location !== "") {
                let temp: Venue = {
                    name: name,
                    location: location
                }
                if (selectedVenues.findIndex(t => t.name === name && t.location === location) !== -1) {
                    setSelectedVenues(selectedVenues.filter(t => t.name !== name && t.location !== location))
                }
                else {
                    setSelectedVenues([...selectedVenues, temp])
                }
            }
        }

    }

    function handleVenueCreate() {
        if (newVenueName !== "" && newVenueLocation !== "") {
            const temp: Venue = {

                name: newVenueName,
                location: newVenueLocation
            }
            setVenues([...venues, temp])
            setNewVenueName("")
            setNewVenueLocation("")
            // @ts-ignore
            document.getElementById('venuenamecreate').value = "";
            // @ts-ignore
            document.getElementById('venuelocationcreate').value = "";
        }
    }

    const editor = useEditor({
        extensions: [
            StarterKit,
            Link,
        ],
        content: '<p>' +
            '1969 год, золотой век Голливуда уже закончился...' +
            '</p>',
        editable: true,
        editorProps: {
            attributes: {
                class: 'prose dark:prose-invert p-2 min-h-96 prose max-w-none [&_ol]:list-decimal [&_ul]:list-disc border border-black rounded',
            }
        }
    })
    const [title, setTitle] = useState<string>("")
    const [types, setTypes] = useState<EventType[]>([])
    const [newType, setNewType] = useState<string>("")
    const [selectedTypes, setSelectedTypes] = useState<EventType[]>([])
    const [description, setDescription] = useState<string>("")
    const [briefDesc, setBriefDesc] = useState<string>("")

    const [venues, setVenues] = useState<Venue[]>([])
    const [newVenueName, setNewVenueName] = useState<string>("")
    const [newVenueLocation, setNewVenueLocation] = useState<string>("")
    const [selectedVenues, setSelectedVenues] = useState<Venue[]>([])

    const [genres, setGenres] = useState<string[]>([])
    const [newGenre, setNewGenre] = useState<string>("")
    const [selectedGenres, setSelectedGenres] = useState<string[]>([])
    const [startDate, setStartDate] = useState<Date | undefined>(new Date())
    const [endDate, setEndDate] = useState<Date | undefined>(new Date())
    const [price, setPrice] = useState<string>("")
    const [ageRestriction, setAgeRestriction] = useState<string>("")
    const [link, setLink] = useState<string>("")
    const [duration, setDuration] = useState<string>("")

    function handleLinkAdd() {
        editor?.chain().focus().extendMarkRange('link').setLink({href: link}).run()
        setLink("")
    }


    useEffect(() => {
        getEventTypes().then(res => {
            setTypes(res)
        })
        getVenues().then(res => {
            setVenues(res)
        })
        getGenres().then(res => {
            setGenres(res)
        })
    }, [])


    return (
        <div className="border shadow max-w-2xl p-4 text-primaryText">
            <div className="">
                <p className="text-lg font-semibold">
                    Введите название &#8432;:
                </p>

                <textarea className="border rounded w-full p-2" onInput={(e) => setTitle(
                    // @ts-ignore
                    e.target.value)}/>
            </div>
            <div className="border">
                <p className="text-lg font-semibold">
                    Выберите категорию события, если нужного нет в списке, создайте новый в поле ниже.
                </p>
                <p className="text-lg">
                    Вы можете выбрать несколько категорий, зажав CTRL
                </p>
                <select multiple className="rounded w-full p-2 min-h-40">
                    {types && types.length > 0 && types.map((type) => (
                        <option className="border-b mt-1" key={type.name} value={type.id}
                                onClick={() => handleEventTypeUpdate(type.id || type.name)}>{type.name}</option>
                    ))}
                </select>
                <div>
                    <div className="m-2 grid grid-cols-1">
                        <p className="text-lg font-semibold">
                            Добавить новую категорию
                        </p>
                        <input type="text" id="typecreate" className="p-2 border rounded m-2" placeholder="Стенд-ап"
                               onInput={(e) => setNewType(
                                   // @ts-ignore
                                   e.target.value)}/>
                        <Button className="w-1/5" variant={'green'} onClick={() => handleEventTypeCreate()}>
                            Добавить
                        </Button>
                    </div>
                </div>

            </div>

            <div className="pt-14">
                <p className="text-lg font-semibold">Введите полное описание</p>
                <p className="text-lg">
                    Вы можете выделить текст, чтобы редактировать его. Чтобы создать заголовок или список, начнине новую
                    строку.

                </p>
                <p className="text-lg pb-6">
                    Чтобы начать новый абзац, нажмите Enter. Для того, чтобы продолжать текст в том же абзаце, но с
                    новой строки, нажмите Shift+Enter.
                </p>
                {editor &&
                    <BubbleMenu editor={editor} tippyOptions={{duration: 100}} className="bg-white text-white rounded">
                        <button
                            onClick={() => editor.chain().focus().toggleBold().run()}
                            className={editor.isActive('bold') ? 'is-active text-black p-1 m-1 bg-primaryGreen rounded' : '' + ' p-1 m-1 bg-primaryGreen rounded'}
                        >
                            Жирный
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleItalic().run()}
                            className={editor.isActive('bold') ? 'is-active text-black p-1 m-1 bg-primaryGreen rounded' : '' + ' p-1 m-1 bg-primaryGreen rounded'}
                        >
                            Курсив
                        </button>
                        <button
                            onClick={() => editor.chain().focus().toggleStrike().run()}
                            className={editor.isActive('bold') ? 'is-active text-black p-1 m-1 bg-primaryGreen rounded' : '' + ' p-1 m-1 bg-primaryGreen rounded'}
                        >
                            Перечёркнутый
                        </button>

                        <Popover>
                            <PopoverTrigger className="p-1 m-1 bg-primaryGreen rounded">Добавить ссылку</PopoverTrigger>
                            <PopoverContent>

                                <Textarea placeholder="Ссылка" onInput={(e) =>
                                    // @ts-ignore
                                    setLink(e.target.value)}/>
                                <Button className="m-2" onClick={handleLinkAdd}>Добавить</Button>
                            </PopoverContent>
                        </Popover>
                    </BubbleMenu>}

                {editor && <FloatingMenu editor={editor} tippyOptions={{duration: 100}}>
                    <button
                        onClick={() => editor.chain().focus().toggleHeading({level: 2}).run()}
                        className={editor.isActive('heading', {level: 1}) ? 'is-active border p-1 m-1' : '' + ' p-1 m-1'}
                    >
                        Заголовок
                    </button>
                    <button
                        onClick={() => editor.chain().focus().toggleBulletList().run()}
                        className={editor.isActive('bulletList') ? 'is-active border p-1 m-1' : '' + ' p-1 m-1'}
                    >
                        Список
                    </button>
                </FloatingMenu>}
                <EditorContent editor={editor}/>
            </div>
            <div className="pt-5">
                <p className="text-lg font-semibold">
                    Введите краткое описание для карточки события - не более одного-двух предложений
                </p>
                <textarea className="w-full border border-black rounded p-2" onInput={(e) => setBriefDesc(
                    // @ts-ignore
                    e.target.value)}>
                </textarea>
            </div>
            <div className="border mt-5">
                <p className="text-lg font-semibold">
                    Выберите жанры события, если нужного нет в списке, создайте новый в поле ниже.
                </p>
                <p className="text-lg">
                    Вы можете выбрать несколько жанров, зажав CTRL
                </p>

                <select multiple className="rounded w-full p-2 min-h-40">
                    {genres && genres.length > 0 && genres.map((genre) => (
                        <option key={genre} value={genre} className="border-b mt-1"
                                onClick={() => handleGenreUpdate(genre)}>{genre}</option>
                    ))}
                </select>
                <div>
                    <div className="m-2 grid grid-cols-1">
                        <p className="text-lg font-semibold">
                            Добавить новый жанр
                        </p>
                        <input type="text" id="genrecreate" className="p-2 border rounded m-2" placeholder="Трагедия"
                               onInput={(e) => setNewGenre(
                                   // @ts-ignore
                                   e.target.value)}/>
                        <Button variant={'green'} className="w-1/5" onClick={() => handleGenreCreate()}>
                            Добавить
                        </Button>
                    </div>
                </div>

            </div>
            <div className="mt-5 border">
                <p className="text-lg font-semibold">
                    Выберите места проведения события, если нужного нет в списке, создайте новую в поле ниже.
                </p>
                <p className="text-lg">
                    Вы можете выбрать несколько локаций, зажав CTRL
                </p>
                <select multiple className="w-full">
                    {venues && venues.length > 0 && venues.map((venue) => (
                        <option key={venue.name} value={venue.id} className="border-b mt-1"
                                onClick={() => handleVenueUpdate(venue.id, venue.name, venue.location)}>{venue.name}</option>
                    ))}
                </select>
                <div className="pt-2">
                    <p className="text-lg font-semibold">
                        Добавить новую локацию, для этого заполните следующие поля
                    </p>
                    <p>
                        Название новой локации (например &ldquo;Астана Арена&rdquo;)
                    </p>
                    <Textarea id="venuenamecreate" onInput={(e) =>
                        // @ts-ignore
                        setNewVenueName(e.target.value)}
                              className="w-full border border-black rounded p-2"/>
                    <p>
                        Точный адрес (например &ldquo;проспект Туран, 48&rdquo;)
                    </p>
                    <Textarea id="venuelocationcreate" onInput={(e) => setNewVenueLocation(
                        // @ts-ignore
                        e.target.value)}
                              className="w-full border border-black rounded p-2"/>
                    <div className="pt-2">
                        <Button variant={'green'} onClick={() => handleVenueCreate()}>
                            Добавить
                        </Button>
                    </div>
                </div>

            </div>
            <div className="grid grid-cols-2 border p-2 mt-5">
                <div>
                    <p className="text-lg font-semibold">
                        Выберите дату начала
                    </p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !startDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {startDate ? format(startDate, "PPP", {locale: ru}) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                                initialFocus
                                locale={ru}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
                <div>
                    <p className="text-lg font-semibold">
                        Выберите дату конца
                    </p>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-[280px] justify-start text-left font-normal",
                                    !endDate && "text-muted-foreground"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                {endDate ? format(endDate, "PPP", {locale: ru}) : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                                initialFocus
                                locale={ru}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            <div className="border p-2 mt-5">
                <p className="text-lg font-semibold">Укажите продолжительность</p>
                <input type="text" className="w-full border border-black rounded p-2" placeholder="3 часа" onInput={(e) =>
                    // @ts-ignore
                    setDuration(e.target.value)}/>
                <p className="text-lg font-semibold">
                    Например &ldquo;2 часа 30 минут&ldquo; или &ldquo;2 ч 30 мин&ldquo;
                </p>
            </div>

            <div className="border p-2 mt-5">
                <p className="text-lg font-semibold">Укажите стоимость билета, от</p>
                <input type="text" className="w-full border border-black rounded p-2" placeholder="1000" onInput={(e) =>
                    // @ts-ignore
                    setPrice(e.target.value)}/>
                <p className="text-lg font-semibold">
                    тг
                </p>
            </div>
            <div className="border p-2 mt-5">
                <p className="text-lg font-semibold">Укажите возраствное ограничение например &ldquo;6+&rdquo;</p>
                <input type="text" className="w-full border border-black rounded p-2" placeholder="6+" onInput={(e) =>
                    // @ts-ignore
                    setAgeRestriction(e.target.value)}/>
            </div>
            <Button onClick={(e) => handleEventCreate()}>
                Создать
            </Button>
        </div>
    )
}