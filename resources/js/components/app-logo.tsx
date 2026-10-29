import { usePage } from "@inertiajs/react";

type Props = {
    className?: string;
    imgClassName?: string;
};

export default function AppLogo({
    className = "",
    imgClassName = "size-8",
}: Props) {
    const { name } = usePage().props;

    return (
        <div className={`flex items-center justify-center ${className}`}>
            <img
                src="/logo.png"
                alt={name}
                className={`object-contain ${imgClassName}`}
            />
        </div>
    );
}
