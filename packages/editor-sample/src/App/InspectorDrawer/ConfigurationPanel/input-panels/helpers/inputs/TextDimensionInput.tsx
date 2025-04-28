import React from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

type TextDimensionInputProps = {
  label: string;
  defaultValue: number | null | undefined;
  onChange: (v: number | null) => void;
};
export default function TextDimensionInput({ label, defaultValue, onChange }: TextDimensionInputProps) {
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (ev) => {
    const value = parseInt(ev.target.value);
    onChange(isNaN(value) ? null : value);
  };
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label>{label}</Label>
      <div className="flex items-center">
        <Input
          type="number"
          onChange={handleChange}
          defaultValue={defaultValue ?? ''}
          placeholder="auto"
          className="w-20"
        />
        <span className="ml-2 text-xs text-muted-foreground">px</span>
      </div>
    </div>
  );
}
