// resources/js/pages/products/Show.tsx

import { Head, Link, router } from "@inertiajs/react";
import { useState } from "react";
import {
    Pencil,
    Trash2,
    ExternalLink,
    CalendarDays,
    ArrowUpDown,
    ImageOff,
    Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { destroy, edit, index } from "@/routes/admin/products";
import type { Product } from "@/types";

interface Props {
    product: Product;
}

const formatDate = (value: string | Date) =>
    new Date(value).toLocaleDateString(undefined, {
        year: "numeric",
        month: "short",
        day: "numeric",
    });

export default function ProductsShow({ product }: Props) {
    const [confirmOpen, setConfirmOpen] = useState(false);

    const confirmDelete = () => {
        router.delete(destroy(product.slug).url, {
            onFinish: () => setConfirmOpen(false),
        });
    };

    return (
        <>
            <Head title={product.title} />

            <div className="mx-auto max-w-6xl space-y-8 p-4 md:p-6">
                {/* Hero header */}
                <header className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                    <div className="space-y-2">
                        <div className="flex flex-wrap items-center gap-3">
                            <h1 className="text-3xl font-bold tracking-tight">
                                {product.title}
                            </h1>
                            <Badge
                                variant={
                                    product.is_active ? "default" : "secondary"
                                }
                            >
                                {product.is_active ? "Active" : "Inactive"}
                            </Badge>
                        </div>
                        {product.tagline && (
                            <p className="max-w-2xl text-base text-muted-foreground">
                                {product.tagline}
                            </p>
                        )}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                            <span className="font-mono">/{product.slug}</span>
                            <span className="flex items-center gap-1">
                                <CalendarDays className="h-3.5 w-3.5" />
                                Updated {formatDate(product.updated_at)}
                            </span>
                        </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                        <Button variant="outline" asChild>
                            <Link href={edit(product.slug).url}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="destructive"
                            onClick={() => setConfirmOpen(true)}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                    </div>
                </header>

                {/* Content grid */}
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Main content — left, spans 2 cols */}
                    <article className="space-y-6 lg:col-span-2">
                        {/* Hero image */}
                        <div className="aspect-video overflow-hidden rounded-xl border bg-muted">
                            {product.image ? (
                                <img
                                    src={product.image}
                                    alt={product.title}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-full flex-col items-center justify-center gap-2 text-sm text-muted-foreground">
                                    <ImageOff className="h-8 w-8" />
                                    No hero image
                                </div>
                            )}
                        </div>

                        {/* Body */}
                        <section>
                            <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                <Sparkles className="h-4 w-4" />
                                Description
                            </h2>
                            {product.body ? (
                                <div
                                    className="prose prose-sm max-w-none dark:prose-invert prose-headings:font-semibold prose-a:text-primary"
                                    dangerouslySetInnerHTML={{
                                        __html: product.body,
                                    }}
                                />
                            ) : (
                                <p className="text-sm italic text-muted-foreground">
                                    No description yet.
                                </p>
                            )}
                        </section>

                        {/* Public link */}
                        <Button variant="outline" asChild>
                            <a
                                href={`/products/${product.slug}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View public page
                            </a>
                        </Button>
                    </article>

                    {/* Sidebar — right, 1 col */}
                    <aside className="space-y-6 lg:sticky lg:top-6 lg:self-start">
                        {/* Meta card */}
                        <div className="rounded-xl border bg-card p-5 shadow-sm">
                            <h2 className="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                                Details
                            </h2>
                            <dl className="space-y-4 text-sm">
                                <div className="flex items-start justify-between gap-4">
                                    <dt className="text-muted-foreground">
                                        Icon
                                    </dt>
                                    <dd className="rounded bg-muted px-2 py-0.5 font-mono text-xs">
                                        {product.icon || "—"}
                                    </dd>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <dt className="flex items-center gap-1 text-muted-foreground">
                                        <ArrowUpDown className="h-3.5 w-3.5" />
                                        Sort order
                                    </dt>
                                    <dd className="font-mono">
                                        {product.sort_order}
                                    </dd>
                                </div>
                                <div className="flex items-start justify-between gap-4 border-t pt-4">
                                    <dt className="text-muted-foreground">
                                        Created
                                    </dt>
                                    <dd>{formatDate(product.created_at)}</dd>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <dt className="text-muted-foreground">
                                        Updated
                                    </dt>
                                    <dd>{formatDate(product.updated_at)}</dd>
                                </div>
                            </dl>
                        </div>
                    </aside>
                </div>
            </div>

            {/* Delete confirmation */}
            <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete{" "}
                            <strong>{product.title}</strong> and its uploaded
                            image. This action cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
