import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

type Props = {
  label: string;
  rows?: number;
  placeholder?: string;
  helperText?: string | JSX.Element;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  InputProps?: any;
  defaultValue: string;
  onChange: (v: string) => void;
};
export default function TextInput({ helperText, label, placeholder, rows, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  const isMultiline = typeof rows === 'number' && rows > 1;
  return (
    <div className="flex flex-col gap-1 w-full">
      <Label>{label}</Label>
      {isMultiline ? (
        <Textarea
          rows={rows}
          placeholder={placeholder}
          value={value}
          onChange={(ev) => {
            const v = ev.target.value;
            setValue(v);
            onChange(v);
          }}
          className="w-full"
        />
      ) : (
        <Input
          placeholder={placeholder}
          value={value}
          onChange={(ev) => {
            const v = ev.target.value;
            setValue(v);
            onChange(v);
          }}
          className="w-full"
        />
      )}
      {helperText && <div className="text-xs text-muted-foreground">{helperText}</div>}
    </div>
  );
}
