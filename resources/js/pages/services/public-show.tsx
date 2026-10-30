// resources/js/pages/services/public-show.tsx

import { useState } from "react";
import { Head, Link } from "@inertiajs/react";
import {
    ArrowRight,
    Sparkles,
    CalendarDays,
    Star,
    Puzzle,
    UserPlus,
    X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GuestLayout from "@/layouts/guest-layout";
import type { Service } from "@/types";
import { SmsSignupForm } from "@/components/sms-signup-form";

interface Props {
    service: Service;
    related?: Service[];
}

const formatDate = (value: string | Date) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

function PublicShowPage({ service, related = [] }: Props) {
    const [signupOpen, setSignupOpen] = useState(false);

    const pageTitle = `${service.title} — Edupulse Analytics`;
    const metaDescription =
        service.tagline ||
        (service.body
            ? service.body
                  .replace(/<[^>]+>/g, "")
                  .slice(0, 155)
                  .trim() + "…"
            : service.title);

    const isCore = service.type === "core";
    const isBulkSms = service.slug === "bulk-sms";

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={metaDescription} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={service.title} />
                <meta property="og:description" content={metaDescription} />
                {service.image && (
                    <meta property="og:image" content={service.image} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={service.title} />
                <meta name="twitter:description" content={metaDescription} />
                {service.image && (
                    <meta name="twitter:image" content={service.image} />
                )}
            </Head>

            <div
                id="service"
                className="overflow-x-hidden bg-white font-['Poppins',sans-serif] text-[16px] text-slate-600 antialiased"
            >
                {/* ─── HERO with image as background ─── */}
                <section className="relative overflow-hidden">
                    {/* Background image */}
                    {service.image ? (
                        <img
                            src={service.image}
                            alt={service.title}
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                    ) : (
                        <div className="absolute inset-0 bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1]" />
                    )}

                    {/* Dark overlay for legibility */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0a1170]/90 via-[#0a1170]/70 to-[#0b3fd1]/80" />
                    <div className="absolute inset-0 bg-black/20" />

                    {/* Content */}
                    <div className="relative mx-auto max-w-6xl px-4 py-20 text-white md:px-6 md:py-28 lg:py-32">
                        <div className="max-w-2xl space-y-5">
                            {/* Type + featured badges */}
                            <div className="flex flex-wrap gap-2">
                                <Badge
                                    variant="secondary"
                                    className="gap-1 bg-white/15 text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    {isCore ? (
                                        <Star className="h-3 w-3" />
                                    ) : (
                                        <Puzzle className="h-3 w-3" />
                                    )}
                                    {isCore ? "Core service" : "Add-on"}
                                </Badge>

                                {service.is_active && (
                                    <Badge
                                        variant="secondary"
                                        className="gap-1 bg-white/15 text-white backdrop-blur-sm hover:bg-white/20"
                                    >
                                        <Sparkles className="h-3 w-3" />
                                        Featured
                                    </Badge>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                                {service.title}
                            </h1>

                            {service.tagline && (
                                <p className="max-w-xl text-base text-white/85 sm:text-lg">
                                    {service.tagline}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button size="lg" asChild>
                                    <a href="#overview">
                                        Learn more
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>

                                {isBulkSms && (
                                    <Button
                                        size="lg"
                                        variant="secondary"
                                        className="bg-white text-[#0a1170] hover:bg-white/90"
                                        onClick={() => setSignupOpen(true)}
                                    >
                                        <UserPlus className="mr-2 h-4 w-4" />
                                        Create an account
                                    </Button>
                                )}

                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20 hover:text-white"
                                    asChild
                                >
                                    <Link href="/contact">Book a demo</Link>
                                </Button>
                            </div>

                            <p className="flex items-center gap-2 pt-2 text-xs text-white/70">
                                <CalendarDays className="h-3.5 w-3.5" />
                                Updated {formatDate(service.updated_at)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Body / overview */}
                <section
                    id="overview"
                    className="mx-auto max-w-4xl px-4 py-16 md:px-6"
                >
                    {service.body ? (
                        <div
                            className="prose prose-base mx-auto max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: service.body }}
                        />
                    ) : (
                        <p className="text-center text-sm italic text-muted-foreground">
                            No content available for this service yet.
                        </p>
                    )}
                </section>
            </div>

            {/* ─── Signup Modal (Bulk SMS only) ─── */}
            {isBulkSms && signupOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="sms-signup-title"
                    onClick={() => setSignupOpen(false)}
                >
                    <div
                        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-2xl bg-white shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close button */}
                        <button
                            type="button"
                            onClick={() => setSignupOpen(false)}
                            aria-label="Close"
                            className="absolute right-4 top-4 z-10 rounded-full p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
                        >
                            <X className="h-5 w-5" />
                        </button>

                        <SmsSignupForm onSuccess={() => setSignupOpen(false)} />
                    </div>
                </div>
            )}
        </>
    );
}

// Attach GuestLayout as a persistent layout so the navbar/footer don't re-mount
PublicShowPage.layout = (page: React.ReactNode) => (
    <GuestLayout>{page}</GuestLayout>
);

export default PublicShowPage;
