"use client"
import { cn } from "@/lib/utils";
import { type ColorResult, CirclePicker, SketchPicker } from 'react-color'
import { AlignCenter, AlignCenterIcon, AlignJustifyIcon, AlignLeftIcon, AlignRight, AlignRightIcon, BoldIcon, ChevronDown, HighlighterIcon, ImageIcon, ItalicIcon, Link2Icon, ListCollapseIcon, ListIcon, ListOrderedIcon, ListTodoIcon, LucideIcon, MessageSquarePlusIcon, MinusIcon, PlusIcon, PrinterIcon, Redo2Icon, RemoveFormattingIcon, SearchIcon, SpellCheckIcon, UnderlineIcon, Undo2Icon, UploadIcon } from "lucide-react";
import { useEditorStore } from "@/store/use-editor-store";
import { Separator } from "@/components/ui/separator";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Level } from "@tiptap/extension-heading";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ToolBarButtonProps {
    onClick?: () => void;
    isActive?: boolean,
    icon: LucideIcon
}





const LineHeightButton = () => {
    const { editor } = useEditorStore();

    const lineheights = [
        {
            label: "Default",
            value: "normal"
        },
        {
            label: "Single",
            value: "1"
        },
        {
            label: "1.15",
            value: "1.15"
        },
        {
            label: "Double",
            value: "2"
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <ListCollapseIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                {lineheights.map(({ label, value }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setLineHeight(value).run()}
                        className={cn(
                            'flex items-center w-full gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            editor?.getAttributes("paragraph").lineHeight === value && 'bg-neutral-200/80'
                        )}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontSizeButton = () => {
    const { editor } = useEditorStore();

    const currentFontSize = editor?.getAttributes('textStyle').fontSize
        ? editor?.getAttributes('textStyle').fontSize.replace('px', '')
        : '16';

    const [fontSize, setfontSize] = useState(currentFontSize)
    const [inputValue, setinputValue] = useState(fontSize)
    const [isEditing, setisEditing] = useState(false)

    const updateFontSize = (newSize: string) => {
        const size = parseInt(newSize);

        if (!isNaN(size) && size > 0) {
            editor?.chain().focus().setFontSize(`${size}px`).run();
            setfontSize(newSize);
            setinputValue(newSize);
            setisEditing(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setinputValue(e.target.value)
    }

    const handleInputBlur = () => {
        updateFontSize(inputValue)
    }

    const handlekeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            updateFontSize(inputValue);
            editor?.commands?.focus();
        }
    }

    const increment = () => {
        const newSize = parseInt(fontSize) + 1;
        updateFontSize(newSize.toString())
    }

    const decrement = () => {
        const newSize = parseInt(fontSize) - 1;
        if (newSize > 0) {
            updateFontSize(newSize.toString())
        }
    }


    return (
        <div className="flex items-center gap-x-0.5">
            <button
                onClick={decrement}
                className="h-7 w-7 shrink-0 flex  justify-center items-center rounded-sm hover:bg-neutral-200 "
            >
                <MinusIcon className="size-4" />
            </button>
            {
                isEditing ? (
                    <input
                        type="text"
                        value={inputValue}
                        onBlur={handleInputBlur}
                        onChange={handleInputChange}
                        onKeyDown={handlekeyDown}
                        className="h-7 w-10 border text-center border-neutral-400 tex-center rounded-sm bg-transparent focus:outline-none focus:ring-0 text-sm"
                    />

                ) : (
                    <button
                        onClick={() => {
                            setisEditing(true);
                            setfontSize(currentFontSize)
                        }
                        }
                        className="h-7 w-10 border border-neutral-400 tex-center rounded-sm hover:bg-neutral-200 text-sm bg-transparent cursor-text"
                    >
                        {currentFontSize}
                    </button>
                )
            }

            <button
                onClick={increment}
                className="h-7 w-7 shrink-0 flex  justify-center items-center rounded-sm hover:bg-neutral-200 "
            >
                <PlusIcon className="size-4" />
            </button>
        </div>
    )
}



const ListButton = () => {
    const { editor } = useEditorStore();

    const listItems = [
        {
            label: "Bullet List",
            icon: ListIcon,
            isActive: () => editor?.isActive('bulletList'),
            onClick: () => editor?.chain().focus().toggleBulletList().run()
        },
        {
            label: "Ordered List",
            icon: ListOrderedIcon,
            isActive: () => editor?.isActive('orderedList'),
            onClick: () => editor?.chain().focus().toggleOrderedList().run()
        },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <ListIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                {listItems.map(({ label, icon: Icon, onClick, isActive }) => (
                    <button
                        key={label}
                        onClick={onClick}
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            isActive() && 'bg-neutral-200/80'
                        )}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}


const AlignButton = () => {
    const { editor } = useEditorStore();

    const allignment = [
        {
            label: "Align Left",
            value: "left",
            icon: AlignLeftIcon
        },
        {
            label: "Align Center",
            value: "center",
            icon: AlignCenterIcon
        },
        {
            label: "Align Right",
            value: "right",
            icon: AlignRightIcon
        },
        {
            label: "Align Justify",
            value: "justify",
            icon: AlignJustifyIcon
        }
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <AlignLeftIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                {allignment.map(({ label, value, icon: Icon }) => (
                    <button
                        key={value}
                        onClick={() => editor?.chain().focus().setTextAlign(value).run()}
                        className={cn(
                            'flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80',
                            editor?.isActive({ textAlign: value }) && 'bg-neutral-200/80'
                        )}
                    >
                        <Icon className="size-4" />
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const LinkButton = () => {
    const { editor } = useEditorStore();
    const [value, setvalue] = useState(editor?.getAttributes('link').href || "")

    const onChange = (href: string) => {
        editor?.chain().focus().extendMarkRange('link').setLink({ href }).run()
        setvalue('')
    }

    return (
        <DropdownMenu onOpenChange={(open) => {
            if (open) {
                setvalue(editor?.getAttributes('link').href)
            }
        }
        }>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <Link2Icon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
                <Input
                    placeholder="https://example.com"
                    value={value}
                    onChange={(e) => setvalue(e.target.value)}
                />
                <Button
                    onClick={() => onChange(value)}
                >
                    Apply
                </Button>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const ImageButton = () => {
    const { editor } = useEditorStore();
    const [isdialogOpen, setisdialogOpen] = useState(false)
    const [ImageUrl, setImageUrl] = useState(editor?.getAttributes('link').href || "")

    const onChange = (src: string) => {
        editor?.chain().focus().setImage({ src }).run()
    }

    const onUpload = () => {
        const input = document.createElement('input')
        input.type = 'file'
        input.accept = "image/*"

        input.onchange = (e) => {
            const file = (e.target as HTMLInputElement).files?.[0]
            if (file) {
                const imageUrl = URL.createObjectURL(file)
                onChange(imageUrl)
            }
        }
        input.click();
    }

    const handleSubmit = () => {
        if (ImageUrl) {
            onChange(ImageUrl);
            setImageUrl('')
            setisdialogOpen(false)
        }
    }
    return (
        <>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button
                        className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                    >
                        <ImageIcon className="size-4" />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem onClick={onUpload}>
                        <UploadIcon className="size-4 mr-2" />
                        Upload
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setisdialogOpen(true)}>
                        <SearchIcon className="size-4 mr-2" />
                        Paste image url
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>


            <Dialog open={isdialogOpen} onOpenChange={setisdialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Insert Image Url
                        </DialogTitle>
                    </DialogHeader>
                    <Input
                        placeholder="Imsert image url"
                        value={ImageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSubmit()
                            }
                        }}
                    />
                    <DialogFooter>
                        <Button onClick={handleSubmit}>
                            Insert
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

const TextColor = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes('textStyle').color || '#00000'
    const onChange = (color: ColorResult) => {
        editor?.chain().focus()?.setColor(color.hex).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <span className="text-xs">
                        A
                    </span>
                    <div
                        style={{ backgroundColor: value }}
                        className="h-0.5 w-full" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const HighlightButton = () => {
    const { editor } = useEditorStore();
    const value = editor?.getAttributes('highlight').color || '#FFFFF'


    const onChange = (color: ColorResult) => {
        editor?.chain().focus()?.setHighlight({ color: color.hex }).run()
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button
                    className="h-7 w-[30px] shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200 px-1.5 overflow-hidden text-sm"
                >
                    <HighlighterIcon className="size-4" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-2.5">
                <SketchPicker
                    color={value}
                    onChange={onChange}
                />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

const FontFamily = () => {
    const { editor } = useEditorStore();

    const fonts = [
        { label: "Arial", value: "Arial, sans-serif" },
        { label: 'Times New Roman', value: 'Times New Roman' },
        { label: 'Helvetica', value: 'Helvetica' },
        { label: 'Georgia', value: 'Georgia' },
        { label: 'Verdana', value: 'Verdana' },
        { label: 'Tahoma', value: 'Tahoma, sans-serif' },
        { label: 'Courier New', value: 'Courier New' },
        { label: 'Trebuchet MS', value: 'Trebuchet MS' },
        { label: 'Impact', value: "Impact, sans-serif" },
        { label: 'Comic Sans MS', value: 'Comic Sans MS' }
    ];

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >

                <button
                    className="h-7 w-[100px] ml-2 shrink-0 flex justify-center items-center rounded-sm hover:bg-neutral-100 px-1.5 overflow-hidden text-xs"
                >
                    <span className="truncate">
                        {
                            editor?.getAttributes('textStyle').fontFamily || 'Arial'
                        }
                    </span>
                    <ChevronDown className="size-4 ml-2 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {fonts.map(({ label, value }) => (
                    <button
                        onClick={() => editor?.chain().focus().setFontFamily(value).run()}
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            editor?.getAttributes('textStyle').fontFamily === value && "bg-neutral-200/80"
                        )}
                        style={{ fontFamily: value }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )

}


const HeadingLevelButton = () => {
    const { editor } = useEditorStore();
    const heading = [
        { label: "Normal text", value: 0, fontSize: "16px" },
        { label: "Heading 1", value: 1, fontSize: "32px" },
        { label: "Heading 2", value: 2, fontSize: "24px" },
        { label: "Heading 3", value: 3, fontSize: "20px" },
        { label: "Heading 4", value: 4, fontSize: "18px" },
        { label: "Heading 5", value: 5, fontSize: "16px" },
        { label: "Heading 6", value: 6, fontSize: "14px" },
    ]


    const getCurrentHeading = () => {
        for (let level = 1; level <= 6; level++) {
            if (editor?.isActive('heading', { level })) {
                return `Heading ${level}`
            }
        }
        return 'Normal text'
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild >

                <button
                    className="h-7 w-[120px] shrink-0 flex  justify-center items-center rounded-sm hover:bg-neutral-100 px-1.5 overflow-hidden text-sm"
                >
                    <span className="text-xs">
                        {
                            getCurrentHeading()
                        }
                    </span>
                    <ChevronDown className="size-4 ml-2 shrink-0" />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
                {heading.map(({ label, value, fontSize }) => (
                    <button
                        onClick={() => {
                            if (value === 0) {
                                editor?.chain().focus().setParagraph().run()
                            }
                            else {
                                editor?.chain().focus().toggleHeading({ level: value as Level }).run()
                            }
                        }
                        }
                        key={value}
                        className={cn(
                            "flex items-center gap-x-2 px-2 py-1 rounded-sm hover:bg-neutral-200/80",
                            (value === 0 && !editor?.isActive('heading') || editor?.isActive('heading', { level: value })) && 'bg-neutral-200/80'
                        )}
                        style={{ fontSize }}
                    >
                        <span className="text-sm">{label}</span>
                    </button>
                ))}
            </DropdownMenuContent>
        </DropdownMenu >
    )
}

const ToolBarButton = ({ onClick, isActive, icon: Icon }: ToolBarButtonProps) => {
    return (
        <button
            onClick={onClick}
            className={cn(
                "text-sm h-7 min-w-7 flex  items-center justify-center rounded-sm hover:bg-neutral-200/80",
                isActive && "bg-neutral-200/80"
            )}
        >
            <Icon className="size-4" />
        </button>
    );
}



export const ToolBar = () => {

    const { editor } = useEditorStore();
    // console.log({ editor });
    const sections: {
        label: string;
        icon: LucideIcon;
        onClick: () => void;
        isActive?: boolean;
    }[][] = [
            [
                {
                    label: "Undo",
                    icon: Undo2Icon,
                    onClick: () => {
                        editor?.chain()?.focus().undo().run()
                    }

                },
                {
                    label: "Redo",
                    icon: Redo2Icon,
                    onClick: () => {
                        editor?.chain()?.focus().redo().run()
                    }

                },
                {
                    label: "Print",
                    icon: PrinterIcon,
                    onClick: () => {
                        window.print()
                    }

                },
                {
                    label: "Spell Check",
                    icon: SpellCheckIcon,
                    onClick: () => {
                        const current = editor?.view.dom.getAttribute('spellcheck');
                        editor?.view.dom.setAttribute('spellcheck', current === 'false' ? 'true' : 'false')
                    }

                },
            ],
            [
                {
                    label: "Bold",
                    icon: BoldIcon,
                    isActive: editor?.isActive('bold'),
                    onClick: () => {
                        editor?.chain()?.focus().toggleBold().run()
                    }
                },
                {
                    label: "Italic",
                    icon: ItalicIcon,
                    isActive: editor?.isActive('italic'),
                    onClick: () => {
                        editor?.chain()?.focus().toggleItalic().run()
                    }
                },
                {
                    label: "Underline",
                    icon: UnderlineIcon,
                    isActive: editor?.isActive('underline'),
                    onClick: () => {
                        editor?.chain()?.focus().toggleUnderline().run()
                    }
                },
            ],
            [
                {
                    label: "To_DO",
                    icon: ListTodoIcon,
                    isActive: editor?.isActive('taskList'),
                    onClick: () => {
                        editor?.chain()?.focus()?.toggleTaskList().run()
                    }
                },
                {
                    label: "Comment",
                    icon: MessageSquarePlusIcon,
                    // isActive: editor?.isActive('underline'),
                    onClick: () => {
                        console.log('comment icon');
                    }
                },
                {
                    label: "Remove Formatting",
                    icon: RemoveFormattingIcon,
                    onClick: () => {
                        editor?.chain()?.focus()?.unsetAllMarks().run()
                    }
                },
            ]

        ]


    return (
        <div className="bg-[#F1F4F9] px-2.5 py-0.5 rounded-[24px] min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto" >
            {sections[0].map((items) => (
                <ToolBarButton key={items?.label} {...items} />
            ))}

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <FontFamily />
            <HeadingLevelButton />
            <Separator orientation="vertical" className="h-6 bg-neutral-300" />
            <FontSizeButton />

            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            {sections[1].map((items) => (
                <ToolBarButton key={items?.label} {...items} />
            ))}

            <TextColor />
            <HighlightButton />


            <Separator orientation="vertical" className="h-6 bg-neutral-300" />

            <ImageButton />
            <LinkButton />
            <AlignButton />
            <ListButton />
            <LineHeightButton />

            {sections[2].map((items) => (
                <ToolBarButton key={items?.label} {...items} />
            ))}


        </div>
    )
}