
import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Underline from '@tiptap/extension-underline';
import TaskList from '@tiptap/extension-task-list';
import TaskItem from '@tiptap/extension-task-item';
import { Math } from '@/lib/tiptap-extensions/math-extension';
import Toolbar from './Toolbar';
import FontSelector from './FontSelector';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
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
    if (!editor) return;
    
    // Get the editor content as HTML
    const editorContent = editor.getHTML();
    
    // Create a new jsPDF instance
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
    });
    
    // Create a temporary div to apply styling
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = editorContent;
    tempDiv.classList.add('pdf-export');
    tempDiv.classList.add(currentFont.value);
    document.body.appendChild(tempDiv);
    
    // Add CSS styling to the temporary div
    const styles = document.createElement('style');
    styles.innerHTML = `
      .pdf-export {
        font-size: 11pt !important;
        line-height: 1.5;
        color: #000;
        padding: 15mm;
        box-sizing: border-box;
        width: 180mm; /* Keep content within A4 width minus margins */
        overflow-wrap: break-word;
        word-wrap: break-word;
      }
      
      .pdf-export h1 {
        font-family: 'Alegreya', serif !important;
        font-weight: 900 !important;
        font-size: 20pt !important;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      
      .pdf-export h2 {
        font-family: 'Alegreya', serif !important;
        font-weight: 900 !important;
        font-size: 18pt !important;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      
      .pdf-export h3 {
        font-family: 'Alegreya', serif !important;
        font-weight: 900 !important;
        font-size: 16pt !important;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      
      .pdf-export h4, .pdf-export h5, .pdf-export h6 {
        font-family: 'Alegreya', serif !important;
        font-weight: 900 !important;
        font-size: 14pt !important;
        margin-top: 1em;
        margin-bottom: 0.5em;
      }
      
      .pdf-export p {
        margin-bottom: 0.8em;
        max-width: 100%;
      }
      
      .pdf-export img {
        max-width: 100%;
        height: auto;
      }
      
      .pdf-export ul, .pdf-export ol {
        padding-left: 1.5em;
        margin-bottom: 0.8em;
      }
      
      .pdf-export * {
        max-width: 100%;
      }
    `;
    tempDiv.appendChild(styles);
    
    // Convert the styled HTML to text content for PDF
    pdf.html(tempDiv, {
      callback: function(pdf) {
        // Save the PDF
        pdf.save(`${documentTitle}.pdf`);
        // Clean up the temporary div
        document.body.removeChild(tempDiv);
      },
      x: 0,
      y: 0,
      width: 210, // A4 width in mm
      windowWidth: 800, // Narrower width for better scaling
      autoPaging: true,
      margin: [10, 15, 10, 15], // Top, right, bottom, left margins
      html2canvas: {
        scale: 1.5, // Reduced from 2 for better proportions
        letterRendering: true,
        useCORS: true
      }
    });
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
