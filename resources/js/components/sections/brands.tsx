import { motion } from "framer-motion";
import Wrapper from "@/layouts/app/wrapper";
import { useSystemData } from "@/hooks/use-system-data";

export default function BrandsSection() {
    const { brands } = useSystemData();

    const activeBrands = brands.filter((b) => b.is_active);

    if (activeBrands.length === 0) return null;

    return (
        <section className="relative bg-[#0a1170] py-10 sm:py-14 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            <Wrapper>
                <div className="flex flex-wrap items-center justify-center gap-x-16 gap-y-10 sm:justify-between">
                    {activeBrands.map((b, i) => (
                        <motion.div
                            key={b.name}
                            initial={{ opacity: 0, y: 12 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.08 }}
                            whileHover={{ scale: 1.08 }}
                            className="group flex flex-col items-center text-center"
                        >
                            {b.logo ? (
                                <img
                                    src={b.logo}
                                    alt={b.name}
                                    loading="lazy"
                                    className="h-16 sm:h-20 w-auto max-w-[200px] object-contain opacity-70 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0"
                                />
                            ) : (
                                <p className="text-2xl sm:text-3xl font-bold italic text-white/70 transition-colors duration-300 group-hover:text-white">
                                    {b.name}
                                </p>
                            )}

                            {b.subtitle && (
                                <p className="mt-2 text-[10px] sm:text-xs tracking-[0.2em] uppercase text-white/40 transition-colors duration-300 group-hover:text-[#7ea3ff]">
                                    {b.subtitle}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </Wrapper>
        </section>
    );
}
