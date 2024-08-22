import {JSONContent} from "@tiptap/core";

export interface Venue {
    id?: number;
    name?: string;
    location?: string;
}

export interface EventInterface {
    id: number;
    title?: string;
    eventType?: EventType[];
    description?: string;
    briefDesc?: string;
    genres?: string[];
    venues?: Venue[];
    startTime?: Date;
    endTime?: Date;
    price?: number;
    ageRestriction?: number;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    duration?: string
};

export interface EventReq {
    id: number;
    title?: string;
    eventType?: EventType[];
    description?: JSONContent;
    briefDesc?: string;
    genres?: string[];
    venues?: Venue[];
    startTime?: Date;
    endTime?: Date;
    price?: number;
    ageRestriction?: number;
    rating?: number;
    createdAt?: Date;
    updatedAt?: Date;
    duration?: string
};

export interface User {
    id: number;
    email?: string;
    phone?: string;
}

export interface AdditionalUserData {
    user_id: number;
    surname?: string;
    name?: string;
    patronymic?: string;
    birthdate?: Date;
}

export interface EventType {
    id?: number;
    name?: string;
    translatedName?: string;
}

export interface EventImages {
    event_id: number;
    posters: string[];
    main_images: string[];
}

export interface News {
    id: number;
    name?: string;
    images?: string[];
    description?: string;
    created_at?: Date;
}

export interface TicketType {
    id: number;
    name: string;
    price: number;
    amount?: number
}

export interface TicketTypeForClient {
    id: number;
    event_day_id: number;
    name: string;
    price: number;
    amount: number;
    sold_count: number;
    version: number;
}

export interface EventDay {
    id: number;
    event_id: number;
    date: string;
    types: TicketTypeForClient[];
}

export interface Sector {
    id: number;
    venueId: number;
    name?: string;
    height?: number;
    width?: number;
    isLink: boolean;
    left?: number;
    top?: number;
    image?: string;
}