
import React, { useState } from 'react';
import { Editor } from '@tiptap/react';
import { 
  Bold, Italic, Underline, Heading1, Heading2, Heading3, 
  List, ListOrdered, CheckSquare, Code, Quote,
  SquareCode, Type
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Toggle } from '@/components/ui/toggle';
import { ToggleGroup } from '@/components/ui/toggle-group';
import { Separator } from '@/components/ui/separator';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface ToolbarProps {
  editor: Editor;
}

const fontSizes = [
  { label: '12px', value: '12px' },
  { label: '14px', value: '14px' },
  { label: '16px', value: '16px' },
  { label: '18px', value: '18px' },
  { label: '20px', value: '20px' },
  { label: '24px', value: '24px' },
  { label: '30px', value: '30px' },
  { label: '36px', value: '36px' },
];

const Toolbar: React.FC<ToolbarProps> = ({ editor }) => {
  const [fontSize, setFontSize] = useState('16px');

  if (!editor) {
    return null;
  }

  const addMathBlock = () => {
    editor.commands.insertContent({
      type: 'math',
      attrs: { content: '\\sum_{i=1}^n i = \\frac{n(n+1)}{2}' }
    });
  };

  const setTextSize = (size: string) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  return (
    <div className="toolbar p-1 border-t flex flex-wrap items-center gap-1 bg-white">
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
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="flex items-center gap-1">
            <Type className="h-4 w-4" />
            <span>Tamaño: {fontSize}</span>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-2">
          <Select
            value={fontSize}
            onValueChange={setTextSize}
          >
            <SelectTrigger>
              <SelectValue placeholder="Seleccionar tamaño" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {fontSizes.map((size) => (
                  <SelectItem key={size.value} value={size.value}>
                    {size.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </PopoverContent>
      </Popover>
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
      <ToggleGroup type="single" className="flex flex-wrap">
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 1 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
          aria-label="Heading 1"
        >
          <Heading1 className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 2 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
          aria-label="Heading 2"
        >
          <Heading2 className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 3 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
          aria-label="Heading 3"
        >
          <Heading3 className="h-4 w-4" />
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 4 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
          aria-label="Heading 4"
        >
          <span className="text-xs font-bold">H4</span>
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 5 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
          aria-label="Heading 5"
        >
          <span className="text-xs font-bold">H5</span>
        </Toggle>
        
        <Toggle
          size="sm"
          pressed={editor.isActive('heading', { level: 6 })}
          onPressedChange={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
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
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
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
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
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
      
      <Separator orientation="vertical" className="mx-1 h-6" />
      
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

export default Toolbar;
