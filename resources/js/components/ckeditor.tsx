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
    HorizontalLine,
    Image,
    ImageToolbar,
    ImageCaption,
    ImageStyle,
    ImageUpload,
    Table,
    TableToolbar,
    Undo,
    Alignment,
    Font,
    MediaEmbed,
    Plugin,
    ButtonView,
    Command,
    GeneralHtmlSupport,
} from "ckeditor5";
import "ckeditor5/ckeditor5.css";

// ✅ Dynamic Button Command
class InsertDynamicButtonCommand extends Command {
    execute() {
        const editor = this.editor;

        // Prompt user for URL, text, and style
        const url = window.prompt("Button URL:", "https://example.com/signup");
        if (!url) return;

        const text = window.prompt("Button text:", "Sign Up");
        if (!text) return;

        const style = window.prompt(
            "Button style (primary | secondary | outline | danger):",
            "primary",
        );
        if (!style) return;

        // Map style name to CSS class
        const styleClassMap: Record<string, string> = {
            primary: "btn-primary",
            secondary: "btn-secondary",
            outline: "btn-outline",
            danger: "btn-danger",
        };
        const styleClass = styleClassMap[style.toLowerCase()] || "btn-primary";

        editor.model.change((writer) => {
            const html = `<a class="dynamic-button ${styleClass}" href="${url}" target="_blank" rel="noopener noreferrer">${text}</a>`;
            const viewFragment = editor.data.processor.toView(html);
            const modelFragment = editor.data.toModel(viewFragment);
            editor.model.insertContent(modelFragment);
        });
    }

    refresh() {
        this.isEnabled = true;
    }
}

// ✅ Dynamic Button Plugin
class DynamicButtonPlugin extends Plugin {
    init() {
        const editor = this.editor;

        const command = new InsertDynamicButtonCommand(editor);
        editor.commands.add("insertDynamicButton", command);

        editor.ui.componentFactory.add("insertDynamicButton", (locale) => {
            const button = new ButtonView(locale);

            button.set({
                label: "Insert Button",
                withText: true,
                tooltip: true,
            });

            button.bind("isEnabled").to(command, "isEnabled");

            button.on("execute", () => {
                editor.execute("insertDynamicButton");
                editor.editing.view.focus();
            });

            return button;
        });
    }
}

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
                        HorizontalLine,
                        Image,
                        ImageToolbar,
                        ImageCaption,
                        ImageStyle,
                        ImageUpload,
                        Table,
                        TableToolbar,
                        Undo,
                        Alignment,
                        Font,
                        MediaEmbed,
                        GeneralHtmlSupport,
                        DynamicButtonPlugin,
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
                        "fontFamily",
                        "fontSize",
                        "fontColor",
                        "fontBackgroundColor",
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
                        "mediaEmbed",
                        "|",
                        "insertDynamicButton",
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
                    fontFamily: {
                        options: [
                            "default",
                            "Arial, Helvetica, sans-serif",
                            "Courier New, Courier, monospace",
                            "Georgia, serif",
                            "Lucida Sans Unicode, Lucida Grande, sans-serif",
                            "Tahoma, Geneva, sans-serif",
                            "Times New Roman, Times, serif",
                            "Trebuchet MS, Helvetica, sans-serif",
                            "Verdana, Geneva, sans-serif",
                        ],
                    },
                    fontSize: {
                        options: [9, 11, 13, "default", 17, 19, 21],
                    },
                    htmlSupport: {
                        allow: [
                            {
                                name: "a",
                                classes: [
                                    "dynamic-button",
                                    "btn-primary",
                                    "btn-secondary",
                                    "btn-outline",
                                    "btn-danger",
                                ],
                                styles: true,
                                attributes: ["href", "target", "rel"],
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
