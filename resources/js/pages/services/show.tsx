// resources/js/pages/services/Show.tsx
import { Head, Link, router } from "@inertiajs/react";
import {
    ChevronLeft,
    Pencil,
    Trash2,
    ExternalLink,
    Star,
    Puzzle,
    CheckCircle2,
    XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { destroy, edit, index } from "@/routes/admin/services";
import type { Service } from "@/types";

interface Props {
    service: Service;
}

export default function ServicesShow({ service }: Props) {
    const handleDelete = () => {
        if (
            confirm(`Delete "${service.title}"? This action cannot be undone.`)
        ) {
            router.delete(destroy(service.slug).url, {
                preserveScroll: true,
            });
        }
    };

    return (
        <>
            <Head title={service.title} />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            {service.title}
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            /{service.slug}
                        </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        <Button variant="outline" asChild>
                            <Link href={edit(service.slug).url}>
                                <Pencil className="mr-2 h-4 w-4" />
                                Edit
                            </Link>
                        </Button>
                        <Button
                            variant="outline"
                            className="text-destructive hover:text-destructive"
                            onClick={handleDelete}
                        >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={index().url}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Detail card */}
                <div className="rounded-lg border bg-card">
                    {/* Meta bar */}
                    <div className="flex flex-wrap items-center gap-4 border-b p-4 md:p-6">
                        <div className="flex items-center gap-2">
                            {service.type === "core" ? (
                                <Badge variant="default" className="gap-1">
                                    <Star className="h-3 w-3" />
                                    Core
                                </Badge>
                            ) : (
                                <Badge variant="secondary" className="gap-1">
                                    <Puzzle className="h-3 w-3" />
                                    Addon
                                </Badge>
                            )}
                        </div>

                        <div className="flex items-center gap-2">
                            {service.is_active ? (
                                <Badge
                                    variant="outline"
                                    className="gap-1 text-green-600"
                                >
                                    <CheckCircle2 className="h-3 w-3" />
                                    Active
                                </Badge>
                            ) : (
                                <Badge
                                    variant="outline"
                                    className="gap-1 text-muted-foreground"
                                >
                                    <XCircle className="h-3 w-3" />
                                    Inactive
                                </Badge>
                            )}
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Sort order:{" "}
                            <span className="font-medium text-foreground">
                                {service.sort_order}
                            </span>
                        </div>

                        <div className="text-sm text-muted-foreground">
                            Icon:{" "}
                            <span className="font-mono text-foreground">
                                {service.icon || "—"}
                            </span>
                        </div>

                        <Button
                            variant="ghost"
                            size="sm"
                            asChild
                            className="ml-auto"
                        >
                            <a
                                href={`/services/${service.slug}`}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <ExternalLink className="mr-2 h-4 w-4" />
                                View on site
                            </a>
                        </Button>
                    </div>

                    {/* Body */}
                    <div className="p-4 md:p-6">
                        {service.image && (
                            <img
                                src={service.image}
                                alt={service.title}
                                className="mb-6 max-h-80 w-full rounded-lg border object-cover"
                            />
                        )}

                        {service.tagline && (
                            <p className="mb-4 text-lg text-muted-foreground">
                                {service.tagline}
                            </p>
                        )}

                        {service.body ? (
                            <div
                                className="prose prose-sm max-w-none dark:prose-invert"
                                dangerouslySetInnerHTML={{
                                    __html: service.body,
                                }}
                            />
                        ) : (
                            <p className="text-sm text-muted-foreground">
                                No body content yet.
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
