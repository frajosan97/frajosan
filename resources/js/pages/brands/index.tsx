// resources/js/pages/brands/index.tsx
import { Head, router, useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import {
    Plus,
    Search,
    Pencil,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Tag,
    ExternalLink,
    Image as ImageIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
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
import type { Paginated, Brand } from "@/types";
import { route } from "ziggy-js";

interface Props {
    brands: Paginated<Brand>;
    filters: { search?: string };
}

type BrandForm = {
    name: string;
    subtitle: string;
    url: string;
    sort_order: number;
    is_active: boolean;
    logo: File | null;
    _method?: string;
};

export default function BrandsIndex({ brands, filters }: Props) {
    const { flash } = usePage<{ flash?: { success?: string } }>().props;
    const [search, setSearch] = useState(filters.search ?? "");
    const [deleteTarget, setDeleteTarget] = useState<Brand | null>(null);
    const [editing, setEditing] = useState<Brand | null>(null);
    const [modalOpen, setModalOpen] = useState(false);

    const form = useForm<BrandForm>({
        name: "",
        subtitle: "",
        url: "",
        sort_order: 0,
        is_active: true,
        logo: null,
    });

    // Reset the form whenever we open the modal
    useEffect(() => {
        if (!modalOpen) return;

        if (editing) {
            form.setData({
                name: editing.name,
                subtitle: editing.subtitle ?? "",
                url: editing.url ?? "",
                sort_order: editing.sort_order,
                is_active: editing.is_active,
                logo: null,
                _method: "put",
            });
        } else {
            form.setData({
                name: "",
                subtitle: "",
                url: "",
                sort_order: 0,
                is_active: true,
                logo: null,
            });
        }
        form.clearErrors();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [modalOpen, editing]);

    const openCreate = () => {
        setEditing(null);
        setModalOpen(true);
    };

    const openEdit = (brand: Brand) => {
        setEditing(brand);
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
        setEditing(null);
    };

    const submitModal = (e: React.FormEvent) => {
        e.preventDefault();

        if (editing) {
            form.post(route("admin.brands.update", editing.id), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeModal,
            });
        } else {
            form.post(route("admin.brands.store"), {
                forceFormData: true,
                preserveScroll: true,
                onSuccess: closeModal,
            });
        }
    };

    const submitSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            route("admin.brands.index"),
            { search: search || undefined },
            { preserveState: true, replace: true },
        );
    };

    const confirmDelete = () => {
        if (!deleteTarget) return;
        router.delete(route("admin.brands.destroy", deleteTarget.id), {
            preserveScroll: true,
            onFinish: () => setDeleteTarget(null),
        });
    };

    return (
        <>
            <Head title="Brands" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Brands
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Manage partner brands and technologies.
                        </p>
                    </div>
                    <Button onClick={openCreate}>
                        <Plus className="mr-2 h-4 w-4" />
                        New Brand
                    </Button>
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
                            placeholder="Search by name or subtitle…"
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
                                <TableHead>Brand</TableHead>
                                <TableHead className="hidden md:table-cell">
                                    URL
                                </TableHead>
                                <TableHead className="w-24">Status</TableHead>
                                <TableHead className="w-32 text-right">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {brands.data.length === 0 && (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="h-32 text-center"
                                    >
                                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                                            <Tag className="h-8 w-8" />
                                            <span>No brands found.</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )}

                            {brands.data.map((brand) => (
                                <TableRow key={brand.id}>
                                    <TableCell className="font-mono text-xs text-muted-foreground">
                                        {brand.sort_order}
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            {brand.logo ? (
                                                <img
                                                    src={brand.logo}
                                                    alt={brand.name}
                                                    className="h-8 w-8 rounded object-contain bg-muted"
                                                />
                                            ) : (
                                                <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                                                    <ImageIcon className="h-4 w-4 text-muted-foreground" />
                                                </div>
                                            )}
                                            <div className="flex flex-col">
                                                <span className="font-medium">
                                                    {brand.name}
                                                </span>
                                                {brand.subtitle && (
                                                    <span className="text-xs text-muted-foreground">
                                                        {brand.subtitle}
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell className="hidden max-w-md md:table-cell">
                                        {brand.url ? (
                                            <a
                                                href={brand.url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                                            >
                                                {brand.url}
                                                <ExternalLink className="h-3 w-3" />
                                            </a>
                                        ) : (
                                            <span className="text-sm text-muted-foreground">
                                                —
                                            </span>
                                        )}
                                    </TableCell>
                                    <TableCell>
                                        {brand.is_active ? (
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
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => openEdit(brand)}
                                                aria-label="Edit"
                                            >
                                                <Pencil className="h-4 w-4" />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="text-destructive hover:text-destructive"
                                                onClick={() =>
                                                    setDeleteTarget(brand)
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
                {brands.last_page > 1 && (
                    <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
                        <p className="text-sm text-muted-foreground">
                            Showing {brands.from}–{brands.to} of {brands.total}
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!brands.prev_page_url}
                                onClick={() =>
                                    brands.prev_page_url &&
                                    router.get(
                                        brands.prev_page_url,
                                        {},
                                        { preserveState: true },
                                    )
                                }
                            >
                                <ChevronLeft className="mr-1 h-4 w-4" />
                                Previous
                            </Button>

                            <span className="text-sm text-muted-foreground">
                                Page {brands.current_page} of {brands.last_page}
                            </span>

                            <Button
                                variant="outline"
                                size="sm"
                                disabled={!brands.next_page_url}
                                onClick={() =>
                                    brands.next_page_url &&
                                    router.get(
                                        brands.next_page_url,
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

            {/* Create / Edit modal */}
            <Dialog open={modalOpen} onOpenChange={setModalOpen}>
                <DialogContent className="sm:max-w-lg">
                    <form onSubmit={submitModal}>
                        <DialogHeader>
                            <DialogTitle>
                                {editing ? "Edit Brand" : "New Brand"}
                            </DialogTitle>
                            <DialogDescription>
                                {editing
                                    ? "Update this brand's details."
                                    : "Add a new brand to your public site."}
                            </DialogDescription>
                        </DialogHeader>

                        <div className="space-y-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="brand-name">Name</Label>
                                <Input
                                    id="brand-name"
                                    value={form.data.name}
                                    onChange={(e) =>
                                        form.setData("name", e.target.value)
                                    }
                                    placeholder="e.g. Slab"
                                />
                                {form.errors.name && (
                                    <p className="text-xs text-destructive">
                                        {form.errors.name}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand-subtitle">Subtitle</Label>
                                <Input
                                    id="brand-subtitle"
                                    value={form.data.subtitle}
                                    onChange={(e) =>
                                        form.setData("subtitle", e.target.value)
                                    }
                                    placeholder="e.g. Technology"
                                />
                                {form.errors.subtitle && (
                                    <p className="text-xs text-destructive">
                                        {form.errors.subtitle}
                                    </p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand-url">Website URL</Label>
                                <Input
                                    id="brand-url"
                                    value={form.data.url}
                                    onChange={(e) =>
                                        form.setData("url", e.target.value)
                                    }
                                    placeholder="https://example.com"
                                />
                                {form.errors.url && (
                                    <p className="text-xs text-destructive">
                                        {form.errors.url}
                                    </p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="brand-order">
                                        Sort order
                                    </Label>
                                    <Input
                                        id="brand-order"
                                        type="number"
                                        min={0}
                                        value={form.data.sort_order}
                                        onChange={(e) =>
                                            form.setData(
                                                "sort_order",
                                                Number(e.target.value),
                                            )
                                        }
                                    />
                                    {form.errors.sort_order && (
                                        <p className="text-xs text-destructive">
                                            {form.errors.sort_order}
                                        </p>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="brand-logo">Logo</Label>
                                    <Input
                                        id="brand-logo"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) =>
                                            form.setData(
                                                "logo",
                                                e.target.files?.[0] ?? null,
                                            )
                                        }
                                    />
                                    {form.errors.logo && (
                                        <p className="text-xs text-destructive">
                                            {form.errors.logo}
                                        </p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center justify-between rounded-md border px-3 py-2">
                                <div>
                                    <Label htmlFor="brand-active">Active</Label>
                                    <p className="text-xs text-muted-foreground">
                                        Show this brand on the public site.
                                    </p>
                                </div>
                                <Switch
                                    id="brand-active"
                                    checked={form.data.is_active}
                                    onCheckedChange={(v) =>
                                        form.setData("is_active", v)
                                    }
                                />
                            </div>
                        </div>

                        <DialogFooter>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={closeModal}
                            >
                                Cancel
                            </Button>
                            <Button type="submit" disabled={form.processing}>
                                {editing ? "Save changes" : "Create brand"}
                            </Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            {/* Delete confirmation */}
            <AlertDialog
                open={!!deleteTarget}
                onOpenChange={(open) => !open && setDeleteTarget(null)}
            >
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Delete brand?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This will permanently delete{" "}
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
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
