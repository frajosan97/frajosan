import { Head } from "@inertiajs/react";
import { motion } from "framer-motion";
import {
    MapPin,
    Phone,
    Mail,
    Clock,
    Send,
    MessageSquare,
    Network,
    Globe,
    Building2,
} from "lucide-react";
import GuestLayout from "@/layouts/guest-layout";
import Wrapper from "@/layouts/app/wrapper";
import { CONTACT, BRAND } from "@/components/constants/constants";
import { fadeUp, stagger } from "@/lib/motion";

const CONTACT_CARDS = [
    {
        icon: MapPin,
        title: "Visit Us",
        lines: [CONTACT.address, "Kitui County, Kenya"],
        action: {
            label: "Get directions",
            href: `https://maps.google.com/?q=${encodeURIComponent(CONTACT.address + " Kitui Kenya")}`,
        },
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: CONTACT.phones,
        action: {
            label: "Call now",
            href: `tel:${CONTACT.phones[0]}`,
        },
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: [CONTACT.email],
        action: {
            label: "Send email",
            href: `mailto:${CONTACT.email}`,
        },
    },
    {
        icon: Clock,
        title: "Working Hours",
        lines: ["Mon – Fri: 8:00 AM – 5:00 PM", "Sat: 9:00 AM – 1:00 PM"],
    },
];

const SERVICE_OPTIONS = [
    "School Management System",
    "Biometric Attendance",
    "School Finance",
    "Financial Systems",
    "Insurance Systems",
    "Trading App",
    "Betting & Casino",
    "Hospital Systems",
    "Bulk SMS",
    "Networking",
    "Domains & Hosting",
    "Other",
];

const QUICK_HELP = [
    {
        icon: MessageSquare,
        title: "Bulk SMS",
        description: "Send thousands of SMS from 0.50 KES each.",
        href: "/#bulk-sms",
    },
    {
        icon: Network,
        title: "Networking",
        description: "Office, school, and campus network setup.",
        href: "/#networking",
    },
    {
        icon: Globe,
        title: "Domains & Hosting",
        description: "Register a .co.ke domain and host it fast.",
        href: "/#hosting",
    },
];

function ContactPage() {
    return (
        <>
            <Head title={`Contact — ${BRAND}`}>
                <meta
                    name="description"
                    content={`Get in touch with ${BRAND}. Call ${CONTACT.phones.join(" or ")}, email ${CONTACT.email}, or visit us at ${CONTACT.address}, Kitui.`}
                />
            </Head>

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1] text-white">
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage:
                            "radial-gradient(#fff 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4a8dff]/30 blur-3xl pointer-events-none" />

                <Wrapper className="relative py-20 sm:py-24 lg:py-28">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="mx-auto max-w-3xl text-center"
                    >
                        <motion.div
                            variants={fadeUp}
                            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span className="text-[12px] font-bold tracking-[0.15em] uppercase">
                                Get in touch
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl leading-[1.15] font-bold sm:text-5xl lg:text-[56px]"
                        >
                            Let's talk about your project
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-6 max-w-xl text-[16px] sm:text-[18px] leading-relaxed text-white/85"
                        >
                            Whether you're a school, hospital, SACCO or business
                            — tell us what you need and we'll reply within one
                            working day.
                        </motion.p>
                    </motion.div>
                </Wrapper>
            </section>

            {/* ─── CONTACT CARDS ─── */}
            <section className="relative bg-[#f8f9fa] py-16 sm:py-20">
                <Wrapper>
                    <motion.div
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, amount: 0.15 }}
                        variants={stagger}
                        className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {CONTACT_CARDS.map((c) => {
                            const Icon = c.icon;
                            return (
                                <motion.div
                                    key={c.title}
                                    variants={fadeUp}
                                    whileHover={{ y: -4 }}
                                    className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-lg"
                                >
                                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0b3fd1]">
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <h3 className="mb-2 text-[18px] font-bold text-[#0a1170]">
                                        {c.title}
                                    </h3>
                                    <div className="space-y-1 text-[14px] text-slate-600">
                                        {c.lines.map((l) => (
                                            <p key={l}>{l}</p>
                                        ))}
                                    </div>
                                    {c.action && (
                                        <a
                                            href={c.action.href}
                                            className="mt-4 inline-block text-[13px] font-semibold text-[#0b3fd1] hover:underline"
                                        >
                                            {c.action.label} →
                                        </a>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </Wrapper>
            </section>

            {/* ─── FORM + SIDEBAR ─── */}
            <section className="bg-white py-16 sm:py-24">
                <Wrapper>
                    <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-16">
                        {/* Form */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={stagger}
                        >
                            <motion.h2
                                variants={fadeUp}
                                className="text-3xl font-bold text-[#0a1170] sm:text-4xl"
                            >
                                Send us a message
                            </motion.h2>
                            <motion.p
                                variants={fadeUp}
                                className="mt-3 mb-8 text-[16px] text-slate-600"
                            >
                                Fill in the form below and our team will get
                                back to you within 24 hours.
                            </motion.p>

                            <motion.form
                                variants={fadeUp}
                                onSubmit={(e) => e.preventDefault()}
                                className="space-y-4"
                            >
                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="text"
                                        placeholder="Full Name *"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                    />
                                    <input
                                        type="email"
                                        placeholder="Email Address *"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                    />
                                </div>

                                <div className="grid gap-4 sm:grid-cols-2">
                                    <input
                                        type="tel"
                                        placeholder="Phone Number *"
                                        required
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                    />
                                    <input
                                        type="text"
                                        placeholder="Organization (optional)"
                                        className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                    />
                                </div>

                                <select
                                    required
                                    defaultValue=""
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                >
                                    <option value="" disabled>
                                        Which service are you interested in? *
                                    </option>
                                    {SERVICE_OPTIONS.map((s) => (
                                        <option key={s} value={s}>
                                            {s}
                                        </option>
                                    ))}
                                </select>

                                <textarea
                                    rows={6}
                                    placeholder="Tell us about your project *"
                                    required
                                    className="w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-[15px] text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-2 focus:ring-[#0b3fd1]/20"
                                />

                                <button
                                    type="submit"
                                    className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#0b3fd1] px-8 py-4 text-[15px] font-semibold text-white shadow-lg transition hover:bg-[#0a1170] sm:w-auto"
                                >
                                    Send Message
                                    <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </button>
                            </motion.form>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.15 }}
                            variants={stagger}
                            className="space-y-6"
                        >
                            {/* Quick help */}
                            <motion.div
                                variants={fadeUp}
                                className="rounded-2xl bg-[#f8f9fa] p-6"
                            >
                                <h3 className="mb-4 text-[18px] font-bold text-[#0a1170]">
                                    Quick help
                                </h3>
                                <div className="space-y-3">
                                    {QUICK_HELP.map((q) => {
                                        const Icon = q.icon;
                                        return (
                                            <a
                                                key={q.title}
                                                href={q.href}
                                                className="group flex items-start gap-3 rounded-xl bg-white p-3.5 transition hover:shadow-md"
                                            >
                                                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#0b3fd1]">
                                                    <Icon className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <p className="text-[14px] font-bold text-[#0a1170]">
                                                        {q.title}
                                                    </p>
                                                    <p className="text-[12.5px] text-slate-600">
                                                        {q.description}
                                                    </p>
                                                </div>
                                            </a>
                                        );
                                    })}
                                </div>
                            </motion.div>

                            {/* Office block */}
                            <motion.div
                                variants={fadeUp}
                                className="rounded-2xl bg-gradient-to-br from-[#0b3fd1] to-[#0a1170] p-6 text-white"
                            >
                                <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/15">
                                    <Building2 className="h-5 w-5" />
                                </div>
                                <h3 className="text-[18px] font-bold">
                                    Head Office
                                </h3>
                                <p className="mt-2 text-[14px] leading-relaxed text-white/85">
                                    {CONTACT.address}
                                    <br />
                                    Kitui County, Kenya
                                </p>
                                <div className="mt-4 space-y-2 text-[14px]">
                                    {CONTACT.phones.map((p) => (
                                        <a
                                            key={p}
                                            href={`tel:${p}`}
                                            className="block hover:text-white/80"
                                        >
                                            {p}
                                        </a>
                                    ))}
                                    <a
                                        href={`mailto:${CONTACT.email}`}
                                        className="block hover:text-white/80"
                                    >
                                        {CONTACT.email}
                                    </a>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                variants={fadeUp}
                                className="overflow-hidden rounded-2xl bg-slate-100"
                            >
                                <iframe
                                    title="Frajosan Technologies location"
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(CONTACT.address + " Kitui Kenya")}&output=embed`}
                                    className="h-[220px] w-full border-0"
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                />
                            </motion.div>
                        </motion.div>
                    </div>
                </Wrapper>
            </section>
        </>
    );
}

// Attach GuestLayout as a persistent layout so the navbar/footer don't re-mount
ContactPage.layout = (page: React.ReactNode) => (
    <GuestLayout>{page}</GuestLayout>
);

export default ContactPage;
