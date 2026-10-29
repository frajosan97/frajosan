import { Link } from "@inertiajs/react";
import AppLogoIcon from "@/components/app-logo-icon";
import { BRAND } from "@/components/constants/constants";
import { home } from "@/routes";
import type { AuthLayoutProps } from "@/types";
import AppLogo from "@/components/app-logo";

export default function AuthSimpleLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
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

            <div className="relative w-full max-w-sm">
                <div className="flex flex-col gap-8">
                    {/* Logo + heading */}
                    <div className="flex flex-col items-center gap-4">
                        <AppLogo imgClassName="h-20 w-auto" />

                        <div className="space-y-2 text-center">
                            <h1 className="text-[24px] font-bold text-[#0a1170]">
                                {title}
                            </h1>
                            <p className="mx-auto max-w-[320px] text-center text-[14px] leading-relaxed text-slate-500">
                                {description}
                            </p>
                        </div>
                    </div>

                    {/* Form card */}
                    <div className="rounded-2xl bg-white p-6 shadow-xl ring-1 ring-slate-100 sm:p-8">
                        {children}
                    </div>

                    {/* Footer line */}
                    <p className="text-center text-[12px] text-slate-400">
                        © {new Date().getFullYear()} {BRAND} · Kitui, Kenya
                    </p>
                </div>
            </div>
        </div>
    );
}
