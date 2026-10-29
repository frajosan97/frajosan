import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { fadeUp, stagger } from "@/lib/motion";
import { TESTIMONIALS } from "../constants/constants";
import Wrapper from "@/layouts/app/wrapper";
import SectionHead from "../ui/section-head";
import Img from "../ui/img";

export default function TestimonialsSection() {
    return (
        <section className="relative bg-white py-16 sm:py-24 lg:py-32 overflow-hidden">
            {/* Soft accent blob */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-blue-50 blur-3xl opacity-50 pointer-events-none" />

            <Wrapper className="relative">
                <SectionHead
                    eyebrow="TESTIMONIALS"
                    title="What Our Clients Say"
                />

                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.2 }}
                    variants={stagger}
                    className="grid gap-6 md:grid-cols-3"
                >
                    {TESTIMONIALS.map((t) => (
                        <motion.div
                            key={t.name}
                            variants={fadeUp}
                            whileHover={{ y: -6 }}
                            className="group relative flex flex-col rounded-2xl border border-slate-100 bg-white p-8 shadow-[0_0_30px_rgba(0,0,0,0.05)] transition hover:border-[#0b3fd1]/20 hover:shadow-2xl"
                        >
                            {/* Quote mark */}
                            <Quote className="mb-5 h-9 w-9 fill-[#0b3fd1]/10 text-[#0b3fd1]" />

                            {/* Star rating */}
                            <div className="mb-4 flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        className="h-4 w-4 fill-amber-400 text-amber-400"
                                    />
                                ))}
                            </div>

                            <p className="mb-8 flex-1 text-[16px] leading-relaxed text-slate-600">
                                {t.quote}
                            </p>

                            <div className="flex items-center gap-4 border-t border-slate-100 pt-5">
                                <Img
                                    src={t.img}
                                    className="h-12 w-12 overflow-hidden rounded-full ring-2 ring-blue-50"
                                    imgClass="h-full w-full object-cover"
                                />
                                <div>
                                    <p className="text-[16px] font-bold text-[#0a1170]">
                                        {t.name}
                                    </p>
                                    <p className="text-[13px] text-slate-500">
                                        {t.role}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </Wrapper>
        </section>
    );
}
