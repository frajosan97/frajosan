export type * from './auth';
export type * from './navigation';
export type * from './ui';

/* ---------------------------------- Shared --------------------------------- */

export interface Paginated<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    from: number | null;
    to: number | null;
    next_page_url: string | null;
    prev_page_url: string | null;
}

/* --------------------------------- Models --------------------------------- */

export interface Product {
    id: number;
    icon: string;
    title: string;
    slug: string;
    tagline: string;
    body: string | null;
    image: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Service {
    id: number;
    icon: string;
    title: string;
    slug: string;
    tagline: string | null;
    body: string | null;
    image: string | null;
    type: "core" | "addon";
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

export interface Brand {
    id: number;
    name: string;
    subtitle: string | null;
    logo: string | null;
    url: string | null;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}

export interface Testimony {
    id: number;
    name: string;
    role: string;
    quote: string;
    rating: number;
    image: string | null;
    sort_order: number;
    is_active: boolean;
    created_at?: string;
    updated_at?: string;
}