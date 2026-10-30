// resources/js/pages/products/Edit.tsx
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { edit, index, show, update } from "@/routes/admin/products";
import type { Product } from "@/types";
import ProductForm from "./product-form";

interface Props {
    product: Product;
}

export default function ProductsEdit({ product }: Props) {
    return (
        <>
            <Head title={`Edit — ${product.title}`} />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Edit Product
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Updating{" "}
                            <span className="font-medium text-foreground">
                                {product.title}
                            </span>{" "}
                            (/{product.slug})
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={show(product.slug).url}>
                                <Eye className="mr-2 h-4 w-4" />
                                View
                            </Link>
                        </Button>
                        <Button variant="outline" asChild>
                            <Link href={index().url}>
                                <ChevronLeft className="mr-2 h-4 w-4" />
                                Back
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Form card */}
                <div className="rounded-lg border bg-card p-4 md:p-6">
                    <ProductForm
                        initial={product}
                        action={update(product.slug)}
                        submitLabel="Save Changes"
                        cancelHref={index().url}
                    />
                </div>
            </div>
        </>
    );
}
