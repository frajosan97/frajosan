import Wrapper from "@/layouts/app/wrapper";
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
import SectionHead from "../ui/section-head";
import { fadeUp, stagger } from "@/lib/motion";
import { PRODUCTS } from "../constants/constants";

const IconMap = {
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
    return (
        <section
            id="services"
            className="relative bg-[#f8f9fa] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
            {/* Soft background accent */}
            <div className="absolute top-1/3 right-0 -mr-40 h-[420px] w-[420px] rounded-full bg-blue-50 blur-3xl opacity-60 pointer-events-none" />

            <Wrapper className="relative">
                <SectionHead
                    eyebrow="OUR PRODUCTS"
                    title="Software Built for Schools, Finance, Health & Enterprise"
                />
                <p className="mx-auto -mt-4 mb-14 max-w-2xl text-center text-[16px] leading-relaxed text-slate-600">
                    Eight production-ready systems — deployed across Kenyan
                    schools, SACCOs, insurers, hospitals and businesses.
                </p>

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger}
                    className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
                >
                    {PRODUCTS.map(({ icon, title, tagline }) => {
                        const Icon = IconMap[icon as keyof typeof IconMap];
                        return (
                            <motion.a
                                key={title}
                                href="#contact"
                                variants={fadeUp}
                                whileHover={{ y: -6 }}
                                className="group relative flex flex-col rounded-2xl bg-white p-7 shadow-sm ring-1 ring-slate-100 transition hover:shadow-2xl hover:ring-[#0b3fd1]/20"
                            >
                                {/* Icon tile */}
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-blue-50 text-[#0b3fd1] transition-colors duration-300 group-hover:bg-[#0b3fd1] group-hover:text-white">
                                    <Icon className="h-7 w-7 stroke-[1.7]" />
                                </div>

                                <h3 className="text-[18px] font-bold leading-snug text-[#0a1170]">
                                    {title}
                                </h3>
                                <p className="mt-2 flex-1 text-[14px] leading-relaxed text-slate-600">
                                    {tagline}
                                </p>

                                {/* Arrow affordance */}
                                <span className="mt-5 inline-flex items-center gap-1 text-[13px] font-semibold text-[#0b3fd1]">
                                    Learn more
                                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                                </span>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </Wrapper>
        </section>
    );
}
