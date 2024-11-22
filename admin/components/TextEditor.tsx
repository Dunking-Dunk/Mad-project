import React from 'react'
import { Color } from '@tiptap/extension-color'
import ListItem from '@tiptap/extension-list-item'
import TextStyle from '@tiptap/extension-text-style'
import { EditorProvider, useCurrentEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { Button } from './ui/button'

const MenuBar = () => {
    const { editor } = useCurrentEditor()

    if (!editor) {
        return null
    }

    return (
        <div className='flex flex-wrap w-full gap-x-5 space-y-2 mb-5 bg-primary rounded-md p-4 '>
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleBold()
                        .run()
                }
                className={editor.isActive('bold') ? 'bg-secondary text-primary' : ''}
            >
                bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleItalic()
                        .run()
                }
                className={editor.isActive('italic') ? 'bg-secondary text-primary' : ''}
            >
                italic
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleStrike().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleStrike()
                        .run()
                }
                className={editor.isActive('strike') ? 'bg-secondary text-primary' : ''}
            >
                strike
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCode().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .toggleCode()
                        .run()
                }
                className={editor.isActive('code') ? 'bg-secondary text-primary' : ''}
            >
                code
            </Button>
            <Button onClick={() => editor.chain().focus().unsetAllMarks().run()}>
                clear marks
            </Button>
            <Button onClick={() => editor.chain().focus().clearNodes().run()}>
                clear nodes
            </Button>
            <Button
                onClick={() => editor.chain().focus().setParagraph().run()}
                className={editor.isActive('paragraph') ? 'bg-secondary text-primary' : ''}
            >
                paragraph
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'bg-secondary text-primary' : ''}
            >
                h1
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'bg-secondary text-primary' : ''}
            >
                h2
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                className={editor.isActive('heading', { level: 3 }) ? 'bg-secondary text-primary' : ''}
            >
                h3
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
                className={editor.isActive('heading', { level: 4 }) ? 'bg-secondary text-primary' : ''}
            >
                h4
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
                className={editor.isActive('heading', { level: 5 }) ? 'bg-secondary text-primary' : ''}
            >
                h5
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
                className={editor.isActive('heading', { level: 6 }) ? 'bg-secondary text-primary' : ''}
            >
                h6
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? 'bg-secondary text-primary' : ''}
            >
                bullet list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
                className={editor.isActive('orderedList') ? 'bg-secondary text-primary' : ''}
            >
                ordered list
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? 'bg-secondary text-primary' : ''}
            >
                code block
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'bg-secondary text-primary' : ''}
            >
                blockquote
            </Button>
            <Button onClick={() => editor.chain().focus().setHorizontalRule().run()}>
                horizontal rule
            </Button>
            <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
                hard break
            </Button>
            <Button
                onClick={() => editor.chain().focus().undo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .undo()
                        .run()
                }
            >
                undo
            </Button>
            <Button
                onClick={() => editor.chain().focus().redo().run()}
                disabled={
                    !editor.can()
                        .chain()
                        .focus()
                        .redo()
                        .run()
                }
            >
                redo
            </Button>
            <Button
                onClick={() => editor.chain().focus().setColor('#958DF1').run()}
                className={editor.isActive('textStyle', { color: '#958DF1' }) ? 'is-active' : ''}
            >
                purple
            </Button>
        </div>
    )
}

const extensions = [
    Color.configure({ types: [TextStyle.name, ListItem.name] }),
    TextStyle.configure({ types: [ListItem.name] }),
    StarterKit.configure({
        bulletList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
        orderedList: {
            keepMarks: true,
            keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
        },
    }),
]


export default ({ setContent, content }: {
    setContent: any,
    content: any
}) => {
    return (
        <div className='border-2 rounded-md px-5 py-5'>
            <EditorProvider slotBefore={<MenuBar />} extensions={extensions} content={content} onUpdate={({ editor }) => {
                setContent(editor.getHTML())
            }} />
        </div>

    )
}