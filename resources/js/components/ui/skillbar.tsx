import { useRef } from "react";
import {
    motion,
    useInView,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion";

type Props = { label: string; value: number };
export default function SkillBar({ label, value }: Props) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, amount: 0.6 });
    const width = useMotionValue(0);
    const animated = useSpring(width, { damping: 22, stiffness: 90 });
    const pct = useTransform(animated, (v) => `${Math.round(v)}%`);

    if (inView && width.get() === 0) width.set(value);

    return (
        <div ref={ref} className="mb-7">
            <div className="mb-3 flex justify-between text-[16px] font-semibold text-[#0a1170]">
                <span>{label}</span>
                <motion.span>{pct}</motion.span>
            </div>
            <div className="h-[10px] w-full bg-slate-200">
                <motion.div
                    className="h-full bg-[#1e5ee6]"
                    style={{ width: animated }}
                />
            </div>
        </div>
    );
}
