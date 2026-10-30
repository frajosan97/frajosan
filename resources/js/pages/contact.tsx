import { Head, useForm, usePage } from "@inertiajs/react";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
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
    CheckCircle2,
    Loader2,
    Sparkles,
    ArrowRight,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import GuestLayout from "@/layouts/guest-layout";
import Wrapper from "@/layouts/app/wrapper";
import {
    CONTACT,
    BRAND,
    ICON_KEYS,
    type IconKey,
} from "@/components/constants/constants";
import { fadeUp, stagger } from "@/lib/motion";

/* ────────────────────────── types ────────────────────────── */

type CatalogItem = {
    id: number | string;
    title: string;
    slug?: string;
    tagline?: string | null;
    icon?: string | null;
    type?: "core" | "addon"; // services only
};

type PageProps = {
    products?: CatalogItem[];
    services?: CatalogItem[];
    meta?: {
        can_submit?: boolean;
        form_nonce?: number;
        recaptcha_enabled?: boolean;
    };
    flash?: { success?: string; toast?: { type: string; message: string } };
};

type CatalogType = "" | "product" | "service";

/* ────────────────────────── icon resolver ────────────────────────── */

function resolveIcon(name?: string | null) {
    if (!name) return null;
    if (!(ICON_KEYS as readonly string[]).includes(name)) return null;
    const Comp = (
        LucideIcons as unknown as Record<
            string,
            React.ComponentType<{ className?: string }>
        >
    )[name];
    return Comp ?? null;
}

/* ────────────────────────── static data ────────────────────────── */

const CONTACT_CARDS = [
    {
        icon: MapPin,
        title: "Visit Us",
        lines: [CONTACT.address, "Kitui County, Kenya"],
        action: {
            label: "Get directions",
            href: `https://maps.google.com/?q=${encodeURIComponent(
                CONTACT.address + " Kitui Kenya",
            )}`,
        },
    },
    {
        icon: Phone,
        title: "Call Us",
        lines: CONTACT.phones,
        action: { label: "Call now", href: `tel:${CONTACT.phones[0]}` },
    },
    {
        icon: Mail,
        title: "Email Us",
        lines: [CONTACT.email],
        action: { label: "Send email", href: `mailto:${CONTACT.email}` },
    },
    {
        icon: Clock,
        title: "Working Hours",
        lines: ["Mon – Fri · 8:00 – 17:00", "Sat · 9:00 – 13:00"],
    },
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

/* ────────────────────────── page ────────────────────────── */

function ContactPage() {
    const { props } = usePage<PageProps>();
    const products = props.products ?? [];
    const services = props.services ?? [];
    const recaptchaEnabled = props.meta?.recaptcha_enabled ?? false;

    const [formStartedAt] = useState(() => Math.floor(Date.now() / 1000));
    const [tab, setTab] = useState<Exclude<CatalogType, "">>("service");
    const [submitted, setSubmitted] = useState(false);

    const form = useForm({
        name: "",
        email: "",
        phone: "",
        organization: "",
        catalog_type: "" as CatalogType,
        catalog_id: "" as string | number,
        message: "",
        website: "",
        form_started_at: formStartedAt,
        "g-recaptcha-response": "",
    });

    const catalog = useMemo(
        () => ({ product: products, service: services }),
        [products, services],
    );
    const options = catalog[tab];

    const selectedItem = useMemo(
        () =>
            options.find(
                (o) => String(o.id) === String(form.data.catalog_id),
            ) ?? null,
        [options, form.data.catalog_id],
    );

    const SelectedIcon = resolveIcon(selectedItem?.icon);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        form.post("/contact", {
            preserveScroll: true,
            onSuccess: () => {
                form.reset(
                    "name",
                    "email",
                    "phone",
                    "organization",
                    "catalog_type",
                    "catalog_id",
                    "message",
                );
                setSubmitted(true);
                setTimeout(() => setSubmitted(false), 8000);
            },
        });
    };

    const selectTab = (next: Exclude<CatalogType, "">) => {
        setTab(next);
        form.setData((d) => ({
            ...d,
            catalog_type: next,
            catalog_id: "",
        }));
    };

    /* ── shared style tokens ── */
    const field =
        "w-full rounded-xl border border-slate-200 bg-slate-50/60 px-4 py-3.5 text-[15px] text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-[#0b3fd1] focus:bg-white focus:ring-4 focus:ring-[#0b3fd1]/10 disabled:cursor-not-allowed disabled:opacity-60";
    const fieldError =
        "border-red-300 bg-red-50/40 focus:border-red-500 focus:ring-red-500/10";
    const label =
        "mb-1.5 block text-[12px] font-semibold uppercase tracking-wide text-slate-500";
    const errorText = "mt-1 text-[12px] font-medium text-red-600";

    return (
        <>
            <Head title={`Contact — ${BRAND}`}>
                <meta
                    name="description"
                    content={`Get in touch with ${BRAND}. Call ${CONTACT.phones.join(
                        " or ",
                    )}, email ${CONTACT.email}, or visit us at ${CONTACT.address}, Kitui.`}
                />
                {recaptchaEnabled && (
                    <script
                        src="https://www.google.com/recaptcha/api.js?render=explicit"
                        async
                        defer
                    />
                )}
            </Head>

            {/* ─── HERO ─── */}
            <section className="relative overflow-hidden bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1] text-white">
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#fff 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4a8dff]/30 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-52 -left-20 h-[420px] w-[420px] rounded-full bg-[#22d3ee]/20 blur-3xl" />

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
                            <Sparkles className="h-4 w-4" />
                            <span className="text-[12px] font-bold uppercase tracking-[0.15em]">
                                Get in touch
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={fadeUp}
                            className="text-4xl font-bold leading-[1.1] tracking-tight sm:text-5xl lg:text-[58px]"
                        >
                            Let&apos;s build something
                            <span className="bg-gradient-to-r from-white to-[#a5c8ff] bg-clip-text text-transparent">
                                {" "}
                                great together
                            </span>
                        </motion.h1>

                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-6 max-w-xl text-[16px] leading-relaxed text-white/85 sm:text-[18px]"
                        >
                            Whether you&apos;re a school, hospital, SACCO or
                            business — tell us what you need and we&apos;ll
                            reply within one working day.
                        </motion.p>
                    </motion.div>
                </Wrapper>
            </section>

            {/* ─── CONTACT CARDS ─── */}
            <section
                className="relative bg-[#f8f9fa] py-16 sm:py-20"
                id="contacts-section"
            >
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
                                    className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-100 transition hover:shadow-xl"
                                >
                                    <div className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-[#0b3fd1] transition group-hover:bg-[#0b3fd1] group-hover:text-white">
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
                                            className="mt-4 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0b3fd1] hover:underline"
                                        >
                                            {c.action.label}
                                            <ArrowRight className="h-3.5 w-3.5" />
                                        </a>
                                    )}
                                </motion.div>
                            );
                        })}
                    </motion.div>
                </Wrapper>
            </section>

            {/* ─── FORM + SIDEBAR ─── */}
            <section className="bg-white py-16 sm:py-24" id="message-section">
                <Wrapper>
                    <div className="grid gap-12 lg:grid-cols-[1.25fr_1fr] lg:gap-16">
                        {/* ── FORM ── */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.1 }}
                            variants={stagger}
                        >
                            <motion.div variants={fadeUp}>
                                <span className="text-[12px] font-bold uppercase tracking-[0.2em] text-[#0b3fd1]">
                                    Send a message
                                </span>
                                <h2 className="mt-2 text-3xl font-bold text-[#0a1170] sm:text-4xl">
                                    Tell us about your project
                                </h2>
                                <p className="mt-3 mb-8 text-[16px] text-slate-600">
                                    Pick a product or service below (optional),
                                    or just describe what you need.
                                </p>
                            </motion.div>

                            <AnimatePresence mode="wait">
                                {submitted ? (
                                    <motion.div
                                        key="success"
                                        initial={{ opacity: 0, y: 12 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -12 }}
                                        className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6"
                                    >
                                        <div className="flex items-start gap-3">
                                            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-600" />
                                            <div>
                                                <p className="font-bold text-emerald-900">
                                                    Message received
                                                </p>
                                                <p className="mt-1 text-[14px] text-emerald-800">
                                                    Thanks! Our team will get
                                                    back to you within one
                                                    working day.
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ) : (
                                    <motion.form
                                        key="form"
                                        variants={fadeUp}
                                        onSubmit={submit}
                                        className="space-y-5"
                                        noValidate
                                    >
                                        {/* Honeypot */}
                                        <input
                                            type="text"
                                            name="website"
                                            tabIndex={-1}
                                            autoComplete="off"
                                            value={form.data.website}
                                            onChange={(e) =>
                                                form.setData(
                                                    "website",
                                                    e.target.value,
                                                )
                                            }
                                            style={{
                                                position: "absolute",
                                                left: "-9999px",
                                                width: 1,
                                                height: 1,
                                                opacity: 0,
                                            }}
                                            aria-hidden="true"
                                        />

                                        {/* Time-trap */}
                                        <input
                                            type="hidden"
                                            name="form_started_at"
                                            value={form.data.form_started_at}
                                        />

                                        {/* ── Product / Service tabs ── */}
                                        <div>
                                            <label className={label}>
                                                What are you interested in?
                                            </label>

                                            <div className="mb-3 inline-flex rounded-full bg-slate-100 p-1">
                                                {(
                                                    [
                                                        "service",
                                                        "product",
                                                    ] as const
                                                ).map((k) => (
                                                    <button
                                                        key={k}
                                                        type="button"
                                                        onClick={() =>
                                                            selectTab(k)
                                                        }
                                                        className={`rounded-full px-4 py-1.5 text-[13px] font-semibold capitalize transition ${
                                                            tab === k
                                                                ? "bg-white text-[#0a1170] shadow"
                                                                : "text-slate-500 hover:text-slate-800"
                                                        }`}
                                                    >
                                                        {k}s
                                                        {catalog[k].length >
                                                            0 && (
                                                            <span className="ml-1.5 rounded-full bg-[#0b3fd1]/10 px-1.5 text-[11px] text-[#0b3fd1]">
                                                                {
                                                                    catalog[k]
                                                                        .length
                                                                }
                                                            </span>
                                                        )}
                                                    </button>
                                                ))}
                                            </div>

                                            <div className="relative">
                                                <select
                                                    value={form.data.catalog_id}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "catalog_id",
                                                            e.target.value,
                                                        )
                                                    }
                                                    className={`${field} appearance-none pr-10`}
                                                >
                                                    <option value="">
                                                        Select a{" "}
                                                        {tab === "service"
                                                            ? "service"
                                                            : "product"}{" "}
                                                        (optional)
                                                    </option>
                                                    {options.map((o) => (
                                                        <option
                                                            key={o.id}
                                                            value={o.id}
                                                        >
                                                            {o.title}
                                                            {o.type === "addon"
                                                                ? " (add-on)"
                                                                : ""}
                                                        </option>
                                                    ))}
                                                </select>
                                                <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                                                    ▾
                                                </span>
                                            </div>

                                            {/* Selected item preview */}
                                            {selectedItem && (
                                                <div className="mt-3 flex items-start gap-2.5 rounded-xl bg-blue-50/60 p-3 ring-1 ring-blue-100">
                                                    {SelectedIcon ? (
                                                        <SelectedIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#0b3fd1]" />
                                                    ) : (
                                                        <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-[#0b3fd1]" />
                                                    )}
                                                    <div className="min-w-0">
                                                        <div className="flex flex-wrap items-center gap-2">
                                                            <p className="text-[13.5px] font-bold text-[#0a1170]">
                                                                {
                                                                    selectedItem.title
                                                                }
                                                            </p>
                                                            {selectedItem.type ===
                                                                "addon" && (
                                                                <span className="rounded-full bg-[#0b3fd1]/10 px-2 py-0.5 text-[10.5px] font-bold uppercase tracking-wide text-[#0b3fd1]">
                                                                    Add-on
                                                                </span>
                                                            )}
                                                        </div>
                                                        {selectedItem.tagline && (
                                                            <p className="mt-0.5 text-[12.5px] leading-relaxed text-slate-600">
                                                                {
                                                                    selectedItem.tagline
                                                                }
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                            )}

                                            {form.errors.catalog_id && (
                                                <p className={errorText}>
                                                    {form.errors.catalog_id}
                                                </p>
                                            )}
                                        </div>

                                        {/* ── Name + Email ── */}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className={label}>
                                                    Full name *
                                                </label>
                                                <input
                                                    type="text"
                                                    value={form.data.name}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "name",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Jane Doe"
                                                    autoComplete="name"
                                                    className={`${field} ${
                                                        form.errors.name
                                                            ? fieldError
                                                            : ""
                                                    }`}
                                                />
                                                {form.errors.name && (
                                                    <p className={errorText}>
                                                        {form.errors.name}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className={label}>
                                                    Email *
                                                </label>
                                                <input
                                                    type="email"
                                                    value={form.data.email}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "email",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="jane@school.ac.ke"
                                                    autoComplete="email"
                                                    className={`${field} ${
                                                        form.errors.email
                                                            ? fieldError
                                                            : ""
                                                    }`}
                                                />
                                                {form.errors.email && (
                                                    <p className={errorText}>
                                                        {form.errors.email}
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* ── Phone + Org ── */}
                                        <div className="grid gap-4 sm:grid-cols-2">
                                            <div>
                                                <label className={label}>
                                                    Phone *
                                                </label>
                                                <input
                                                    type="tel"
                                                    value={form.data.phone}
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "phone",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="0712 345 678"
                                                    autoComplete="tel"
                                                    className={`${field} ${
                                                        form.errors.phone
                                                            ? fieldError
                                                            : ""
                                                    }`}
                                                />
                                                {form.errors.phone && (
                                                    <p className={errorText}>
                                                        {form.errors.phone}
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className={label}>
                                                    Organization
                                                </label>
                                                <input
                                                    type="text"
                                                    value={
                                                        form.data.organization
                                                    }
                                                    onChange={(e) =>
                                                        form.setData(
                                                            "organization",
                                                            e.target.value,
                                                        )
                                                    }
                                                    placeholder="Optional"
                                                    autoComplete="organization"
                                                    className={`${field} ${
                                                        form.errors.organization
                                                            ? fieldError
                                                            : ""
                                                    }`}
                                                />
                                                {form.errors.organization && (
                                                    <p className={errorText}>
                                                        {
                                                            form.errors
                                                                .organization
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </div>

                                        {/* ── Message ── */}
                                        <div>
                                            <label className={label}>
                                                Message *
                                            </label>
                                            <textarea
                                                rows={5}
                                                value={form.data.message}
                                                onChange={(e) =>
                                                    form.setData(
                                                        "message",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="Tell us about your project, timeline, and any specifics…"
                                                className={`${field} resize-y ${
                                                    form.errors.message
                                                        ? fieldError
                                                        : ""
                                                }`}
                                            />
                                            {form.errors.message && (
                                                <p className={errorText}>
                                                    {form.errors.message}
                                                </p>
                                            )}
                                        </div>

                                        {/* ── Submit ── */}
                                        <div className="flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
                                            <button
                                                type="submit"
                                                disabled={form.processing}
                                                className="group inline-flex items-center justify-center gap-2 rounded-full bg-[#0b3fd1] px-8 py-4 text-[15px] font-semibold text-white shadow-lg shadow-[#0b3fd1]/20 transition hover:bg-[#0a1170] disabled:cursor-not-allowed disabled:opacity-70"
                                            >
                                                {form.processing ? (
                                                    <>
                                                        <Loader2 className="h-4 w-4 animate-spin" />
                                                        Sending…
                                                    </>
                                                ) : (
                                                    <>
                                                        Send Message
                                                        <Send className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                                    </>
                                                )}
                                            </button>

                                            {form.progress && (
                                                <div className="h-1.5 w-full max-w-[180px] overflow-hidden rounded-full bg-slate-100">
                                                    <div
                                                        className="h-full rounded-full bg-[#0b3fd1] transition-all"
                                                        style={{
                                                            width: `${form.progress.percentage}%`,
                                                        }}
                                                    />
                                                </div>
                                            )}
                                        </div>

                                        <p className="text-[12px] text-slate-400">
                                            We&apos;ll only use your details to
                                            respond to this enquiry.
                                        </p>
                                    </motion.form>
                                )}
                            </AnimatePresence>
                        </motion.div>

                        {/* ── SIDEBAR ── */}
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
                                                <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#0b3fd1] transition group-hover:bg-[#0b3fd1] group-hover:text-white">
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
                                className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b3fd1] to-[#0a1170] p-6 text-white"
                            >
                                <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
                                <div className="relative">
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
                                                className="block transition hover:text-white/70"
                                            >
                                                {p}
                                            </a>
                                        ))}
                                        <a
                                            href={`mailto:${CONTACT.email}`}
                                            className="block transition hover:text-white/70"
                                        >
                                            {CONTACT.email}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Map */}
                            <motion.div
                                variants={fadeUp}
                                className="overflow-hidden rounded-2xl bg-slate-100 ring-1 ring-slate-200"
                            >
                                <iframe
                                    title="Frajosan Technologies location"
                                    src={`https://www.google.com/maps?q=${encodeURIComponent(
                                        CONTACT.address + " Kitui Kenya",
                                    )}&output=embed`}
                                    className="h-[240px] w-full border-0"
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

ContactPage.layout = (page: React.ReactNode) => (
    <GuestLayout>{page}</GuestLayout>
);

export default ContactPage;
