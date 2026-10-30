// resources/js/components/app-sidebar.tsx
import { Link } from "@inertiajs/react";
import { route } from "ziggy-js";
import {
    LayoutGrid,
    Package,
    Wrench,
    Users,
    MessageSquareQuote,
} from "lucide-react";
import AppLogo from "@/components/app-logo";
import { NavFooter } from "@/components/nav-footer";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import type { NavItem } from "@/types";

const mainNavItems: NavItem[] = [
    {
        title: "Dashboard",
        href: route("admin.dashboard"),
        icon: LayoutGrid,
    },
    {
        title: "Products",
        href: route("admin.products.index"),
        icon: Package,
    },
    {
        title: "Services",
        href: route("admin.services.index"),
        icon: Wrench,
    },
    {
        title: "Trusted By",
        href: route("admin.brands.index"),
        icon: Users,
    },
    {
        title: "Testimonies",
        href: route("admin.testimonies.index"),
        icon: MessageSquareQuote,
    },
];

const footerNavItems: NavItem[] = [];

export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={route("admin.dashboard")} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
