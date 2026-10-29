import { Link, usePage } from "@inertiajs/react";
import AppLogoIcon from "@/components/app-logo-icon";
import { BRAND, CONTACT } from "@/components/constants/constants";
import { home } from "@/routes";
import type { AuthLayoutProps } from "@/types";
import { CheckCircle2 } from "lucide-react";
import AppLogo from "@/components/app-logo";

const SELLING_POINTS = [
    "School, finance, hospital & insurance systems",
    "Bulk SMS from 0.50 KES per message",
    "Networking, domains & managed hosting",
    "Built and supported from Kitui, Kenya",
];

export default function AuthSplitLayout({
    children,
    title,
    description,
}: AuthLayoutProps) {
    usePage().props; // keeps existing hook call if anything else relied on it

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-0 lg:max-w-none lg:grid-cols-2">
            {/* ─── LEFT BRAND PANEL ─── */}
            <div className="relative hidden h-full flex-col justify-between bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1] p-10 text-white lg:flex">
                {/* Dot grid */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.08]"
                    style={{
                        backgroundImage:
                            "radial-gradient(#fff 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Glow blobs */}
                <div className="pointer-events-none absolute -top-40 -right-40 h-[460px] w-[460px] rounded-full bg-[#4a8dff]/25 blur-3xl" />
                <div className="pointer-events-none absolute -bottom-32 -left-32 h-[380px] w-[380px] rounded-full bg-[#0b3fd1]/40 blur-3xl" />

                {/* Brand */}
                <AppLogo imgClassName="h-20 w-auto" />

                {/* Middle pitch */}
                <div className="relative z-20 max-w-md">
                    <h2 className="text-[32px] font-bold leading-[1.2]">
                        Software that powers Kenyan institutions.
                    </h2>
                    <p className="mt-4 text-[15px] leading-relaxed text-white/80">
                        Sign in to manage your school, SACCO, clinic or business
                        — from one dashboard.
                    </p>

                    <ul className="mt-8 space-y-3">
                        {SELLING_POINTS.map((p) => (
                            <li
                                key={p}
                                className="flex items-start gap-3 text-[14px] text-white/85"
                            >
                                <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7ea3ff]/25">
                                    <CheckCircle2 className="h-3 w-3 text-[#b9cbff]" />
                                </span>
                                {p}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Footer contact */}
                <div className="relative z-20 text-[12px] text-white/60">
                    <p>{CONTACT.address} · Kitui County, Kenya</p>
                    <p className="mt-1">
                        {CONTACT.phones.join(" · ")} · {CONTACT.email}
                    </p>
                </div>
            </div>

            {/* ─── RIGHT FORM PANEL ─── */}
            <div className="relative flex h-full w-full items-center justify-center bg-[#f8f9fa] p-6 lg:p-8">
                {/* Mobile-only accent backdrop */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.04] lg:hidden"
                    style={{
                        backgroundImage:
                            "radial-gradient(#0b3fd1 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />

                <div className="relative mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[360px]">
                    {/* Mobile logo */}

                    {/* Title + description */}
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-[24px] font-bold text-[#0a1170]">
                            {title}
                        </h1>
                        <p className="text-[14px] leading-relaxed text-balance text-slate-500">
                            {description}
                        </p>
                    </div>

                    {/* Form */}
                    {children}

                    {/* Footer line */}
                    <p className="text-center text-[12px] text-slate-400">
                        © {new Date().getFullYear()} {BRAND} · Kitui, Kenya
                    </p>
                </div>
            </div>
        </div>
    );
}
