import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { IMG } from "../constants/constants";
import { fadeUp, stagger } from "@/lib/motion";
import Img from "../ui/img";
import Wrapper from "@/layouts/app/wrapper";

export default function HeroSection() {
    return (
        <section className="relative isolate overflow-hidden bg-[#0a1170] pb-[72px] sm:pb-[100px]">
            <Img
                src={IMG.hero}
                className="absolute inset-0 h-full w-full"
                imgClass="h-full w-full object-cover opacity-60"
            />

            <Wrapper className="relative flex min-h-[560px] items-center py-12 sm:min-h-[650px] sm:py-20 lg:py-28">
                <div className="grid w-full items-center gap-8 sm:gap-12 lg:grid-cols-2">
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={stagger}
                        className="mx-auto w-full max-w-xl text-center text-white lg:mx-0 lg:text-left"
                    >
                        <motion.h1
                            variants={fadeUp}
                            className="text-3xl leading-[1.15] font-extrabold sm:text-5xl lg:text-[64px]"
                        >
                            Software That
                            <br />
                            Runs Schools,
                            <br />
                            Finance & Hospitals
                        </motion.h1>
                        <motion.p
                            variants={fadeUp}
                            className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-white/90 sm:mt-6 sm:text-[18px] lg:mx-0"
                        >
                            Frajosan Technologies builds school management,
                            biometric attendance, finance, insurance and
                            hospital systems — plus bulk SMS, networking and
                            hosting for institutions across Kenya.
                        </motion.p>

                        <motion.button
                            variants={fadeUp}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            aria-label="Watch how Frajosan works"
                            className="mx-auto mt-7 grid h-14 w-14 place-items-center rounded-full sm:mt-10 sm:h-[80px] sm:w-[80px] lg:mx-0 bg-[#0b3fd1] text-white shadow-[0_0_0_10px_rgba(255,255,255,0.1)] transition hover:bg-[#0a35b3]"
                        >
                            <Play className="ml-2 h-8 w-8 fill-current" />
                        </motion.button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative mx-auto w-full max-w-[460px] rounded-md bg-white p-5 shadow-2xl sm:p-8 lg:ml-auto lg:p-10"
                    >
                        <h3 className="text-center text-2xl font-bold leading-tight text-[#0a1170] sm:text-[28px]">
                            Book a Free
                            <br />
                            Demo
                        </h3>
                        <p className="mt-2 mb-5 text-center text-sm sm:mb-8 sm:text-[15px]">
                            Talk to our team — we respond within 24 hours
                        </p>

                        {[
                            { placeholder: "Full Name", type: "text" },
                            { placeholder: "Work E-mail", type: "email" },
                            { placeholder: "Phone Number", type: "tel" },
                            {
                                placeholder: "School / Hospital / Company",
                                type: "text",
                            },
                        ].map((f) => (
                            <input
                                key={f.placeholder}
                                type={f.type}
                                placeholder={f.placeholder}
                                className="mb-3 w-full border-none bg-slate-50 px-4 py-3 text-sm sm:mb-4 sm:px-5 sm:py-4 sm:text-[15px] text-slate-700 outline-none ring-1 ring-slate-100 transition placeholder:text-slate-500 focus:ring-2 focus:ring-[#0b3fd1]"
                            />
                        ))}

                        <button
                            type="submit"
                            className="mt-2 w-full bg-[#0b3fd1] py-4 text-[16px] font-semibold text-white transition hover:bg-[#0a35b3]"
                        >
                            Request Demo
                        </button>
                    </motion.div>
                </div>
            </Wrapper>

            <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full overflow-hidden leading-[0]">
                <svg
                    className="relative block h-[80px] w-full sm:h-[100px] lg:h-[120px]"
                    viewBox="0 0 1440 120"
                    preserveAspectRatio="none"
                    xmlns="http://www.w3.org/2000/svg"
                    aria-hidden="true"
                >
                    <path
                        d="M0,20 C220,38 470,82 720,100 C960,120 1190,98 1440,75 L1440,120 L0,120 Z"
                        fill="#ffffff"
                    />
                </svg>
            </div>
        </section>
    );
}
