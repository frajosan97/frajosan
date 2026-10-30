// resources/js/components/image-uploader.tsx

import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { UploadCloud, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface ImageUploaderProps {
    value: File | string | null;
    onChange: (value: File | null) => void;
    progress?: number;
    error?: string;
    maxSizeMB?: number;
}

export function ImageUploader({
    value,
    onChange,
    progress,
    error,
    maxSizeMB = 4,
}: ImageUploaderProps) {
    const [preview, setPreview] = useState<string | null>(
        typeof value === "string" ? value : null,
    );

    useEffect(() => {
        if (value instanceof File) {
            const url = URL.createObjectURL(value);
            setPreview(url);
            return () => URL.revokeObjectURL(url);
        }
        setPreview(typeof value === "string" ? value : null);
    }, [value]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            if (acceptedFiles[0]) onChange(acceptedFiles[0]);
        },
        [onChange],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp", ".gif"] },
        maxSize: maxSizeMB * 1024 * 1024,
        multiple: false,
    });

    const clear = (e: React.MouseEvent) => {
        e.stopPropagation();
        onChange(null);
    };

    const isUploading =
        typeof progress === "number" && progress > 0 && progress < 100;

    return (
        <div className="space-y-2">
            {preview ? (
                <div className="relative inline-block">
                    <img
                        src={preview}
                        alt="Preview"
                        className="h-40 w-auto rounded-lg border object-cover"
                    />
                    {isUploading && (
                        <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/50">
                            <Loader2 className="h-6 w-6 animate-spin text-white" />
                        </div>
                    )}
                    <button
                        type="button"
                        onClick={clear}
                        className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
                    >
                        <X className="h-3 w-3" />
                    </button>
                </div>
            ) : (
                <div
                    {...getRootProps()}
                    className={cn(
                        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-10 text-center transition-colors",
                        isDragActive
                            ? "border-primary bg-primary/5"
                            : "border-muted-foreground/25 hover:border-primary/50",
                    )}
                >
                    <input {...getInputProps()} />
                    <UploadCloud className="h-8 w-8 text-muted-foreground" />
                    <p className="text-sm font-medium">
                        {isDragActive
                            ? "Drop the image here"
                            : "Drag & drop an image, or click to browse"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                        PNG, JPG, WebP or GIF — up to {maxSizeMB} MB
                    </p>
                </div>
            )}

            {isUploading && (
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                    <div
                        className="h-full bg-primary transition-all"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            )}

            {error && <p className="text-sm text-destructive">{error}</p>}
        </div>
    );
}
