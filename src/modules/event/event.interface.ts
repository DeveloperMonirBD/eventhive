export interface IEvent { 
    id: number;
    title: string;
    description: string;
    category: string;
    date: Date;
    location: string;
    total_seats: number;
    available_seats: number;
    price: string;
    organizer_id: number;
    created_at: Date;
    updated_at: Date;
}

// Event creation payload
export interface ICreateEventPayload { 
    title: string;
    description: string;
    category: string;
    date: string;
    location: string;
    total_seats: number;
    price: number;
}

// Event update Payload
export interface IUpdateEventPayload { 
    title?: string;
    description?: string;
    category?: string;
    date?: string;
    location?: string;
    total_seats?: number;
    price?: number;
}