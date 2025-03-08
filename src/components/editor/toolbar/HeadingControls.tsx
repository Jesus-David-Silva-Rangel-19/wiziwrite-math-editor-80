
import React from 'react';
import { Editor } from '@tiptap/react';
import { Heading1, Heading2, Heading3 } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';

interface HeadingControlsProps {
  editor: Editor;
}

const HeadingControls: React.FC<HeadingControlsProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <ToggleGroup type="single" className="flex flex-wrap">
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 1 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 1 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 1 }).run();
          }
        }}
        aria-label="Heading 1"
      >
        <Heading1 className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 2 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 2 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 2 }).run();
          }
        }}
        aria-label="Heading 2"
      >
        <Heading2 className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 3 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 3 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 3 }).run();
          }
        }}
        aria-label="Heading 3"
      >
        <Heading3 className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 4 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 4 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 4 }).run();
          }
        }}
        aria-label="Heading 4"
      >
        <span className="text-xs font-bold">H4</span>
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 5 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 5 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 5 }).run();
          }
        }}
        aria-label="Heading 5"
      >
        <span className="text-xs font-bold">H5</span>
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('heading', { level: 6 })}
        onPressedChange={() => {
          if (editor.isActive('heading', { level: 6 })) {
            editor.chain().focus().setParagraph().run();
          } else {
            editor.chain().focus().setHeading({ level: 6 }).run();
          }
        }}
        aria-label="Heading 6"
      >
        <span className="text-xs font-bold">H6</span>
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('paragraph')}
        onPressedChange={() => editor.chain().focus().setParagraph().run()}
        aria-label="Paragraph"
      >
        <span className="text-xs font-bold">P</span>
      </Toggle>
    </ToggleGroup>
  );
};

export default HeadingControls;
