'use client'
import React from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image'
import Code from '@tiptap/extension-code';
import Placeholder from '@tiptap/extension-placeholder';
import { EditorView } from '@tiptap/pm/view';

import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight, common } from 'lowlight';


// import hljs from 'highlight.js';
import css from 'highlight.js/lib/languages/css';
import js from 'highlight.js/lib/languages/javascript';
import ts from 'highlight.js/lib/languages/typescript';
import html from 'highlight.js/lib/languages/xml';

import 'highlight.js/styles/atom-one-dark.css';

import Heading from '@tiptap/extension-heading';
import Document from '@tiptap/extension-document';
import Text from '@tiptap/extension-text';


import { IoMdCode } from "react-icons/io";
import { TbSourceCode, TbItalic, TbBold, TbStrikethrough } from "react-icons/tb";
import { FiList } from "react-icons/fi";

const { title, content } = {
  "title": "",
  "content": ""
}

const lowlight = createLowlight(common);
lowlight.register({
  js,
  ts,
  html,
  css
});

import hljs from 'highlight.js';
import BulletList from '@tiptap/extension-bullet-list';
import ListItem from '@tiptap/extension-list-item';

const Menu = ({ editor }) => {

  const addImage = React.useCallback(() => {
    const url = window.prompt('URL')
    if (url) editor.chain().focus().setImage({ src: url }).run();
  }, [editor])

  // const handleHeadingChange = (e) => {
  //   const handleHeadingChange = (e) => {
  //     if (!!e.target?.value) {
  //       editor.chain().focus().setHeading({ level: Number(e.target.value) }).run();
  //     } else {
  //       editor.chain().focus().unsetAllMarks();
  //     }

  //     // <select name='heading' className='w-fit text-slate-400' onChangeCapture={handleHeadingChange}>
  //     //       <option value="">Heading</option>
  //     //       <option
  //     //         className={editor.isActive('heading', { level: 1 } ? 'is-active text-slate-800' : '')}
  //     //         selected={editor.isActive('heading', { level: 1 })}
  //     //         value={1}>H1</option>
  //     //       <option
  //     //         className={editor.isActive('heading', { level: 2 } ? 'is-active text-slate-800' : '')}
  //     //         selected={editor.isActive('heading', { level: 2 })}
  //     //         value={2}>H2</option>
  //     //       <option
  //     //         className={editor.isActive('heading', { level: 3 } ? 'is-active text-slate-800' : 'no')}
  //     //         selected={editor.isActive('heading', { level: 3 })}
  //     //         value={3}>H3</option>
  //     //     </select>
  //   }
  // }

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
      {/* <div className='flex gap-0'></div> */}
      <div className='flex gap-0'>
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={editor.isActive('bulletList') ? 'is-active' : ''}>
          <FiList />
        </button>
        {/* {editor.can().setImage() && <button onClick={addImage}>Img</button>} */}
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

const CustomDoc = Document.extend({
  content: 'heading',
  inline: true,
});

const BlogEditor = () => {
  const titleEditor = useEditor({
    content: title,
    extensions: [
      CustomDoc,
      Text,
      Heading.configure({ levels: [1] }),
      Placeholder.configure({
        placeholder: "Title...",
      }),
    ]
  });

  const editor = useEditor({
    content,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3]
        }
      }),
      Image,
      Code,
      BulletList,
      ListItem,
      CodeBlockLowlight.configure({
        lowlight,
        languageClassPrefix: 'hljs language-'
      }),
      Placeholder.configure({
        placeholder: ({ node }) => {
          if (node.type.name === 'heading') {
            return `Subheading ${node.attrs?.['level'] || ''}`;
          }
          return 'Your story here...';
        }
      }),
    ]
  });

  const focusEditor = () => {
    if (editor) editor.commands.focus();
  }

  const handleTitleKeyDown = (e) => {
    if (e.key === "Enter") focusEditor();
  }

  const handleCopyClick = () => {
    if (!editor || !titleEditor) return;
    console.log({
      title: titleEditor.getHTML(),
      content: editor.getHTML()
    });
  }

  // React.useEffect(() => {
  //   hljs.highlightAll();
  // });

  return (
    <div className="w-full min-h-screen bg-white">
      {editor && <Menu editor={editor} />}
      <div className='min-h-4 w-full flex flex-row items-center justify-center p-3'>
        <button className='rounded bg-blue-500 p-1 px-2 text-white' onClick={handleCopyClick}>Copy content</button>
      </div>
      <div className="w-full md:max-w-2xl mx-auto pt-10">
        <EditorContent onKeyDown={handleTitleKeyDown} editor={titleEditor} />
        <EditorContent className='mt-14' editor={editor} />
      </div>

      {/* <h3 className='ml-2'>getHTML and setInner</h3>
      <div className='m-2 border p-3 rounded-md border-slate-300'>
        <span dangerouslySetInnerHTML={{ __html: editor?.getHTML()  }}></span>
      </div> */}

      {/* <h3 className='ml-2'>Raw version</h3>
      <div className='m-2 border p-3 rounded-md border-slate-300'>
        <p>{editor?.getHTML()}</p>
      </div> */}
    </div>
  )
}

export default BlogEditor;
