import { motion } from "framer-motion";
import { Link } from "@inertiajs/react";
import { fadeUp, stagger } from "@/lib/motion";
import { STEPS } from "@/components/constants/constants";
import Wrapper from "@/layouts/app/wrapper";
import {
    ArrowRight,
    Compass,
    ClipboardList,
    Rocket,
    PackageCheck,
} from "lucide-react";

const STEP_ICONS = [Compass, ClipboardList, Rocket, PackageCheck];

const STEP_COPY: Record<number, string> = {
    1: "We listen first — mapping your school, finance, or hospital workflow, pain points, and compliance needs before we write a single line of code.",
    2: "You get a clear scope, timeline, and budget. We agree on modules, integrations, and success metrics so nothing surprises you later.",
    3: "Our team builds, tests, and ships in short cycles — with weekly demos so you see real progress, not just status reports.",
    4: "We deploy, train your staff, and stay on call. Post-launch support, updates, and refinements are part of the deal — not an add-on.",
};

export default function ProcessSection() {
    return (
        <section
            id="process"
            className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
            {/* Soft background accents */}
            <div className="absolute top-0 right-0 -mr-40 -mt-40 h-[420px] w-[420px] rounded-full bg-blue-50 blur-3xl opacity-70 pointer-events-none" />
            <div className="absolute bottom-0 left-0 -ml-40 -mb-40 h-[360px] w-[360px] rounded-full bg-indigo-50 blur-3xl opacity-70 pointer-events-none" />

            <Wrapper className="relative grid gap-12 lg:grid-cols-[400px_1fr] lg:gap-16">
                {/* Left: Blue CTA card — sticky on desktop */}
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0b3fd1] via-[#0b3fd1] to-[#0a1170] p-10 sm:p-12 text-white shadow-2xl lg:sticky lg:top-36 lg:self-start"
                >
                    {/* Decorative rings */}
                    <svg
                        className="absolute -top-16 -right-16 h-56 w-56 text-white/10"
                        viewBox="0 0 100 100"
                        fill="none"
                        aria-hidden="true"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="45"
                            stroke="currentColor"
                            strokeWidth="8"
                        />
                        <circle
                            cx="50"
                            cy="50"
                            r="30"
                            stroke="currentColor"
                            strokeWidth="8"
                        />
                    </svg>

                    <div className="relative">
                        <p className="mb-4 text-[12px] font-bold tracking-[0.2em] uppercase text-white/70">
                            Working Process
                        </p>
                        <h3 className="text-[30px] sm:text-[34px] leading-[1.2] font-bold">
                            How We Deliver Software That Actually Gets Used
                        </h3>
                        <p className="mt-5 text-[15px] leading-relaxed text-white/80">
                            No jargon, no ghost timelines. Four clear stages,
                            agreed with you upfront.
                        </p>

                        <Link
                            href="/contact#message-section"
                            className="group mt-9 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b3fd1] shadow-lg transition hover:bg-[#4a8dff] hover:text-white"
                        >
                            Start a Project
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </Link>

                        <p className="mt-6 text-[13px] leading-relaxed text-white/60">
                            Typical delivery: 4–8 weeks · Fixed scope · Weekly
                            demos
                        </p>
                    </div>
                </motion.div>

                {/* Right: Steps */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.15 }}
                    variants={stagger}
                    className="grid gap-x-12 gap-y-12 sm:grid-cols-2"
                >
                    {STEPS.map((s, i) => {
                        const Icon = STEP_ICONS[i] ?? Compass;
                        return (
                            <motion.div
                                key={s.n}
                                variants={fadeUp}
                                className="group relative"
                            >
                                {/* Icon tile */}
                                <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-[#0b3fd1] transition-colors duration-300 group-hover:bg-[#0b3fd1] group-hover:text-white">
                                    <Icon className="h-6 w-6" />
                                </div>

                                <p className="text-[13px] font-bold tracking-[0.15em] uppercase text-[#0b3fd1]">
                                    Step {String(s.n).padStart(2, "0")}
                                </p>
                                <h4 className="mt-1 mb-3 text-[24px] font-bold text-[#0a1170]">
                                    {s.title}
                                </h4>
                                <p className="text-[16px] leading-relaxed text-slate-600">
                                    {STEP_COPY[s.n]}
                                </p>

                                {/* Connector line between paired steps on desktop */}
                                {i % 2 === 0 && i < STEPS.length - 1 && (
                                    <div className="pointer-events-none absolute top-7 -right-6 hidden w-12 border-t-2 border-dashed border-blue-200 sm:block" />
                                )}
                            </motion.div>
                        );
                    })}
                </motion.div>
            </Wrapper>
        </section>
    );
}
