
import React from 'react';
import { Editor } from '@tiptap/react';
import { List, ListOrdered, CheckSquare } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';

interface ListControlsProps {
  editor: Editor;
}

const ListControls: React.FC<ListControlsProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  return (
    <ToggleGroup type="multiple" className="flex flex-wrap">
      <Toggle
        size="sm"
        pressed={editor.isActive('bulletList')}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
        aria-label="Bullet list"
      >
        <List className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('orderedList')}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
        aria-label="Ordered list"
      >
        <ListOrdered className="h-4 w-4" />
      </Toggle>
      
      <Toggle
        size="sm"
        pressed={editor.isActive('taskList')}
        onPressedChange={() => editor.chain().focus().toggleTaskList().run()}
        aria-label="Task list"
      >
        <CheckSquare className="h-4 w-4" />
      </Toggle>
    </ToggleGroup>
  );
};

export default ListControls;
