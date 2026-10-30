import { Link } from "@inertiajs/react";
import {
    Mail,
    MapPin,
    Phone,
    Send,
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
} from "lucide-react";
import {
    BRAND,
    CONTACT,
    FOOTER_COPY,
    SOCIALS,
} from "@/components/constants/constants";
import { useFooterSolutions } from "@/hooks/use-footer-links";
import { useSiteNav } from "@/hooks/use-site-nav";
import AppLogo from "@/components/app-logo";
import Wrapper from "./wrapper";

const SOCIAL_ICONS: Record<
    string,
    React.ComponentType<{ className?: string }>
> = {
    Facebook,
    Twitter,
    Linkedin,
    Instagram,
};

export default function AppFooter() {
    const solutions = useFooterSolutions();
    const nav = useSiteNav();

    return (
        <footer
            id="contact"
            className="relative bg-[#eef2fc] pt-14 pb-8 text-sm text-slate-600 sm:pt-20 sm:pb-10 sm:text-[15px]"
        >
            <div
                className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url('https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg')`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                }}
            />

            <Wrapper className="relative">
                <div className="grid gap-12 pb-16 md:grid-cols-2 lg:grid-cols-4">
                    <div>
                        <AppLogo imgClassName="h-20 w-auto" />
                        <p className="mt-6 max-w-[250px] text-[15px] leading-relaxed">
                            {BRAND} {FOOTER_COPY.brandBlurb}
                        </p>
                        <div className="mt-8 flex gap-3">
                            {SOCIALS.map(({ icon, href, label }) => {
                                const Icon = SOCIAL_ICONS[icon];
                                return (
                                    <a
                                        key={label}
                                        href={href}
                                        aria-label={label}
                                        className="grid h-10 w-10 place-items-center rounded-full bg-white text-[#0a1170] shadow-sm transition hover:bg-[#0b3fd1] hover:text-white"
                                    >
                                        <Icon className="h-4 w-4" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[22px] font-bold text-[#0a1170]">
                            {FOOTER_COPY.solutionsTitle}
                        </h4>
                        <ul className="space-y-4">
                            {solutions.map((l) => (
                                <li key={`${l.type}-${l.href}`}>
                                    <Link
                                        href={l.href}
                                        className="transition hover:text-[#0b3fd1]"
                                    >
                                        {l.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[22px] font-bold text-[#0a1170]">
                            {FOOTER_COPY.contactTitle}
                        </h4>
                        <ul className="space-y-5">
                            <li className="flex gap-4">
                                <MapPin className="h-5 w-5 shrink-0 text-[#0b3fd1]" />
                                <span>{CONTACT.address}</span>
                            </li>
                            <li className="flex gap-4">
                                <Phone className="h-5 w-5 shrink-0 text-[#0b3fd1]" />
                                <span className="flex flex-col">
                                    {CONTACT.phones.map((p) => (
                                        <a
                                            key={p}
                                            href={`tel:${p}`}
                                            className="transition hover:text-[#0b3fd1]"
                                        >
                                            {p}
                                        </a>
                                    ))}
                                </span>
                            </li>
                            <li className="flex gap-4">
                                <Mail className="h-5 w-5 shrink-0 text-[#0b3fd1]" />
                                <a
                                    href={`mailto:${CONTACT.email}`}
                                    className="transition hover:text-[#0b3fd1]"
                                >
                                    {CONTACT.email}
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="mb-6 text-[22px] font-bold text-[#0a1170]">
                            {FOOTER_COPY.newsletterTitle}
                        </h4>
                        <p className="mb-6 leading-relaxed">
                            {FOOTER_COPY.newsletterBlurb}
                        </p>
                        <form className="relative flex items-center">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full rounded-full bg-white px-6 py-4 pr-16 text-slate-700 outline-none shadow-sm"
                            />
                            <button
                                type="submit"
                                aria-label="Subscribe"
                                className="absolute right-1 top-1 bottom-1 grid w-12 place-items-center rounded-full bg-[#0b3fd1] text-white transition hover:bg-[#0a1170]"
                            >
                                <Send className="h-5 w-5" />
                            </button>
                        </form>
                    </div>
                </div>

                <div className="flex flex-col items-center justify-between border-t border-slate-300 pt-8 text-[14px] sm:flex-row">
                    <p>
                        © {new Date().getFullYear()} {BRAND}. All rights
                        reserved.
                    </p>
                    <ul className="mt-4 flex gap-6 sm:mt-0">
                        {nav.map((m) => (
                            <li key={m.label}>
                                <a
                                    href={m.href}
                                    className="transition hover:text-[#0b3fd1]"
                                >
                                    {m.label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Wrapper>
        </footer>
    );
}
