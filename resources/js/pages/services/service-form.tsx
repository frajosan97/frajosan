// resources/js/pages/services/service-form.tsx

import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { RichTextEditor } from "@/components/ckeditor";
import { ImageUploader } from "@/components/image-uploader";
import type { Service } from "@/types";

interface Props {
    initial?: Partial<Service>;
    action: { url: string; method: "post" | "put" };
    submitLabel: string;
    cancelHref: string;
    types: string[];
}

export default function ServiceForm({
    initial,
    action,
    submitLabel,
    cancelHref,
    types,
}: Props) {
    const { data, setData, post, processing, errors, progress, transform } =
        useForm<{
            icon: string;
            title: string;
            slug: string;
            tagline: string;
            body: string;
            image: File | string | null;
            type: string;
            sort_order: number;
            is_active: boolean;
        }>({
            icon: initial?.icon ?? "",
            title: initial?.title ?? "",
            slug: initial?.slug ?? "",
            tagline: initial?.tagline ?? "",
            body: initial?.body ?? "",
            image: (initial?.image ?? null) as File | string | null,
            type: initial?.type ?? types[0] ?? "core",
            sort_order: initial?.sort_order ?? 0,
            is_active: initial?.is_active ?? true,
        });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();

        if (action.method === "put") {
            // Laravel can't parse multipart bodies on real PUT requests,
            // so spoof it with POST + _method=put via transform().
            transform((payload) => ({
                ...payload,
                _method: "put",
            }));
        }

        post(action.url, {
            forceFormData: true,
            preserveScroll: true,
        });
    };

    return (
        <form onSubmit={submit} className="space-y-6">
            {/* TOP GRID: image (left) + icon/title/slug/sort_order/type (right) */}
            <div className="grid gap-6 md:grid-cols-2">
                {/* Left: Hero image */}
                <div className="space-y-2">
                    <Label>Hero image</Label>
                    <ImageUploader
                        value={data.image}
                        onChange={(file) => setData("image", file)}
                        progress={progress?.percentage}
                        error={errors.image}
                    />
                    {errors.image && (
                        <p className="text-sm text-destructive">
                            {errors.image}
                        </p>
                    )}
                </div>

                {/* Right: icon, title, slug, type, sort_order stacked */}
                <div className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="icon">Icon (lucide name)</Label>
                        <Input
                            id="icon"
                            value={data.icon}
                            onChange={(e) => setData("icon", e.target.value)}
                            placeholder="e.g. BarChart3"
                        />
                        {errors.icon && (
                            <p className="text-sm text-destructive">
                                {errors.icon}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="title">Title</Label>
                        <Input
                            id="title"
                            value={data.title}
                            onChange={(e) => setData("title", e.target.value)}
                            placeholder="e.g. Analytics Dashboard"
                        />
                        {errors.title && (
                            <p className="text-sm text-destructive">
                                {errors.title}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="slug">Slug</Label>
                        <Input
                            id="slug"
                            value={data.slug}
                            onChange={(e) => setData("slug", e.target.value)}
                            placeholder="e.g. analytics-dashboard"
                        />
                        {errors.slug && (
                            <p className="text-sm text-destructive">
                                {errors.slug}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="type">Type</Label>
                        <Select
                            value={data.type}
                            onValueChange={(v) => setData("type", v)}
                        >
                            <SelectTrigger id="type">
                                <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                                {types.map((t) => (
                                    <SelectItem key={t} value={t}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {errors.type && (
                            <p className="text-sm text-destructive">
                                {errors.type}
                            </p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="sort_order">Sort order</Label>
                        <Input
                            id="sort_order"
                            type="number"
                            min={0}
                            value={data.sort_order}
                            onChange={(e) =>
                                setData("sort_order", Number(e.target.value))
                            }
                        />
                        {errors.sort_order && (
                            <p className="text-sm text-destructive">
                                {errors.sort_order}
                            </p>
                        )}
                    </div>
                </div>
            </div>

            {/* Tagline */}
            <div className="space-y-2">
                <Label htmlFor="tagline">Tagline</Label>
                <Input
                    id="tagline"
                    value={data.tagline}
                    onChange={(e) => setData("tagline", e.target.value)}
                    placeholder="Short card description shown on the list"
                />
                {errors.tagline && (
                    <p className="text-sm text-destructive">{errors.tagline}</p>
                )}
            </div>

            {/* Body — CKEditor */}
            <div className="space-y-2">
                <Label htmlFor="body">Article body</Label>
                <RichTextEditor
                    value={data.body ?? ""}
                    onChange={(html) => setData("body", html)}
                    placeholder="Write the service article here…"
                    minHeight="360px"
                />
                {errors.body && (
                    <p className="text-sm text-destructive">{errors.body}</p>
                )}
                <p className="text-xs text-muted-foreground">
                    Supports headings, lists, links, tables, quotes, code
                    blocks, and images.
                </p>
            </div>

            {/* Active */}
            <div className="flex items-center gap-2">
                <Checkbox
                    id="is_active"
                    checked={data.is_active}
                    onCheckedChange={(v) => setData("is_active", Boolean(v))}
                />
                <Label htmlFor="is_active" className="cursor-pointer">
                    Active (visible on the public site)
                </Label>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3">
                <Button type="submit" disabled={processing}>
                    {processing ? "Saving…" : submitLabel}
                </Button>
                <Button type="button" variant="outline" asChild>
                    <a href={cancelHref}>Cancel</a>
                </Button>
            </div>
        </form>
    );
}
