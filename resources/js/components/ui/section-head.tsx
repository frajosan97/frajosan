import { fadeUp, stagger } from "@/lib/motion";
import { motion } from "framer-motion";
type Props = { eyebrow: string; title: string; light?: boolean };
export default function SectionHead({ eyebrow, title, light = false }: Props) {
    return (
        <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            variants={stagger}
            className="mb-16 text-center"
        >
            <motion.p
                variants={fadeUp}
                className={`mb-3 text-[14px] font-semibold tracking-[0.1em] uppercase ${light ? "text-white/80" : "text-[#0b3fd1]"}`}
            >
                {eyebrow}
            </motion.p>
            <motion.h2
                variants={fadeUp}
                className={`mx-auto max-w-3xl text-3xl leading-[1.2] font-bold sm:text-[42px] ${light ? "text-white" : "text-[#0a1170]"}`}
            >
                {title}
            </motion.h2>
            <motion.div
                variants={fadeUp}
                className="mx-auto mt-6 flex items-center justify-center gap-1"
            >
                <span
                    className={`h-[4px] w-16 rounded-full ${light ? "bg-white" : "bg-[#0b3fd1]"}`}
                />
                <span
                    className={`h-[4px] w-2 rounded-full ${light ? "bg-white/50" : "bg-[#0b3fd1]/50"}`}
                />
            </motion.div>
        </motion.div>
    );
}
