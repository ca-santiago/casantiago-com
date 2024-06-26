'use client'
import React from 'react';
import { useEditor, EditorContent, BubbleMenu, FloatingMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import Code from '@tiptap/extension-code';
import Placeholder from '@tiptap/extension-placeholder';
import cn from 'classnames';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';

import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

import './content.css';
import './editor.css';
import 'highlight.js/styles/atom-one-dark.css';

import Heading from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';

import { IoMdCode } from "react-icons/io";
import { TbSourceCode, TbItalic, TbBold, TbStrikethrough } from "react-icons/tb";
import { FiList } from "react-icons/fi";
import { LuImagePlus } from "react-icons/lu";
import { CgFormatSeparator } from "react-icons/cg";
import { IoCloseOutline } from "react-icons/io5";
import { FaLink } from "react-icons/fa6";

import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';
import OrderedList from '@tiptap/extension-ordered-list';
import useOnScreen from '@/hooks/useOnScreen';
import Link from '@tiptap/extension-link';

const { title, content } = {
  "title": "",
  "content": ""
}

const lowlight = createLowlight(common);
lowlight.register({ js, ts, html, css });

const Menu = ({ editor }) => {

  const handleLinkAdd = () => {
    const url = window.prompt('URL');

    if (url === null) return;

    if (!/^https?:\/\//.test(url)) return alert('Invalid url');

    editor.chain().focus().setLink({ href: url }).run();
  }

  const unsetLink = () => {
    editor.chain().focus().unsetLink().run();
  }

  return (
    <BubbleMenu className='editor-menu' editor={editor} tippyOptions={{ duration: 100 }}>
      <div className='flex gap-0'>
        {editor.can().setBold() && <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={editor.isActive('bold') ? 'is-active' : ''}
        >
          <TbBold />
        </button>}
        {editor.can().setItalic() && <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={editor.isActive('italic') ? 'is-active' : ''}
        >
          <TbItalic />
        </button>}
        {editor.can().setStrike() && <button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          className={editor.isActive('strike') ? 'is-active' : ''}
        >
          <TbStrikethrough />
        </button>}
      </div>
      <div className='flex gap-0'>
        <button onClick={() => editor.isActive('link') ? unsetLink() : handleLinkAdd()}
          className={editor.isActive('link') ? 'is-active' : ''}>
          <FaLink />
        </button>
      </div>
      <div className='flex gap-0'>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <FiList />
        </button>
        {editor.can().setCode() && <button
          onClick={() => editor.chain().focus().toggleCode().run()}
          className={editor.isActive('code') ? 'is-active' : ''}>
          <IoMdCode />
        </button>}
        <button
          onClick={() => editor.chain().focus().toggleCodeBlock({ language: 'javascript' }).run()}
          className={editor.isActive('codeBlock', {}) ? 'is-active' : ''}>
          <TbSourceCode />
        </button>
      </div>
      <div className='flex gap-1 font-semibold'>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
        >
          H1
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
        >
          H2
        </button>
        <button
          onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
        >
          H3
        </button>
      </div>
    </BubbleMenu>
  );
}

const LeftMenu = ({ editor }) => {
  const [isOpen, setIsOpen] = React.useState(true);
  const containerRef = React.useRef();
  const isVisible = useOnScreen(containerRef)

  const handleSetSeparator = () => {
    editor.chain().focus().setHorizontalRule().run();
  }

  const addImage = React.useCallback(() => {
    const url = window.prompt('URL')
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor]);

  const togglePlusClick = () => {
    setIsOpen(prev => !prev);
  }

  const addCloseIconCx = cn({
    'add-close-container': true,
    'rotate-45': !isOpen,
  });

  const close = (e) => {
    setIsOpen(false);
  }

  React.useEffect(() => {
    if (!isVisible) close();
  }, [isVisible]);

  return (
    <FloatingMenu editor={editor} tippyOptions={{ delay: 300, animateFill: true }}>
      <div ref={containerRef}>
        <div className="absolute bottom-0 translate-y-1/2 right-6 gap-2 flex text-slate-500 select-none">
          <div className="menu-actions-container">
            <div className={addCloseIconCx} onClick={togglePlusClick}>
              <IoCloseOutline size={28} />
            </div>
            {isOpen && (
              <div className="actions-container">
                <button><LuImagePlus onClick={addImage} size={20} /></button>
                <button><CgFormatSeparator onClick={handleSetSeparator} size={20} /></button>
              </div>
            )}
          </div>
        </div>
      </div>
    </FloatingMenu>
  );
}

const CustomDoc = Document.extend({
  content: 'heading',
  inline: true,
});

const BlogEditor = () => {
  const [previewMode, setPreviewMode] = React.useState(false);
  const titleEditor = useEditor({
    content: title,
    extensions: [
      CustomDoc,
      Text,
      Heading.configure({ levels: [1] }),
      Placeholder.configure({
        placeholder: "Title...",
      }),
    ],
    editable: !previewMode,
  });
  const contentEditor = useEditor({
    content,
    extensions: [
      // Paragraph and block missing
      StarterKit.configure(),
      Document,
      Text,
      Image,
      Code,
      BulletList,
      OrderedList,
      Heading.configure({ levels: [1, 2, 3] }),
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'hljs language-',
        exitOnTripleEnter: true,
        exitOnArrowDown: true,
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Subheading ${node.attrs?.['level'] || ''}`;
          }
          return 'Your story here...';
        }
      }),
      Link.configure({
        autolink: false,
        linkOnPaste: true,
        openOnClick: false,
      })
    ],
    editable: !previewMode
  });

  const focusEditor = () => {
    if (contentEditor) contentEditor.commands.focus();
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") focusEditor();
  }

  const handleCopyClick = () => {
    if (!contentEditor || !titleEditor) return;
    console.log({
      title: titleEditor.getHTML(),
      content: contentEditor.getHTML()
    });
  }

  const handleTogglePreview = () => {
    setPreviewMode((prev) => {
      contentEditor.setEditable(!prev === false);
      titleEditor.setEditable(!prev === false);
      return !prev;
    });
  }

  return (
    <div className="w-full min-h-screen bg-white">
      <div className='p-3 shadow fixed w-full bg-white flex gap-4 z-10 items-center'>
        <div className='flex items-center'>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked={previewMode} class="sr-only peer" onChange={handleTogglePreview} />
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            <span class="ms-3 text-sm text-nowrap font-medium text-gray-900 dark:text-gray-300 select-none">Preview mode</span>
          </label>
        </div>
        <div className='flex flex-row items-center justify-center'>
          <button className='rounded bg-blue-500 p-1 px-2 text-white' onClick={handleCopyClick}>Copy content</button>
        </div>
      </div>
      {contentEditor && <Menu editor={contentEditor} />}
      {contentEditor && <LeftMenu editor={contentEditor} />}

      <div className="content-container">
        <EditorContent contentEditable={previewMode} readOnly={previewMode} id="content-heading" onKeyDown={handleTitleKeyDown} editor={titleEditor} />
        <EditorContent contentEditable={previewMode} readOnly={previewMode} id="content-body" editor={contentEditor} />
      </div>


      {/* <h3 className='ml-2'>Raw version</h3>
      <div className='m-2 border p-3 rounded-md border-slate-300'>
        <p>{contentEditor?.getHTML()}</p>
      </div> */}
    </div>
  )
}

export default BlogEditor;
