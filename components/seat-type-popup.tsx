'use client'

type Props = {
    name: string
    price: number
}

export default function SeatTypePopup(name: string, price: number) {
    return (
        <div className="w-96 h-72 bg-red-600">
            <p>{name}</p>
            <p>{price}</p>
        </div>
    )
}