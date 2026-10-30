// resources/js/components/sms-signup-form.tsx
import { useForm } from "@inertiajs/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Props {
    onSuccess?: () => void;
    className?: string;
}

export function SmsSignupForm({ onSuccess, className }: Props) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: "",
        email: "",
        phone: "",
        business_name: "",
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post("/contact/sms-signup", {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                onSuccess?.();
            },
        });
    };

    return (
        <form
            onSubmit={submit}
            className={
                className ?? "space-y-4 rounded-xl border bg-card p-6 shadow-sm"
            }
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

            <div className="space-y-2">
                <Label htmlFor="sms-name">Full name</Label>
                <Input
                    id="sms-name"
                    value={data.name}
                    onChange={(e) => setData("name", e.target.value)}
                    placeholder="Jane Wanjiru"
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
