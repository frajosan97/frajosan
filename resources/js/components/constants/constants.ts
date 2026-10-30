// resources/js/constants/constants.ts

export const BRAND = 'Frajosan Technologies Ltd';

export const CONTACT = {
    phones: ['0796594373', '0796594366'],
    email: 'info@frajosantech.co.ke',
    address: '222-90200 Kitui',
} as const;

export const IMG = {
    hero: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1600&q=80',
    aboutMain: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    aboutSub1: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&q=80',
    aboutSub2: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80',
    ctaMan: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80',
    t1: 'https://i.pravatar.cc/150?img=47',
    t2: 'https://i.pravatar.cc/150?img=12',
    t3: 'https://i.pravatar.cc/150?img=33',
} as const;

export const LOREM =
    'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.';

export const SKILLS = [
    { label: 'EduPulse Systems', value: 95 },
    { label: 'Financial & Insurance Systems', value: 90 },
    { label: 'Hospital Systems', value: 85 },
    { label: 'Networking & Hosting', value: 88 },
];

export const STATS = [
    { value: 80, suffix: 'k', label: 'Happy Clients' },
    { value: 50, suffix: '+', label: 'Companies' },
    { value: 230, suffix: '+', label: 'Projects Done' },
];

export const STEPS = [
    { n: 1, title: 'Discovery' },
    { n: 2, title: 'Planning' },
    { n: 3, title: 'Execute' },
    { n: 4, title: 'Deliver' },
];

// Static menu shown before the dynamic Products/Services items.
// Anything DB-backed is injected at render time in `useSiteNav`.
export const STATIC_MENU = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '#about', hasCaret: true },
    { label: 'Contact', href: '/contact' },
] as const;

// String → icon key mapping lives here so both navbar and page
// sections pull from one registry.
export const ICON_KEYS = [
    'BarChart3',
    'Fingerprint',
    'Wallet',
    'Landmark',
    'ShieldCheck',
    'LineChart',
    'Dices',
    'Stethoscope',
    'MessageSquare',
    'Network',
    'Globe',
    'Building2',
    'History',
    'Briefcase',
    'Handshake',
] as const;

export type IconKey = (typeof ICON_KEYS)[number];

export const SOCIALS = [
    { label: 'Facebook', href: '#', icon: 'Facebook' },
    { label: 'Twitter', href: '#', icon: 'Twitter' },
    { label: 'LinkedIn', href: '#', icon: 'Linkedin' },
    { label: 'Instagram', href: '#', icon: 'Instagram' },
] as const;

export const FOOTER_COPY = {
    solutionsTitle: 'Our Solutions',
    contactTitle: 'Contact Info',
    newsletterTitle: 'Newsletter',
    newsletterBlurb:
        'Get product updates, new releases and ICT tips for schools, hospitals and finance teams — straight to your inbox.',
    brandBlurb:
        'builds school, finance, insurance and hospital systems, plus bulk SMS, networking and hosting — engineered in Kitui for Kenyan institutions.',
} as const;

export const FOOTER_SOLUTIONS_LIMIT = 7;