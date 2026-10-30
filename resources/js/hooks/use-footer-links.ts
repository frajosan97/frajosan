// resources/js/hooks/use-footer-links.ts
import { useMemo } from "react";
import { useSystemData } from "./use-system-data";
import { FOOTER_SOLUTIONS_LIMIT } from "@/components/constants/constants";

export type FooterLink = {
    label: string;
    href: string;
    type: "product" | "service";
};

export function useFooterSolutions(): FooterLink[] {
    const { products, services } = useSystemData();

    return useMemo<FooterLink[]>(() => {
        const productLinks: FooterLink[] = products.map((p) => ({
            label: p.title,
            href: `/products/${p.slug}`,
            type: "product",
        }));

        const serviceLinks: FooterLink[] = services.map((s) => ({
            label: s.title,
            href: `/services/${s.slug}`,
            type: "service",
        }));

        return [...productLinks, ...serviceLinks].slice(
            0,
            FOOTER_SOLUTIONS_LIMIT,
        );
    }, [products, services]);
}