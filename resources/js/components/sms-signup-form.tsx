// resources/js/components/sms-signup-form.tsx
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    onSuccess?: () => void;
    className?: string;
}

type FlashProps = {
    flash?: {
        success?: string | null;
        error?: string | null;
    };
};

export function SmsSignupForm({ onSuccess, className }: Props) {
    const { data, setData, post, processing, errors, reset, clearErrors } =
        useForm({
            name: "",
            email: "",
            phone: "",
            business_name: "",
        });

    const { flash } = usePage<FlashProps>().props;
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    // Surface server-flashed messages when the page (re)renders.
    // This covers cases where Inertia's onSuccess/onError callbacks don't fire
    // (e.g. full page reload, redirect from another form, etc.).
    useEffect(() => {
        if (flash?.success) setSuccessMessage(flash.success);
        if (flash?.error) setErrorMessage(flash.error);
    }, [flash?.success, flash?.error]);

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        setSuccessMessage(null);
        setErrorMessage(null);
        clearErrors();

        post("/contact/sms-signup", {
            preserveScroll: true,
            onSuccess: (page) => {
                const flashSuccess = (page.props as FlashProps).flash?.success;
                setSuccessMessage(
                    flashSuccess ??
                        "Thanks! We received your request and will contact you shortly.",
                );
                reset();
                onSuccess?.();
            },
            onError: (formErrors) => {
                const topLevel =
                    formErrors.error ||
                    formErrors.message ||
                    "We couldn't submit your request. Please check the fields below and try again.";
                setErrorMessage(topLevel);
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className={
                className ?? "space-y-4 rounded-xl border bg-card p-6 shadow-sm"
            }
            noValidate
        >
            <div>
                <h3
                    id="sms-signup-title"
                    className="text-xl font-semibold text-slate-900"
                >
                    Create your SMS account
                </h3>
                <p className="text-sm text-muted-foreground">
                    Bulk SMS from <strong>KSh 0.50 per message</strong> · sender
                    IDs from 7000 · API ready. Fill in your details and we'll
                    set up your account.
                </p>
            </div>

            {successMessage && (
                <div
                    role="status"
                    aria-live="polite"
                    className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-800"
                >
                    {successMessage}
                </div>
            )}

            {errorMessage && (
                <div
                    role="alert"
                    aria-live="assertive"
                    className="rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
                >
                    {errorMessage}
                </div>
            )}

            <div className="space-y-2">
                <Label htmlFor="sms-name">Full name</Label>
                <Input
                    id="sms-name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Jane Wanjiru"
                    aria-invalid={!!errors.name}
                />
                {errors.name && (
                    <p className="text-sm text-destructive">{errors.name}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="sms-email">Email address</Label>
                <Input
                    id="sms-email"
                    type="email"
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    placeholder="jane@company.co.ke"
                    aria-invalid={!!errors.email}
                />
                {errors.email && (
                    <p className="text-sm text-destructive">{errors.email}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="sms-phone">Phone number</Label>
                <Input
                    id="sms-phone"
                    type="tel"
                    value={data.phone}
                    onChange={(e) => setData("phone", e.target.value)}
                    placeholder="+254 7XX XXX XXX"
                    aria-invalid={!!errors.phone}
                />
                {errors.phone && (
                    <p className="text-sm text-destructive">{errors.phone}</p>
                )}
            </div>

            <div className="space-y-2">
                <Label htmlFor="sms-business">Business name</Label>
                <Input
                    id="sms-business"
                    value={data.business_name}
                    onChange={(e) => setData("business_name", e.target.value)}
                    placeholder="Acme Ltd"
                    aria-invalid={!!errors.business_name}
                />
                {errors.business_name && (
                    <p className="text-sm text-destructive">
                        {errors.business_name}
                    </p>
                )}
            </div>

            <Button type="submit" disabled={processing} className="w-full">
                {processing ? "Submitting…" : "Create my SMS account"}
            </Button>

            <p className="text-xs text-muted-foreground">
                By submitting, you agree to be contacted about your SMS account.
                We never share your details. Prices in KSh, VAT inclusive.
            </p>
        </form>
    );
}
