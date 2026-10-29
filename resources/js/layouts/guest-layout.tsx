// resources/js/layouts/guest-layout.tsx
import { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import AppTopBar from "@/layouts/app/app-topbar-layout";
import AppNavbar from "@/layouts/app/app-navbar-layout";
import AppFooter from "@/layouts/app/app-footer-layout";

type Props = {
    children: React.ReactNode;
    hideTopBar?: boolean;
};

export default function GuestLayout({ children, hideTopBar = false }: Props) {
    const { auth } = usePage<{ auth?: { user: unknown } }>().props;
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 40);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    const navOffset = scrolled ? "pt-[72px]" : "";

    return (
        <div className="flex min-h-screen flex-col bg-white">
            {!hideTopBar && <AppTopBar scrolled={scrolled} />}
            <AppNavbar scrolled={scrolled} authUser={auth?.user} />
            <main className={`flex-1 ${navOffset}`}>{children}</main>
            <AppFooter />
        </div>
    );
}
