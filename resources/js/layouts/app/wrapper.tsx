import type { ReactNode } from "react";

type Props = {
    className?: string;
    children: ReactNode;
};

export default function Wrapper({ className = "", children }: Props) {
    return (
        <div
            className={`mx-auto w-full max-w-[1240px] px-6 sm:px-8 ${className}`}
        >
            {children}
        </div>
    );
}
