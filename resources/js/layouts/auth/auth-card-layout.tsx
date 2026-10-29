import { Link } from "@inertiajs/react";
import type { PropsWithChildren } from "react";
import AppLogoIcon from "@/components/app-logo-icon";
import { BRAND } from "@/components/constants/constants";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { home } from "@/routes";
import AppLogo from "@/components/app-logo";

export default function AuthCardLayout({
    children,
    title,
    description,
}: PropsWithChildren<{
    name?: string;
    title?: string;
    description?: string;
}>) {
    return (
        <div className="relative flex min-h-svh flex-col items-center justify-center gap-6 overflow-hidden bg-[#f8f9fa] p-6 md:p-10">
            {/* Brand gradient backdrop */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1] opacity-[0.04]" />

            {/* Soft brand blobs */}
            <div className="pointer-events-none absolute -top-40 -right-40 h-[420px] w-[420px] rounded-full bg-[#4a8dff]/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-40 -left-40 h-[360px] w-[360px] rounded-full bg-[#0b3fd1]/10 blur-3xl" />

            {/* Dot grid accent */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.04]"
                style={{
                    backgroundImage:
                        "radial-gradient(#0b3fd1 1.5px, transparent 1.5px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <div className="relative flex w-full max-w-md flex-col gap-6">
                {/* Logo + brand name */}
                <AppLogo imgClassName="h-20 w-auto" />

                <div className="flex flex-col gap-6">
                    <Card className="rounded-2xl border-0 shadow-xl ring-1 ring-slate-100">
                        <CardHeader className="px-8 pt-8 pb-0 text-center sm:px-10">
                            <CardTitle className="text-[24px] font-bold text-[#0a1170]">
                                {title}
                            </CardTitle>
                            <CardDescription className="mx-auto mt-2 max-w-[340px] text-[14px] leading-relaxed text-slate-500">
                                {description}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="px-8 py-8 sm:px-10">
                            {children}
                        </CardContent>
                    </Card>
                </div>

                {/* Footer line */}
                <p className="text-center text-[12px] text-slate-400">
                    © {new Date().getFullYear()} {BRAND} · Kitui, Kenya
                </p>
            </div>
        </div>
    );
}
