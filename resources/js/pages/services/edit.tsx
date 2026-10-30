// resources/js/pages/services/Edit.tsx
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { edit, index, show, update } from "@/routes/admin/services";
import type { Service } from "@/types";
import ServiceForm from "./service-form";

interface Props {
    service: Service;
    types: string[];
}

export default function ServicesEdit({ service, types }: Props) {
    return (
        <>
            <Head title={`Edit — ${service.title}`} />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            Edit Service
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Updating{" "}
                            <span className="font-medium text-foreground">
                                {service.title}
                            </span>{" "}
                            (/{service.slug})
                        </p>
                    </div>
                    <div className="flex gap-2">
                        <Button variant="outline" asChild>
                            <Link href={show(service.slug).url}>
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
                    <ServiceForm
                        initial={service}
                        action={update(service.slug)}
                        submitLabel="Save Changes"
                        cancelHref={index().url}
                        types={types}
                    />
                </div>
            </div>
        </>
    );
}
