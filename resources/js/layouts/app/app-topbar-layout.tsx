import { MapPin, Mail, Phone } from "lucide-react";
import AppLogo from "@/components/app-logo";
import Wrapper from "./wrapper";
import { CONTACT } from "@/components/constants/constants";
type Props = { scrolled: boolean };

export default function AppTopBar({ scrolled }: Props) {
    return (
        <div
            className={`hidden bg-white py-4 transition-all duration-300 md:block ${scrolled ? "-translate-y-full opacity-0 h-0 overflow-hidden" : "translate-y-0 opacity-100"}`}
        >
            <Wrapper className="flex items-center justify-between">
                <AppLogo imgClassName="h-10 w-auto" />
                <div className="flex items-center gap-12 text-[15px]">
                    {[
                        {
                            icon: MapPin,
                            k: "Address",
                            v: CONTACT.address,
                        },
                        { icon: Mail, k: "E-mail", v: CONTACT.email },
                        {
                            icon: Phone,
                            k: "Phone",
                            v: CONTACT.phones.join(" / "),
                        },
                    ].map(({ icon: Icon, k, v }) => (
                        <div key={k} className="flex items-center gap-3">
                            <Icon className="h-6 w-6 text-[#0b3fd1]" />
                            <div className="leading-tight">
                                <p className="font-bold text-[#0a1170]">{k}</p>
                                <p className="text-[14px]">{v}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </Wrapper>
        </div>
    );
}
