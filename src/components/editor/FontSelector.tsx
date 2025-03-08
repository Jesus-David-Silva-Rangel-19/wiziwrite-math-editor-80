
import React from 'react';
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';

interface Font {
  name: string;
  value: string;
}

interface FontSelectorProps {
  fonts: Font[];
  currentFont: Font;
  onFontChange: (font: Font) => void;
}

const FontSelector: React.FC<FontSelectorProps> = ({ fonts, currentFont, onFontChange }) => {
  return (
    <Select 
      value={currentFont.value}
      onValueChange={(value) => {
        const selectedFont = fonts.find(f => f.value === value);
        if (selectedFont) {
          onFontChange(selectedFont);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder={currentFont.name} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {fonts.map((font) => (
            <SelectItem 
              key={font.value} 
              value={font.value}
              className={font.value}
            >
              {font.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FontSelector;
