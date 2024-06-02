'use client'
import React, { useState } from 'react';
import { Stage, Layer, Rect } from 'react-konva';

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

interface SeatSelectionProps {
    sectors: Sector[];
}

const SeatSelection: React.FC<SeatSelectionProps> = ({ sectors }) => {
    const [selectedSeat, setSelectedSeat] = useState<Seat | null>(null);

    const handleSeatClick = (seat: Seat) => {
        setSelectedSeat(seat);
    };

    return (
        {typeof window !== undefined ? (
            <Stage width={window.innerWidth} height={window.innerHeight}>
                <Layer>
                    {sectors.map((sector) =>
                        sector.layout.map((row, rowIndex) =>
                            row.map((seat, seatIndex) => (
                                <Rect
                                    key={`${rowIndex}-${seatIndex}`}
                                    x={seat.x}
                                    y={seat.y}
                                    width={20}
                                    height={20}
                                    fill={seat.is_available ? 'green' : 'red'}
                                    stroke={'black'}
                                    strokeWidth={1}
                                    cornerRadius={3}
                                    onClick={() => handleSeatClick(seat)}
                                />
                            ))
                        )
                    )}
                </Layer>
            </Stage>
        ) : null}
    );
};

export default SeatSelection;