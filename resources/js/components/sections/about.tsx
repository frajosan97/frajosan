import Wrapper from "@/layouts/app/wrapper";
import { motion } from "framer-motion";
import Img from "../ui/img";
import { IMG, SKILLS } from "../constants/constants";
import { fadeUp, stagger } from "@/lib/motion";
import SkillBar from "../ui/skillbar";
import { CheckCircle2, Sparkles, Users, Award } from "lucide-react";

export default function AboutSection() {
    return (
        <section
            id="about"
            className="relative bg-[#fafcff] py-16 sm:py-24 lg:py-32 overflow-hidden"
        >
            {/* Animated background blobs */}
            <motion.div
                animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute top-0 right-0 -mr-32 -mt-32 h-[500px] w-[500px] rounded-full bg-blue-100/60 blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
                transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
                className="absolute bottom-0 left-0 -ml-32 -mb-32 h-[400px] w-[400px] rounded-full bg-indigo-100/60 blur-3xl pointer-events-none"
            />

            {/* Subtle grid pattern */}
            <div
                className="absolute inset-0 opacity-[0.025] pointer-events-none"
                style={{
                    backgroundImage:
                        "radial-gradient(circle, #0b3fd1 1px, transparent 1px)",
                    backgroundSize: "28px 28px",
                }}
            />

            <Wrapper className="relative grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
                {/* LEFT: Bigger, layered image collage */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7 }}
                    className="relative mx-auto h-[560px] w-full max-w-[620px] sm:h-[640px]"
                >
                    {/* Decorative dotted circles */}
                    <svg
                        className="absolute -top-12 -left-12 h-44 w-44 text-blue-300 opacity-60"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="42"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeDasharray="4 4"
                        />
                    </svg>
                    <svg
                        className="absolute -bottom-10 -right-10 h-36 w-36 text-indigo-300 opacity-60"
                        viewBox="0 0 100 100"
                        fill="none"
                    >
                        <circle
                            cx="50"
                            cy="50"
                            r="40"
                            stroke="currentColor"
                            strokeWidth="1.2"
                            strokeDasharray="4 4"
                        />
                    </svg>

                    {/* Bigger top-left image (school lab) */}
                    <motion.div
                        whileHover={{ scale: 1.03, rotate: -1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute top-0 left-0 h-[58%] w-[50%] overflow-hidden rounded-3xl shadow-xl ring-4 ring-white"
                    >
                        <Img
                            src={IMG.aboutSub1}
                            className="h-full w-full"
                            imgClass="h-full w-full object-cover"
                        />
                    </motion.div>

                    {/* Bigger bottom-right image (hospital) */}
                    <motion.div
                        whileHover={{ scale: 1.03, rotate: 1 }}
                        transition={{ type: "spring", stiffness: 200 }}
                        className="absolute bottom-0 right-0 h-[54%] w-[58%] overflow-hidden rounded-3xl shadow-xl ring-4 ring-white"
                    >
                        <Img
                            src={IMG.aboutSub2}
                            className="h-full w-full"
                            imgClass="h-full w-full object-cover"
                        />
                    </motion.div>

                    {/* Main floating image (finance / team) */}
                    <motion.div
                        initial={{ y: 20 }}
                        animate={{ y: [0, -12, 0] }}
                        transition={{
                            duration: 4,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                        className="absolute top-[18%] left-[18%] z-10 h-[74%] w-[78%] overflow-hidden rounded-3xl shadow-2xl ring-8 ring-white"
                    >
                        <Img
                            src={IMG.aboutMain}
                            className="h-full w-full"
                            imgClass="h-full w-full object-cover"
                        />
                        {/* Blue tint overlay for brand cohesion */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#0a1170]/20 via-transparent to-transparent pointer-events-none" />
                    </motion.div>

                    {/* Floating badge — Years Experience */}
                    <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="absolute bottom-[8%] left-0 z-20 flex items-center gap-3 rounded-2xl bg-white/95 backdrop-blur-md p-4 shadow-2xl ring-1 ring-white/60"
                    >
                        <div className="grid h-12 w-12 place-items-center rounded-xl bg-blue-100 text-[#0b3fd1]">
                            <CheckCircle2 className="h-6 w-6" />
                        </div>
                        <div>
                            <p className="text-2xl font-extrabold text-[#0a1170] leading-none">
                                25+
                            </p>
                            <p className="text-xs font-medium text-slate-500 mt-1">
                                Years Experience
                            </p>
                        </div>
                    </motion.div>

                    {/* New floating badge — Clients served */}
                    <motion.div
                        whileHover={{ scale: 1.05, y: -4 }}
                        className="absolute top-[6%] right-0 z-20 flex items-center gap-3 rounded-2xl bg-[#0b3fd1] p-4 shadow-2xl text-white"
                    >
                        <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                            <Users className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-xl font-extrabold leading-none">
                                80k+
                            </p>
                            <p className="text-xs font-medium text-white/80 mt-1">
                                Happy Users
                            </p>
                        </div>
                    </motion.div>

                    {/* Small accent badge */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="absolute top-[45%] -left-2 z-20 hidden sm:flex items-center gap-2 rounded-full bg-white px-4 py-2 shadow-lg ring-1 ring-slate-100"
                    >
                        <Award className="h-4 w-4 text-[#0b3fd1]" />
                        <span className="text-xs font-bold text-[#0a1170]">
                            Trusted Partner
                        </span>
                    </motion.div>
                </motion.div>

                {/* RIGHT: Content */}
                <motion.div
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, amount: 0.3 }}
                    variants={stagger}
                    className="relative"
                >
                    {/* Eyebrow */}
                    <motion.div
                        variants={fadeUp}
                        className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 border border-blue-100"
                    >
                        <Sparkles className="h-4 w-4 text-[#0b3fd1]" />
                        <span className="text-[13px] font-bold tracking-widest text-[#0b3fd1] uppercase">
                            About Frajosan
                        </span>
                    </motion.div>

                    <motion.h2
                        variants={fadeUp}
                        className="text-3xl leading-[1.2] font-bold text-[#0a1170] sm:text-4xl lg:text-[46px]"
                    >
                        Building Software That{" "}
                        <span className="relative inline-block">
                            <span className="relative z-10 text-[#0b3fd1]">
                                Kenyan Institutions
                            </span>
                            <span className="absolute inset-x-0 bottom-1 h-3 bg-blue-200/60 -z-0 rounded" />
                        </span>{" "}
                        Rely On
                    </motion.h2>

                    <motion.p
                        variants={fadeUp}
                        className="mt-6 mb-10 text-[17px] leading-relaxed text-slate-600"
                    >
                        From school management and biometric attendance to
                        finance, insurance, and hospital systems — Frajosan
                        Technologies designs, builds, and supports the software
                        that keeps Kenyan institutions running. We also handle
                        the infrastructure: bulk SMS, networking, and domains
                        with hosting.
                    </motion.p>

                    {/* Highlight stats row */}
                    <motion.div
                        variants={fadeUp}
                        className="mb-10 grid grid-cols-3 gap-3 sm:gap-4"
                    >
                        {[
                            { value: "8+", label: "Products" },
                            { value: "80k+", label: "Users" },
                            { value: "230+", label: "Projects" },
                        ].map((s) => (
                            <div
                                key={s.label}
                                className="rounded-xl bg-white p-4 text-center shadow-sm ring-1 ring-slate-100"
                            >
                                <p className="text-xl sm:text-2xl font-extrabold text-[#0a1170]">
                                    {s.value}
                                </p>
                                <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                    {s.label}
                                </p>
                            </div>
                        ))}
                    </motion.div>

                    {/* Skill bars */}
                    <motion.div
                        variants={fadeUp}
                        className="rounded-2xl bg-white p-6 shadow-sm border border-slate-100"
                    >
                        {SKILLS.map((s) => (
                            <SkillBar
                                key={s.label}
                                label={s.label}
                                value={s.value}
                            />
                        ))}
                    </motion.div>
                </motion.div>
            </Wrapper>
        </section>
    );
}
