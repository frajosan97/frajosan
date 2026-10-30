// resources/js/hooks/use-system-data.ts
import { usePage } from '@inertiajs/react';

export type ProductDto = {
    icon: string;
    title: string;
    slug: string;
    tagline: string;
    image: string | null;
};

export type ServiceDto = {
    icon: string;
    title: string;
    slug: string;
    tagline: string | null;
    image: string | null;
    type: 'core' | 'addon';
    sort_order: number;
    is_active: boolean;
};

export type BrandDto = {
    name: string;
    subtitle: string | null;
    logo: string | null;
    url: string | null;
    sort_order: number;
    is_active: boolean;
};

export type TestimonyDto = {
    name: string;
    role: string;
    image: string | null;
    quote: string;
    rating: number;
    sort_order: number;
    is_active: boolean;
};

export type SystemData = {
    products: ProductDto[];
    services: ServiceDto[];
    brands: BrandDto[];
    testimonies: TestimonyDto[];
};

const EMPTY: SystemData = {
    products: [],
    services: [],
    brands: [],
    testimonies: [],
};

export function useSystemData(): SystemData {
    const page = usePage<{ system_data: SystemData | null }>();
    return page.props.system_data ?? EMPTY;
}