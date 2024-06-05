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