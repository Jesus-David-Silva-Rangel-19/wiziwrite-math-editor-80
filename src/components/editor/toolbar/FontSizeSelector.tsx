
import React from 'react';
import { Editor } from '@tiptap/react';
import { Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

interface FontSizeSelectorProps {
  editor: Editor;
  fontSize: string;
  setFontSize: (size: string) => void;
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

const FontSizeSelector: React.FC<FontSizeSelectorProps> = ({ editor, fontSize, setFontSize }) => {
  if (!editor) {
    return null;
  }

  const setTextSize = (size: string) => {
    setFontSize(size);
    editor.chain().focus().setFontSize(size).run();
  };

  return (
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
  );
};

export default FontSizeSelector;
