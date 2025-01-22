"use client"

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TaskItem from '@tiptap/extension-task-item'
import Table from '@tiptap/extension-table'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Highlight from '@tiptap/extension-highlight'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import Underline from '@tiptap/extension-underline'
import { LineHeightExtension } from '@/extensions/line-height'
import TableRow from '@tiptap/extension-table-row'
import TextAlign from '@tiptap/extension-text-align'
import FontFamily from '@tiptap/extension-font-family'
import TaskList from '@tiptap/extension-task-list'
import TextStyle from '@tiptap/extension-text-style'
import Image from '@tiptap/extension-image'
import ImageResize from 'tiptap-extension-resize-image'
import { useEditorStore } from '@/store/use-editor-store'

import { FontSizeExtension } from '@/extensions/font-size'
import { Ruler } from './Ruler'

export const Editor = () => {
    const { setEditor } = useEditorStore()

    const editor = useEditor({
        immediatelyRender: false,
        onCreate({ editor }) {
            setEditor(editor)
        },

        onDestroy() {
            setEditor(null)
        },

        onUpdate({ editor }) {
            setEditor(editor)
        },
        onSelectionUpdate({ editor }) {
            setEditor(editor)
        },
        onTransaction({ editor }) {
            setEditor(editor)
        },
        onFocus({ editor }) {
            setEditor(editor)
        },
        onBlur({ editor }) {
            setEditor(editor)
        },
        onContentError({ editor }) {
            setEditor(editor)
        },

        editorProps: {
            attributes: {
                style: "padding-left:56px; padding-right : 56px",
                class: "focus:outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col min-h-[1054px] w-[816px] pt-10"
            }
        },
        extensions: [
            StarterKit,
            TaskItem,
            Color,
            LineHeightExtension.configure({
                types: ['heading', 'paragraph'],
                defaultLineHeight: 'normal'
            }),
            FontSizeExtension,
            Highlight.configure({
                multicolor: true
            }),
            TaskList,
            Link.configure({
                openOnClick: false,
                autolink: true,
                defaultProtocol: 'https'
            }),
            FontFamily,
            ImageResize, Link.configure({
                openOnClick: false,
                autolink: false,
                defaultProtocol: 'https'
            }),
            Underline,
            TextStyle,
            TextAlign.configure({
                types: ['heading', 'paragraph']
            }),
            TaskItem.configure({
                nested: true,
            }),
            Table.configure({
                resizable: true,
            }),
            TableRow,
            Image,
            TableHeader,
            TableCell
        ],
        content: '<p>Hello World</p>'
    })
    return (
        <div className='size-full overflow-x-auto bg-[#F9FBFD] px-4 print:p-0 print:bg-white print:overflow-visible'>
            <Ruler />
            <div className='min-w-max flex justify-center items-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0'>
                <EditorContent editor={editor} />
            </div>
        </div>
    )
}