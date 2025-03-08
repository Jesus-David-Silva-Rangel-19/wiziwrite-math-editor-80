
import React from 'react';
import { Editor } from '@tiptap/react';
import { SquareCode, Quote } from 'lucide-react';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { Button } from '@/components/ui/button';

interface BlockControlsProps {
  editor: Editor;
}

const BlockControls: React.FC<BlockControlsProps> = ({ editor }) => {
  if (!editor) {
    return null;
  }

  const addMathBlock = () => {
    editor.commands.insertContent({
      type: 'math',
      attrs: { content: '\\sum_{i=1}^n i = \\frac{n(n+1)}{2}' }
    });
  };

  return (
    <div className="flex items-center gap-1">
      <ToggleGroup type="multiple" className="flex flex-wrap">
        <Toggle
          size="sm"
          pressed={editor.isActive('codeBlock')}
          onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
          aria-label="Code block"
        >
          <SquareCode className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('blockquote')}
          onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
          aria-label="Blockquote"
        >
          <Quote className="h-4 w-4" />
        </Toggle>
      </ToggleGroup>
      
      <Button 
        variant="outline" 
        size="sm" 
        onClick={addMathBlock}
        className="text-xs"
      >
        LaTeX
      </Button>
    </div>
  );
};

export default BlockControls;
