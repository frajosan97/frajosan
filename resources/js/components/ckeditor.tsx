// resources/js/components/ckeditor.tsx

import { CKEditor } from "@ckeditor/ckeditor5-react";
import {
    ClassicEditor,
    Essentials,
    Paragraph,
    Bold,
    Italic,
    Underline,
    Strikethrough,
    Heading,
    Link,
    List,
    BlockQuote,
    Code,
    CodeBlock,
    HorizontalLine, // ✅ was HorizontalRule
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageUpload,
    Table,
    TableToolbar,
    Undo,
    Alignment,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

interface Props {
    value: string;
    onChange: (html: string) => void;
    placeholder?: string;
    className?: string;
    minHeight?: string;
}

export function RichTextEditor({
    value,
    onChange,
    placeholder = "Write your article…",
    className,
    minHeight = "360px",
}: Props) {
    return (
        <div
            className={className}
            style={{ ["--ck-min-height" as string]: minHeight }}
        >
            <CKEditor
                editor={ClassicEditor}
                data={value}
                config={{
                    licenseKey: "GPL",
                    plugins: [
                        Essentials,
                        Paragraph,
                        Bold,
                        Italic,
                        Underline,
                        Strikethrough,
                        Heading,
                        Link,
                        List,
                        BlockQuote,
                        Code,
                        CodeBlock,
                        HorizontalLine, // ✅ was HorizontalRule
                        Image,
                        ImageToolbar,
                        ImageCaption,
                        ImageStyle,
                        ImageUpload,
                        Table,
                        TableToolbar,
                        Undo,
                        Alignment,
                    ],
                    toolbar: [
                        "undo",
                        "redo",
                        "|",
                        "heading",
                        "|",
                        "bold",
                        "italic",
                        "underline",
                        "strikethrough",
                        "|",
                        "link",
                        "bulletedList",
                        "numberedList",
                        "|",
                        "blockQuote",
                        "code",
                        "codeBlock",
                        "|",
                        "alignment",
                        "|",
                        "insertTable",
                        "horizontalLine",
                        "imageUpload",
                    ],
                    placeholder,
                    heading: {
                        options: [
                            {
                                model: "paragraph",
                                title: "Paragraph",
                                class: "ck-heading_paragraph",
                            },
                            {
                                model: "heading1",
                                view: "h1",
                                title: "Heading 1",
                                class: "ck-heading_heading1",
                            },
                            {
                                model: "heading2",
                                view: "h2",
                                title: "Heading 2",
                                class: "ck-heading_heading2",
                            },
                            {
                                model: "heading3",
                                view: "h3",
                                title: "Heading 3",
                                class: "ck-heading_heading3",
                            },
                        ],
                    },
                }}
                onChange={(_event, editor) => {
                    onChange(editor.getData());
                }}
            />
        </div>
    );
}
