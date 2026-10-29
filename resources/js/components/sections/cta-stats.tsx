import Wrapper from "@/layouts/app/wrapper";
import { motion } from "framer-motion";
import { MessageSquare, Check, ArrowRight, Zap, Globe2, Headphones } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { CONTACT, STATS } from "../constants/constants";

const SMS_FEATURES = [
    "Sender ID (your school, church, or business name)",
    "Bulk upload from CSV or Excel",
    "Delivery reports within minutes",
    "Scheduled campaigns — set and forget",
];

export default function CtaStatsSection() {
    return (
        <section className="relative overflow-hidden bg-[#f8f9fa] pb-32">
            {/* ─── SMS CTA BLOCK ─── */}
            <div className="relative bg-gradient-to-br from-[#0a1170] via-[#0b2a9e] to-[#0b3fd1] text-white">
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.08] pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(#fff 1.5px, transparent 1.5px)",
                        backgroundSize: "28px 28px",
                    }}
                />
                {/* Soft glow blobs */}
                <div className="absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[#4a8dff]/30 blur-3xl pointer-events-none" />
                <div className="absolute -bottom-40 -left-40 h-[400px] w-[400px] rounded-full bg-[#0b3fd1]/40 blur-3xl pointer-events-none" />

                <Wrapper className="relative py-20 sm:py-24 lg:py-32">
                    <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
                        {/* LEFT — pitch */}
                        <motion.div
                            initial="hidden"
                            whileInView="show"
                            viewport={{ once: true, amount: 0.3 }}
                            variants={stagger}
                        >
                            <motion.div
                                variants={fadeUp}
                                className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
                            >
                                <MessageSquare className="h-4 w-4" />
                                <span className="text-[12px] font-bold tracking-[0.15em] uppercase">
                                    Bulk SMS
                                </span>
                            </motion.div>

                            <motion.h2
                                variants={fadeUp}
                                className="text-[32px] leading-[1.15] font-bold sm:text-5xl lg:text-[54px]"
                            >
                                Reach everyone in{" "}
                                <span className="relative inline-block">
                                    <span className="relative z-10">seconds</span>
                                    <span className="absolute inset-x-0 bottom-1 h-3 bg-[#4a8dff]/40 rounded" />
                                </span>
                                <br />
                                for just{" "}
                                <span className="text-[#7ea3ff]">50 cents</span>{" "}
                                per SMS.
                            </motion.h2>

                            <motion.p
                                variants={fadeUp}
                                className="mt-6 max-w-lg text-[16px] sm:text-[18px] leading-relaxed text-white/85"
                            >
                                Fee reminders, exam results, appointment
                                alerts, church announcements — send thousands
                                of messages in one click. Transparent per-SMS
                                pricing, no monthly retainer.
                            </motion.p>

                            <motion.ul
                                variants={fadeUp}
                                className="mt-8 grid gap-3 sm:grid-cols-2"
                            >
                                {SMS_FEATURES.map((f) => (
                                    <li
                                        key={f}
                                        className="flex items-start gap-2.5 text-[14px] text-white/85"
                                    >
                                        <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-[#7ea3ff]/25">
                                            <Check className="h-3 w-3 text-[#b9cbff]" />
                                        </span>
                                        {f}
                                    </li>
                                ))}
                            </motion.ul>

                            <motion.div
                                variants={fadeUp}
                                className="mt-10 flex flex-wrap items-center gap-4"
                            >
                                <a
                                    href={`tel:${CONTACT.phones[0]}`}
                                    className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-[15px] font-semibold text-[#0b3fd1] shadow-lg transition hover:bg-[#4a8dff] hover:text-white"
                                >
                                    Start Sending
                                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </a>
                                <a
                                    href="#contact"
                                    className="inline-flex items-center gap-2 rounded-full border border-white/30 px-7 py-3.5 text-[15px] font-semibold text-white transition hover:bg-white/10"
                                >
                                    Talk to Sales
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* RIGHT — pricing card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.7, delay: 0.15 }}
                            className="relative mx-auto w-full max-w-[420px]"
                        >
                            {/* Glow behind card */}
                            <div className="absolute -inset-4 rounded-3xl bg-[#7ea3ff]/20 blur-2xl" />

                            <div className="relative rounded-3xl bg-white p-8 sm:p-10 text-[#0a1170] shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-bold tracking-wider uppercase text-[#0b3fd1]">
                                        <Zap className="h-3 w-3" /> Best Value
                                    </span>
                                    <span className="text-[12px] font-medium text-slate-500">
                                        Per SMS
                                    </span>
                                </div>

                                <div className="mt-6 flex items-end gap-2">
                                    <p className="text-[72px] font-extrabold leading-none tracking-tight">
                                        0.50
                                    </p>
                                    <p className="mb-3 text-[20px] font-bold text-slate-500">
                                        KES
                                    </p>
                                </div>
                                <p className="mt-1 text-[14px] text-slate-500">
                                    Flat rate. No setup fee. No monthly
                                    retainer.
                                </p>

                                <div className="my-7 h-px bg-slate-100" />

                                <ul className="space-y-3.5">
                                    {[
                                        { icon: Globe2, text: "Works on all Kenyan networks" },
                                        { icon: Zap, text: "Delivery in under 60 seconds" },
                                        { icon: Headphones, text: "Free onboarding & support" },
                                    ].map(({ icon: Icon, text }) => (
                                        <li
                                            key={text}
                                            className="flex items-center gap-3 text-[14px] text-slate-700"
                                        >
                                            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-blue-50 text-[#0b3fd1]">
                                                <Icon className="h-4 w-4" />
                                            </span>
                                            {text}
                                        </li>
                                    ))}
                                </ul>

                                <a
                                    href={`tel:${CONTACT.phones[0]}`}
                                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-full bg-[#0b3fd1] py-4 text-[15px] font-semibold text-white transition hover:bg-[#0a1170]"
                                >
                                    Create Free Account
                                </a>
                                <p className="mt-4 text-center text-[12px] text-slate-400">
                                    {CONTACT.phones[0]} · {CONTACT.email}
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </Wrapper>
            </div>

            {/* ─── FLOATING STATS CARD (overlaps section below) ─── */}
            <Wrapper className="relative z-20 -mt-16 sm:-mt-20">
                <div className="mx-auto flex max-w-[1000px] flex-col justify-between rounded-3xl bg-white p-8 sm:p-12 shadow-2xl ring-1 ring-slate-100 sm:flex-row text-center">
                    {STATS.map((s, i) => (
                        <div
                            key={s.label}
                            className={`relative flex-1 py-4 sm:py-0 ${
                                i !== STATS.length - 1
                                    ? "border-b-2 sm:border-b-0 sm:border-r-2 border-slate-100"
                                    : ""
                            }`}
                        >
                            <p className="text-[44px] sm:text-[56px] font-extrabold text-[#0a1170] leading-none">
                                {s.value}
                                {s.suffix}
                            </p>
                            <p className="mt-2 text-[15px] sm:text-[17px] font-medium text-slate-600">
                                {s.label}
                            </p>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </section>
    );
}