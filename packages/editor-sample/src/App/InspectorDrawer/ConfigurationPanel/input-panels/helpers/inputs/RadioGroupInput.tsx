import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { ToggleGroup } from '@/components/ui/toggle-group';

type Props = {
  label: string | JSX.Element;
  children: JSX.Element | JSX.Element[];
  defaultValue: string;
  onChange: (v: string) => void;
};

export default function RadioGroupInput({ label, children, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  
  return (
    <div className="flex flex-col items-start">
      <Label className="mb-2">{label}</Label>
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(v) => {
          if (v) {
            setValue(v);
            onChange(v);
          }
        }}
        className="justify-start w-full"
      >
        {children}
      </ToggleGroup>
    </div>
  );
}
