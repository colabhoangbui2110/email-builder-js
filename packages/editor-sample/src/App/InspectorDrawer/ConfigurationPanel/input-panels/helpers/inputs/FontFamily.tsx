import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FONT_FAMILIES } from '@/documents/blocks/helpers/fontFamily';

type NullableProps = {
  label: string;
  onChange: (value: null | string) => void;
  defaultValue: null | string;
};
export function NullableFontFamily({ label, onChange, defaultValue }: NullableProps) {
  const [value, setValue] = useState(defaultValue ?? 'inherit');
  return (
    <div className="flex flex-col items-start gap-2 pb-1 w-full">
      <Label className="mb-1">{label}</Label>
      <Select
        value={value}
        onValueChange={(v) => {
          setValue(v);
          onChange(v === 'inherit' ? null : v);
        }}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Match email settings" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="inherit" style={{ fontFamily: 'inherit' }}>Match email settings</SelectItem>
          {FONT_FAMILIES.map((option) => (
            <SelectItem key={option.key} value={option.key} style={{ fontFamily: option.value }}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
