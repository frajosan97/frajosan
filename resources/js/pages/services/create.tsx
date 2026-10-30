// resources/js/pages/services/Create.tsx
import { Head, Link } from "@inertiajs/react";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { index, store } from "@/routes/admin/services";
import ServiceForm from "./service-form";

interface Props {
    types: string[];
}

export default function ServicesCreate({ types }: Props) {
    return (
        <>
            <Head title="New Service" />

            <div className="space-y-6 p-4 md:p-6">
                {/* Header */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">
                            New Service
                        </h1>
                        <p className="text-sm text-muted-foreground">
                            Add a service to the catalog.
                        </p>
                    </div>
                    <Button variant="outline" asChild>
                        <Link href={index().url}>
                            <ChevronLeft className="mr-2 h-4 w-4" />
                            Back to Services
                        </Link>
                    </Button>
                </div>

                {/* Form card */}
                <div className="rounded-lg border bg-card p-4 md:p-6">
                    <ServiceForm
                        action={store()}
                        submitLabel="Create Service"
                        cancelHref={index().url}
                        types={types}
                    />
                </div>
            </div>
        </>
    );
}
