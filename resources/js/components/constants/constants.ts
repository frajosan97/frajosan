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

export const MENU = [
    { label: 'Home', href: '#home', hasCaret: true },
    { label: 'About', href: '#about' },
    { label: 'Products', href: '#services', hasCaret: true },
    { label: 'Services', href: '#process', hasCaret: true },
    { label: 'Blog', href: '#blog', hasCaret: true },
    { label: 'Contact', href: '#contact' },
];

export const SKILLS = [
    { label: 'EduPulse Systems', value: 95 },
    { label: 'Financial & Insurance Systems', value: 90 },
    { label: 'Hospital Systems', value: 85 },
    { label: 'Networking & Hosting', value: 88 },
];

export const LOREM = 'At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores.';

// Core software products (EduPulse systems grouped once, not repeated)
export const SERVICES = [
    { icon: 'BarChart3', title: 'EduPulse Analytics' },
    { icon: 'Fingerprint', title: 'Biometric Attendance' },
    { icon: 'Wallet', title: 'EduPulse Finance' },
    { icon: 'Landmark', title: 'Financial Systems' },
    { icon: 'ShieldCheck', title: 'Insurance Systems' },
    { icon: 'LineChart', title: 'Trading App' },
    { icon: 'Dices', title: 'Betting & Casino' },
    { icon: 'Stethoscope', title: 'Hospital Systems' },
];

// Supporting / add-on services
export const OTHER_SERVICES = [
    { icon: 'MessageSquare', title: 'Bulk SMS' },
    { icon: 'Network', title: 'Networking' },
    { icon: 'Globe', title: 'Domains & Hosting' },
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

export const TESTIMONIALS = [
    {
        img: IMG.t1,
        name: 'Mr. Peter Mutua',
        role: 'Principal, Kitui Boys High School',
        quote:
            'Frajosan\'s EduPulse system replaced three spreadsheets and two registers. Fee reconciliation that used to take a week now closes in an afternoon.',
    },
    {
        img: IMG.t2,
        name: 'Ms. Grace Wanjiku',
        role: 'Finance Manager, Kitui Teachers SACCO',
        quote:
            'Their financial system handles our M-Pesa, cash, and loan ledgers in one place. Audit season used to be painful — now it\'s a report we generate.',
    },
    {
        img: IMG.t3,
        name: 'Dr. Samuel Kilonzo',
        role: 'Medical Superintendent, Kitui County Hospital',
        quote:
            'Patient records, billing, and pharmacy stock are now linked. Our staff training took one day, and support has been quick any time we\'ve needed it.',
    },
];

export const BRANDS = [
    { name: 'Slab', sub: 'Technology' },
    { name: 'CodeSea', sub: 'IT Company' },
    { name: 'Orange', sub: 'Core Technology' },
    { name: 'Technub', sub: 'Technology' },
    { name: 'Greenlab', sub: 'Technology' },
];

export const SERVICE_LINKS = [
    'EduPulse Systems',
    'Financial Systems',
    'Insurance Systems',
    'Hospital Systems',
    'Bulk SMS',
    'Networking',
    'Domains & Hosting',
];

export const PRODUCTS = [
    {
        icon: 'BarChart3',
        title: 'EduPulse Analytics',
        tagline: 'Real-time dashboards on enrolment, performance and fee collection.',
    },
    {
        icon: 'Wallet',
        title: 'EduPulse Finance',
        tagline: 'Fee billing, M-Pesa reconciliation, and payment reminders in one place.',
    },
    {
        icon: 'Fingerprint',
        title: 'Biometric Attendance',
        tagline: 'Fingerprint & card check-in for students and staff — tamper-proof.',
    },
    {
        icon: 'Landmark',
        title: 'Financial Systems',
        tagline: 'Core banking, SACCO, and microfinance platforms with audit trails.',
    },
    {
        icon: 'ShieldCheck',
        title: 'Insurance Systems',
        tagline: 'Policy management, claims workflow, and agent commissions.',
    },
    {
        icon: 'LineChart',
        title: 'Trading App',
        tagline: 'Multi-asset trading with live pricing, charts, and wallet top-ups.',
    },
    {
        icon: 'Dices',
        title: 'Betting & Casino',
        tagline: 'Licensed sportsbook, casino, and bonus engine with fraud controls.',
    },
    {
        icon: 'Stethoscope',
        title: 'Hospital Systems',
        tagline: 'Patient records, appointments, billing, and pharmacy stock.',
    },
];