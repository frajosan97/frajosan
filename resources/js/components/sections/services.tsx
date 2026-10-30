import { motion } from "framer-motion";
import {
    BarChart3,
    Fingerprint,
    Wallet,
    Landmark,
    ShieldCheck,
    LineChart,
    Dices,
    Stethoscope,
    ArrowUpRight,
} from "lucide-react";
import { Link } from "@inertiajs/react";
import Wrapper from "@/layouts/app/wrapper";
import SectionHead from "../ui/section-head";
import { fadeUp, stagger } from "@/lib/motion";
import { useSystemData } from "@/hooks/use-system-data";
import { route } from "ziggy-js";

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    BarChart3,
    Fingerprint,
    Wallet,
    Landmark,
    ShieldCheck,
    LineChart,
    Dices,
    Stethoscope,
};

export default function ServicesSection() {
    const { products } = useSystemData();

    if (products.length === 0) return null;

    return (
        <section
            id="services"
            className="relative bg-[#f8f9fa] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
            <div className="absolute top-1/3 right-0 -mr-40 h-[420px] w-[420px] rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />

            <Wrapper className="relative">
                <SectionHead
                    eyebrow="OUR PRODUCTS"
                    title="Software Built for Schools, Finance, Health & Enterprise"
                />
                <p className="mx-auto -mt-4 mb-14 max-w-2xl text-center text-[16px] leading-relaxed text-slate-600">
                    {products.length} production-ready systems — deployed across
                    Kenyan schools, SACCOs, insurers, hospitals and businesses.
                </p>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {products.map(({ icon, title, slug, tagline }) => {
                        const Icon = IconMap[icon] ?? BarChart3;
                        return (
                            <motion.div
                                key={slug}
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                            >
                                <Link
                                    href={route("products.public", slug)}
                                    className="group relative flex h-full flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition hover:shadow-2xl hover:ring-[#0b3fd1]/20"
                                >
                                    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#0b3fd1] transition-colors duration-300 group-hover:bg-[#0b3fd1] group-hover:text-white">
                                        <Icon className="h-7 w-7 stroke-[1.7]" />
                                    </div>

                                    <h3 className="text-[18px] font-bold leading-snug text-[#0a1170]">
                                        {title}
                                    </h3>
                                    <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">
                                        {tagline}
                                    </p>

                                    <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0b3fd1]">
                                        Learn more
                                        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                    </span>
                                </Link>
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Wrapper>
        </section>
    );
}
