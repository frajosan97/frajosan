// resources/js/pages/welcome.tsx
import { Head } from "@inertiajs/react";
import GuestLayout from "@/layouts/guest-layout";

import AboutSection from "@/components/sections/about";
import BrandsSection from "@/components/sections/brands";
import CtaStatsSection from "@/components/sections/cta-stats";
import HeroSection from "@/components/sections/hero";
import ProcessSection from "@/components/sections/process";
import ServicesSection from "@/components/sections/services";
import TestimonialsSection from "@/components/sections/testimonial";

function WelcomePage() {
    return (
        <>
            <Head title="Frajosan Technologies — Software for Schools, Finance & Health">
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link
                    href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap"
                    rel="stylesheet"
                />
                <meta
                    name="description"
                    content="Frajosan Technologies builds school management, biometric attendance, finance, insurance, and hospital systems — plus bulk SMS, networking and hosting in Kenya."
                />
            </Head>

            <div
                id="home"
                className="overflow-x-hidden bg-white font-['Poppins',sans-serif] text-[16px] text-slate-600 antialiased"
            >
                <HeroSection />
                <AboutSection />
                <ServicesSection />
                <CtaStatsSection />
                <ProcessSection />
                <TestimonialsSection />
                <BrandsSection />
            </div>
        </>
    );
}

WelcomePage.layout = (page: React.ReactNode) => (
    <GuestLayout>{page}</GuestLayout>
);

export default WelcomePage;
