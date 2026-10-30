// resources/js/hooks/use-site-nav.ts
import { useMemo } from 'react';
import { route } from 'ziggy-js';
import {
    Building2,
    History,
    Briefcase,
    Handshake,
    BarChart3,
    Fingerprint,
    Wallet,
    Landmark,
    ShieldCheck,
    LineChart,
    Dices,
    Stethoscope,
    MessageSquare,
    Network,
    Globe,
} from 'lucide-react';
import { useSystemData } from './use-system-data';

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3,
    Fingerprint,
    Wallet,
    Landmark,
    ShieldCheck,
    LineChart,
    Dices,
    Stethoscope,
    MessageSquare,
    Network,
    Globe,
};

const pickIcon = (key: string) => ICONS[key] ?? BarChart3;

export type NavChild = {
    label: string;
    href: string;
    icon: React.ComponentType<{ className?: string }>;
    inertia: boolean;
};

export type NavItem = {
    label: string;
    href: string;
    inertia?: boolean;
    children?: NavChild[];
};

export function useSiteNav(): NavItem[] {
    const { products, services } = useSystemData();

    return useMemo<NavItem[]>(() => {
        return [
            { label: 'Home', href: '/', inertia: true },
            {
                label: 'About Us',
                href: '#about',
                children: [
                    { label: 'Company Profile', href: '#profile', icon: Building2, inertia: false },
                    { label: 'Our Journey', href: '#journey', icon: History, inertia: false },
                    { label: 'Careers', href: '#careers', icon: Briefcase, inertia: false },
                    { label: 'Business Partners', href: '#partners', icon: Handshake, inertia: false },
                ],
            },
            {
                label: 'Products',
                href: '#products',
                children: products.length
                    ? products.map((p) => ({
                        label: p.title,
                        href: route('products.public', p.slug),
                        icon: pickIcon(p.icon),
                        inertia: true,
                    }))
                    : undefined,
            },
            {
                label: 'Services',
                href: '#services',
                children: services.length
                    ? services.map((s) => ({
                        label: s.title,
                        href: route('services.public', s.slug),
                        icon: pickIcon(s.icon),
                        inertia: true,
                    }))
                    : undefined,
            },
            { label: 'Contact', href: route('contact.index'), inertia: true },
        ];
    }, [products, services]);
}