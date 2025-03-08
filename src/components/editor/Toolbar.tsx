
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { Separator } from '@/components/ui/separator';
import TextFormatting from './toolbar/TextFormatting';
import HeadingControls from './toolbar/HeadingControls';
import ListControls from './toolbar/ListControls';
import BlockControls from './toolbar/BlockControls';
import FontSizeSelector from './toolbar/FontSizeSelector';

interface ToolbarProps {
  editor: Editor;
}

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [fontSize, setFontSize] = useState('16px');

  if (!editor) {
    return null;
  }

  return (
    <div className="toolbar p-1 border-t flex flex-wrap items-center gap-1 bg-white">
      <TextFormatting editor={editor} />
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <FontSizeSelector 
        editor={editor} 
        fontSize={fontSize} 
        setFontSize={setFontSize} 
      />
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <HeadingControls editor={editor} />
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <ListControls editor={editor} />
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <BlockControls editor={editor} />
    </div>
  );
};

export default Toolbar;
