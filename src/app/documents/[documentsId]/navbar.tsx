"use client"


import Image from 'next/image'
import Link from 'next/link'
import { DocumentInput } from './document-input'

import {
    Menubar,
    MenubarCheckboxItem,
    MenubarContent,
    MenubarItem,
    MenubarMenu,
    MenubarRadioGroup,
    MenubarRadioItem,
    MenubarSeparator,
    MenubarShortcut,
    MenubarSub,
    MenubarSubContent,
    MenubarSubTrigger,
    MenubarTrigger,
} from "@/components/ui/menubar"
import { Edit, FileIcon, FileJson, FilePenIcon, FilePlus2Icon, FileTextIcon, GlobeIcon, PrinterIcon, Redo2, Trash2Icon, Undo2 } from 'lucide-react'
import { BsFilePdf } from 'react-icons/bs'
export const NavBar = () => {

    return (
        <nav className='flex items-center justify-between'>
            <div className='flex gap-2 items-center'>
                <Link href='/'>
                    <Image src='/logo.svg' alt='logo' width={36} height={36} />
                </Link>
                <div className='flex flex-col'>
                    <DocumentInput />
                    <div className='flex'>
                        <Menubar className='border-none bg-transparent shadow-none h-auto p-0'>
                            <MenubarMenu>
                                <MenubarTrigger>
                                    File
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarSub>
                                        <MenubarSubTrigger>
                                            <FileIcon className='size-4 mr-2' />
                                            Save
                                        </MenubarSubTrigger>
                                        <MenubarSubContent>
                                            <MenubarItem>
                                                <FileJson className='size-4 mr-2' />
                                                JSON
                                            </MenubarItem>
                                            <MenubarItem>
                                                <GlobeIcon className='size-4 mr-2' />
                                                HTML
                                            </MenubarItem>
                                            <MenubarItem>
                                                <BsFilePdf className='size-4 mr-2' />
                                                PDF
                                            </MenubarItem>
                                            <MenubarItem>
                                                <FileTextIcon className='size-4 mr-2' />
                                                Text
                                            </MenubarItem>
                                        </MenubarSubContent>
                                    </MenubarSub>
                                    <MenubarItem>
                                        <FilePlus2Icon className='size-4 mr-2' />
                                        New Document
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem>
                                        <FilePenIcon className='size-4 mr-2' />
                                        Rename
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Trash2Icon className='size-4 mr-2' />
                                        Remove
                                    </MenubarItem>
                                    <MenubarSeparator />
                                    <MenubarItem onClick={() => window.print()}>
                                        <PrinterIcon className='size-4 mr-2' />
                                        Print <MenubarShortcut>Ctrl+P</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Edit
                                </MenubarTrigger>
                                <MenubarContent>
                                    <MenubarItem>
                                        <Undo2 className='size-4 mr-2' />
                                        Undo <MenubarShortcut>Ctrl+Z</MenubarShortcut>
                                    </MenubarItem>
                                    <MenubarItem>
                                        <Redo2 className='size-4 mr-2' />
                                        Redo <MenubarShortcut>Ctrl+Shift+Z</MenubarShortcut>
                                    </MenubarItem>
                                </MenubarContent>
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Insert
                                </MenubarTrigger>
                                {/* <MenubarContent className='flex items-center'>
                                    <Edit className='size-4 mr-2' />
                                    Save
                                </MenubarContent> */}
                            </MenubarMenu>
                            <MenubarMenu>
                                <MenubarTrigger className='text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto'>
                                    Format
                                </MenubarTrigger>
                                {/* <MenubarContent className='flex items-center'>
                                    <Edit className='size-4 mr-2' />
                                    Save
                                </MenubarContent> */}
                            </MenubarMenu>
                        </Menubar>
                    </div>
                </div>
            </div>
        </nav>
    )
}