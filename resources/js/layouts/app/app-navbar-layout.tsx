import { Link } from "@inertiajs/react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Search,
    Facebook,
    Twitter,
    Instagram,
    Menu,
    X,
    ChevronDown,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import Wrapper from "./wrapper";
import { dashboard } from "@/routes/admin";
import { useSiteNav } from "@/hooks/use-site-nav";

type Props = { scrolled: boolean; authUser: unknown };

export default function AppNavbar({ scrolled, authUser }: Props) {
    const NAV = useSiteNav(); // ← the only structural change
    const [open, setOpen] = useState(false);
    const [openMobile, setOpenMobile] = useState<string | null>(null);

    return (
        <header
            className={`z-50 bg-[#0b3fd1] text-white shadow-md transition-all duration-300 ${
                scrolled ? "fixed inset-x-0 top-0" : "relative"
            }`}
        >
            <Wrapper className="flex h-[72px] items-center justify-between">
                <div className="md:hidden">
                    <AppLogo />
                </div>

                {/* Desktop nav */}
                <nav className="hidden h-full items-center gap-8 text-[16px] font-semibold md:flex">
                    {NAV.map((m) => {
                        const hasDropdown = !!m.children?.length;

                        return (
                            <div
                                key={m.label}
                                className="group relative flex h-full items-center"
                            >
                                <a
                                    href={m.href}
                                    className="flex h-full items-center gap-1 transition hover:text-white/80"
                                >
                                    {m.label}
                                    {hasDropdown && (
                                        <ChevronDown className="h-4 w-4 opacity-70 transition-transform duration-200 group-hover:rotate-180" />
                                    )}
                                </a>

                                {hasDropdown && (
                                    <div className="invisible absolute left-0 top-full z-50 opacity-0 transition-opacity duration-150 group-hover:visible group-hover:opacity-100">
                                        <div className="min-w-[260px] rounded-none bg-white py-2 text-[#0a1170] shadow-xl ring-1 ring-black/5">
                                            {m.children!.map((item) => {
                                                const Icon = item.icon;
                                                return (
                                                    <a
                                                        key={item.label}
                                                        href={item.href}
                                                        className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition hover:bg-[#0b3fd1]/5 hover:text-[#0b3fd1]"
                                                    >
                                                        <Icon className="h-4 w-4 shrink-0 text-[#0b3fd1]" />
                                                        {item.label}
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </nav>

                <div className="flex items-center gap-6">
                    {authUser ? (
                        <Link
                            href={dashboard()}
                            className="text-[15px] font-medium hover:text-white/80"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <div className="hidden items-center gap-4 text-[15px] font-medium sm:flex">
                            <Search className="h-5 w-5" />
                            <div className="h-4 w-px bg-white/30" />
                            <a href="#" className="hover:text-white/80">
                                <Facebook className="h-4 w-4" />
                            </a>
                            <a href="#" className="hover:text-white/80">
                                <Twitter className="h-4 w-4" />
                            </a>
                            <a href="#" className="hover:text-white/80">
                                <Instagram className="h-4 w-4" />
                            </a>
                        </div>
                    )}
                    <button
                        type="button"
                        className="md:hidden"
                        onClick={() => setOpen(!open)}
                    >
                        {open ? (
                            <X className="h-7 w-7" />
                        ) : (
                            <Menu className="h-7 w-7" />
                        )}
                    </button>
                </div>
            </Wrapper>

            {/* Mobile menu */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="absolute inset-x-0 top-full max-h-[80vh] overflow-y-auto bg-[#0a35b3] shadow-xl md:hidden"
                    >
                        <Wrapper className="flex flex-col py-4">
                            {NAV.map((m) => {
                                const hasDropdown = !!m.children?.length;
                                const isOpen = openMobile === m.label;

                                return (
                                    <div
                                        key={m.label}
                                        className="border-b border-white/10"
                                    >
                                        {hasDropdown ? (
                                            <>
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setOpenMobile(
                                                            isOpen
                                                                ? null
                                                                : m.label,
                                                        )
                                                    }
                                                    className="flex w-full items-center justify-between py-3 text-base font-medium"
                                                >
                                                    {m.label}
                                                    <ChevronDown
                                                        className={`h-4 w-4 transition-transform duration-200 ${
                                                            isOpen
                                                                ? "rotate-180"
                                                                : ""
                                                        }`}
                                                    />
                                                </button>
                                                <AnimatePresence
                                                    initial={false}
                                                >
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            animate={{
                                                                height: "auto",
                                                                opacity: 1,
                                                            }}
                                                            exit={{
                                                                height: 0,
                                                                opacity: 0,
                                                            }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="flex flex-col gap-1 pb-3 pl-2">
                                                                {m.children!.map(
                                                                    (item) => {
                                                                        const Icon =
                                                                            item.icon;
                                                                        return (
                                                                            <a
                                                                                key={
                                                                                    item.label
                                                                                }
                                                                                href={
                                                                                    item.href
                                                                                }
                                                                                onClick={() =>
                                                                                    setOpen(
                                                                                        false,
                                                                                    )
                                                                                }
                                                                                className="flex items-center gap-3 py-2 text-sm font-medium text-white/80 hover:text-white"
                                                                            >
                                                                                <Icon className="h-4 w-4 shrink-0" />
                                                                                {
                                                                                    item.label
                                                                                }
                                                                            </a>
                                                                        );
                                                                    },
                                                                )}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </>
                                        ) : (
                                            <a
                                                href={m.href}
                                                onClick={() => setOpen(false)}
                                                className="block py-3 text-base font-medium"
                                            >
                                                {m.label}
                                            </a>
                                        )}
                                    </div>
                                );
                            })}
                        </Wrapper>
                    </motion.div>
                )}
            </AnimatePresence>
        </header>
    );
}
