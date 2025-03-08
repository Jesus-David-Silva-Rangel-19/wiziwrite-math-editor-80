
import React from 'react';
import { Editor } from '@tiptap/react';
import { Bold, Italic, Underline } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';

interface TextFormattingProps {
  editor: Editor;
}

const TextFormatting: React.FC<TextFormattingProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <ToggleGroup type="multiple" className="flex flex-wrap">
      <Toggle
        size="sm"
        pressed={editor.isActive('bold')}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
        aria-label="Toggle bold"
      >
        <Bold className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('italic')}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
        aria-label="Toggle italic"
      >
        <Italic className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('underline')}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
        aria-label="Toggle underline"
      >
        <Underline className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
};

export default TextFormatting;
