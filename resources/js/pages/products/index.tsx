// resources/js/pages/products/Index.tsx
import { Head, Link, router, usePage } from "@inertiajs/react";
import { useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    Eye,
    ChevronLeft,
    ChevronRight,
    Package,
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
import type { Paginated, Product } from "@/types";
import { route } from "ziggy-js";

interface Props {
    products: Paginated<Product>;
    filters: { search?: string };
}

export default function ProductsIndex({ products, filters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;
    const [search, setSearch] = useState(filters.search ?? "");
    const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.products.index"),
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("admin.products.destroy", deleteTarget.slug), {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <>
            <Head title="Products" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Products
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage the products shown on the public site.
                        </p>
                    </div>
                    <Button asChild>
                        <Link href={route("admin.products.create")}>
                            <Plus className="mr-2 h-4 w-4" />
                            New Product
                        </Link>
                    </Button>
                </div>

                {/* Flash message */}
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
                            placeholder="Search by title or tagline…"
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
                                <TableHead>Product</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    Tagline
                                </TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead className="w-32 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {products.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Package className="h-8 w-8" />
                                            <span>No products found.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}

                            {products.data.map((product) => (
                                <TableRow key={product.id}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {product.sort_order}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col">
                                            <span className="font-medium">
                                                {product.title}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                /{product.slug}
                                            </span>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden max-w-md md:table-cell">
                                        <span className="line-clamp-2 text-sm text-muted-foreground">
                                            {product.tagline}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        {product.is_active ? (
                                            <Badge variant="default">
                                                Active
                                            </Badge>
                                        ) : (
                                            <Badge variant="secondary">
                                                Inactive
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
                                                <Link
                                                    href={route(
                                                        "admin.products.show",
                                                        product.slug,
                                                    )}
                                                    aria-label="View"
                                                >
                                                    <Eye className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                asChild
                                                size="icon"
                                                variant="ghost"
                                            >
                                                <Link
                                                    href={route(
                                                        "admin.products.edit",
                                                        product.slug,
                                                    )}
                                                    aria-label="Edit"
                                                >
                                                    <Pencil className="h-4 w-4" />
                                                </Link>
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() =>
                                                    setDeleteTarget(product)
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
                {products.last_page > 1 && (
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            Showing {products.from}–{products.to} of{" "}
                            {products.total}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!products.prev_page_url}
                                onClick={() =>
                                    products.prev_page_url &&
                                    router.get(
                                        products.prev_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {products.current_page} of{" "}
                                {products.last_page}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!products.next_page_url}
                                onClick={() =>
                                    products.next_page_url &&
                                    router.get(
                                        products.next_page_url,
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

            {/* Delete confirmation */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete product?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete{" "}
                            <strong>{deleteTarget?.title}</strong>. This action
                            cannot be undone.
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
