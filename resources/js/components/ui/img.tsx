type Props = {
    src: string;
    alt?: string;
    className?: string;
    imgClass?: string;
};
export default function Img({
    src,
    alt = "",
    className = "",
    imgClass = "h-full w-full object-cover",
}: Props) {
    return (
        <div className={`overflow-hidden bg-slate-200 ${className}`}>
            <img
                src={src}
                alt={alt}
                loading="lazy"
                onError={(e) => {
                    e.currentTarget.style.opacity = "0";
                }}
                className={imgClass}
            />
        </div>
    );
}
