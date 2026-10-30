// resources/js/pages/products/public-show.tsx

import { Head, Link } from "@inertiajs/react";
import { ArrowRight, Sparkles, CheckCircle2, CalendarDays } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import GuestLayout from "@/layouts/guest-layout";
import type { Product } from "@/types";

interface Props {
    product: Product;
    related?: Product[];
}

const formatDate = (value: string | Date) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
    });

function PublicShowPage({ product, related = [] }: Props) {
    const pageTitle = `${product.title} — Edupulse Analytics`;
    const metaDescription =
        product.tagline ||
        (product.body
            ? product.body
                  .replace(/<[^>]+>/g, "")
                  .slice(0, 155)
                  .trim() + "…"
            : product.title);

    return (
        <>
            <Head title={pageTitle}>
                <meta name="description" content={metaDescription} />

                {/* Open Graph */}
                <meta property="og:type" content="article" />
                <meta property="og:title" content={product.title} />
                <meta property="og:description" content={metaDescription} />
                {product.image && (
                    <meta property="og:image" content={product.image} />
                )}

                {/* Twitter */}
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={product.title} />
                <meta name="twitter:description" content={metaDescription} />
                {product.image && (
                    <meta name="twitter:image" content={product.image} />
                )}
            </Head>

            <div
                id="product"
                className="overflow-x-hidden bg-white font-['Poppins',sans-serif] text-[16px] text-slate-600 antialiased"
            >
                {/* ─── HERO with image as background ─── */}
                <section className="relative overflow-hidden">
                    {/* Background image */}
                    {product.image ? (
                        <img
                            src={product.image}
                            alt={product.title}
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
                            {product.is_active && (
                                <Badge
                                    variant="secondary"
                                    className="gap-1 bg-white/15 text-white backdrop-blur-sm hover:bg-white/20"
                                >
                                    <Sparkles className="h-3 w-3" />
                                    Featured product
                                </Badge>
                            )}

                            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl">
                                {product.title}
                            </h1>

                            {product.tagline && (
                                <p className="max-w-xl text-base text-white/85 sm:text-lg">
                                    {product.tagline}
                                </p>
                            )}

                            <div className="flex flex-wrap gap-3 pt-2">
                                <Button size="lg" asChild>
                                    <a href="#overview">
                                        Learn more
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </a>
                                </Button>
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
                                Updated {formatDate(product.updated_at)}
                            </p>
                        </div>
                    </div>
                </section>

                {/* Body / overview */}
                <section
                    id="overview"
                    className="mx-auto max-w-4xl px-4 py-16 md:px-6"
                >
                    {product.body ? (
                        <div
                            className="prose prose-base mx-auto max-w-none dark:prose-invert prose-headings:font-semibold prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-img:rounded-xl prose-img:shadow-md"
                            dangerouslySetInnerHTML={{ __html: product.body }}
                        />
                    ) : (
                        <p className="text-center text-sm italic text-muted-foreground">
                            No content available for this product yet.
                        </p>
                    )}
                </section>
            </div>
        </>
    );
}

// Attach GuestLayout as a persistent layout so the navbar/footer don't re-mount
PublicShowPage.layout = (page: React.ReactNode) => (
    <GuestLayout>{page}</GuestLayout>
);

export default PublicShowPage;
