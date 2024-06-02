/*
'use client';
import React, { useEffect, useState } from 'react';
import SeatSelection from "@/components/test/seat-selection";
import AddSectorForm from "@/components/admin/create-sector";
import CreateSector from "@/components/admin/create-sector";
import {url} from "@/lib/api";


interface Seat {
    id: number;
    x: number;
    y: number;
    is_available: boolean;
}

interface Sector {
    id: number;
    name: string;
    layout: Seat[][];
}

export default function Page(){
    const [sectors, setSectors] = useState<Sector[]>([]);

    useEffect(() => {
        const fetchSectors = async () => {
            const res = await fetch(url + '/api/v1/sector/1');
            const data = await res.json();
            setSectors(data);
        };

        fetchSectors();
    }, []);

    return (
        <div className="lg:w-[1152px]">
            <h1>Admin Panel</h1>
            <SeatSelection sectors={sectors} />
            <CreateSector />
        </div>
    );
};

*/
