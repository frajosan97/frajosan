import { BRANDS } from "@/components/constants/constants";
import Wrapper from "@/layouts/app/wrapper";
import { motion } from "framer-motion";

export default function BrandsSection() {
    return (
        <section className="relative bg-[#0a1170] py-10 sm:py-14 overflow-hidden">
            {/* Subtle divider glow */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <Wrapper>
                <p className="mb-8 text-center text-[11px] sm:text-xs font-semibold tracking-[0.25em] uppercase text-white/50">
                    Trusted by teams across Kenya
                </p>

                <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:justify-between">
                    {BRANDS.map((b, i) => (
                        <motion.div
                            key={b.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ scale: 1.08 }}
                            className="group cursor-pointer text-center"
                        >
                            <p className="text-xl sm:text-2xl font-bold italic text-white/70 transition-colors duration-300 group-hover:text-white">
                                {b.name}
                            </p>
                            <p className="mt-1 text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-white/40 transition-colors duration-300 group-hover:text-[#7ea3ff]">
                                {b.sub}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </Wrapper>
        </section>
    );
}
