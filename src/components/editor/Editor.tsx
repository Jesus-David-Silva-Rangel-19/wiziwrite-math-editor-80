
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Math } from '@/lib/tiptap-extensions/math-extension';
import Toolbar from './Toolbar';
import FontSelector from './FontSelector';
import html2pdf from 'html2pdf.js';
import Footer from './Footer';
import './editor.css';
import TextStyle from '@tiptap/extension-text-style';
import FontSize from '@/lib/tiptap-extensions/font-size';

const fonts = [
  { name: 'Labrada', value: 'font-labrada' },
  { name: 'Alegreya', value: 'font-alegreya' },
  { name: 'Patua One', value: 'font-patua' },
  { name: 'Special Elite', value: 'font-special-elite' },
  { name: 'Copse', value: 'font-copse' },
  { name: 'IM Fell DW Pica SC', value: 'font-im-fell' },
  { name: 'Young Serif', value: 'font-young-serif' },
  { name: 'Belgrano', value: 'font-belgrano' },
  { name: 'JetBrains Mono', value: 'font-jetbrains' },
];

const Editor = () => {
  const [currentFont, setCurrentFont] = useState(fonts[0]);
  const [documentTitle, setDocumentTitle] = useState('Untitled Document');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
        },
        bulletList: {}, // Changed from true to an empty object to satisfy TypeScript
        orderedList: {}, // Changed from true to an empty object to satisfy TypeScript
      }),
      Underline,
      TaskList,
      TaskItem.configure({
        nested: true,
      }),
      Math,
      TextStyle,
      FontSize,
    ],
    content: '<h1>Welcome to the WiziWrite Editor!</h1><p>Start typing here...</p>',
    editorProps: {
      attributes: {
        class: `editor-content p-8 min-h-[70vh] outline-none ${currentFont.value}`,
      },
    },
  });

  const handleFontChange = (font: { name: string; value: string }) => {
    setCurrentFont(font);
    if (editor) {
      editor.commands.updateAttributes('editor-content', {
        class: `editor-content p-8 min-h-[70vh] outline-none ${font.value}`,
      });
    }
  };

  const exportToPdf = () => {
    const element = document.querySelector('.editor-wrapper');
    if (!element) return;

    const opt = {
      margin: 1,
      filename: `${documentTitle}.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2, useCORS: true },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    // Clone the element to avoid modifying the original
    const clone = element.cloneNode(true) as HTMLElement;
    const content = clone.querySelector('.editor-content');
    
    // Add necessary styling to the clone for PDF export
    if (content) {
      content.classList.add('pdf-export');
      content.classList.add(currentFont.value);
      html2pdf().set(opt).from(content).save();
    }
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentTitle(e.target.value);
  };

  if (!editor) {
    return <div>Loading editor...</div>;
  }

  return (
    <div className="editor-container flex flex-col h-screen bg-gray-50">
      <div className="toolbar-container bg-white border-b">
        <div className="flex items-center justify-between px-4 py-2">
          <input
            type="text"
            value={documentTitle}
            onChange={handleTitleChange}
            className="font-medium text-lg focus:outline-none border-b-2 border-transparent focus:border-blue-500"
            placeholder="Untitled Document"
          />
          <div className="flex space-x-4">
            <FontSelector fonts={fonts} currentFont={currentFont} onFontChange={handleFontChange} />
            <button 
              onClick={exportToPdf}
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700 transition-colors"
            >
              Export PDF
            </button>
          </div>
        </div>
        <Toolbar editor={editor} />
      </div>
      <div className="editor-wrapper flex-grow overflow-auto bg-gray-100 p-4">
        <div className="mx-auto max-w-3xl bg-white shadow-md rounded-md min-h-[1100px]">
          <EditorContent editor={editor} className="h-full" />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Editor;
