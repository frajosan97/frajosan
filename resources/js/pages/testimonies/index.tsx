// resources/js/pages/testimonies/index.tsx
import { Head, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Search,
    ChevronLeft,
    ChevronRight,
    MessageSquareQuote,
    Star,
    Eye,
    Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import type { Paginated, Testimony } from "@/types";
import { route } from "ziggy-js";

interface Props {
    testimonies: Paginated<Testimony>;
    filters: { search?: string };
}

function Stars({ rating }: { rating: number }) {
    return (
        <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <Star
                    key={i}
                    className={
                        i < rating
                            ? "h-3.5 w-3.5 fill-yellow-400 text-yellow-400"
                            : "h-3.5 w-3.5 text-muted-foreground/40"
                    }
                />
            ))}
        </div>
    );
}

export default function TestimoniesIndex({ testimonies, filters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;
    const [search, setSearch] = useState(filters.search ?? "");
    const [deleteTarget, setDeleteTarget] = useState<Testimony | null>(null);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.testimonies.index"),
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("admin.testimonies.destroy", deleteTarget.id), {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <>
            <Head title="Testimonies" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Testimonies
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Submitted by the public. Review, toggle visibility,
                            or remove inappropriate entries.
                        </p>
                    </div>
                    {/* No "New" button — testimonies come from public reports */}
                </div>

                {/* Flash */}
                {flash?.success && (
                    <div className="rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm text-green-800">
                        {flash.success}
                    </div>
                )}

                {/* Search */}
                <form
                    onSubmit={submitSearch}
                    className="flex max-w-sm items-center gap-2"
                >
                    <div className="relative w-full">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by name, role, or quote…"
                            className="pl-8"
                        />
                    </div>
                    <Button type="submit" variant="secondary">
                        Search
                    </Button>
                </form>

                {/* Table */}
                <div className="rounded-lg border bg-card">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-16">Order</TableHead>
                                <TableHead>Person</TableHead>
                                <TableHead className="hidden w-40 md:table-cell">
                                    Rating
                                </TableHead>
                                <TableHead>Quote</TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead className="w-24 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {testimonies.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={6}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <MessageSquareQuote className="h-8 w-8" />
                                            <span>
                                                No testimonies submitted yet.
                                            </span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}

                            {testimonies.data.map((t) => (
                                <TableRow key={t.id}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {t.sort_order}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {t.image ? (
                                                <img
                                                    src={t.image}
                                                    alt={t.name}
                                                    className="h-9 w-9 rounded-full object-cover"
                                                />
                                            ) : (
                                                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                                                    {t.name
                                                        .slice(0, 1)
                                                        .toUpperCase()}
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {t.name}
                                                </span>
                                                <span className="text-xs text-muted-foreground">
                                                    {t.role}
                                                </span>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell">
                                        <Stars rating={t.rating} />
                                    </TableCell>
                                    <TableCell className="max-w-md">
                                        <span className="line-clamp-2 text-sm text-muted-foreground">
                                            “{t.quote}”
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {t.is_active ? (
                                            <Badge variant="default">
                                                Visible
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Hidden
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-1">
                                            <Button
                                                asChild
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <a
                                                    href={route(
                                                        "admin.testimonies.show",
                                                        t.id,
                                                    )}
                                                    aria-label="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </a>
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() =>
                                                    setDeleteTarget(t)
                                                }
                                                aria-label="Delete"
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                {testimonies.last_page > 1 && (
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            Showing {testimonies.from}–{testimonies.to} of{" "}
                            {testimonies.total}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!testimonies.prev_page_url}
                                onClick={() =>
                                    testimonies.prev_page_url &&
                                    router.get(
                                        testimonies.prev_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {testimonies.current_page} of{" "}
                                {testimonies.last_page}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!testimonies.next_page_url}
                                onClick={() =>
                                    testimonies.next_page_url &&
                                    router.get(
                                        testimonies.next_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                Next
                                <ChevronRight className="ml-1 h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            </div>

            {/* Delete / moderation confirmation */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Remove testimony?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently remove the testimony from{" "}
                            <strong>{deleteTarget?.name}</strong>. This action
                            cannot be undone.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={confirmDelete}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            Remove
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
