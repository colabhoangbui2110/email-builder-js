import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';

type Props = {
  label: string;
  defaultValue: boolean;
  onChange: (value: boolean) => void;
};

export default function BooleanInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex items-center gap-2">
      <Switch
        checked={value}
        onCheckedChange={(checked: boolean) => {
          setValue(checked);
          onChange(checked);
        }}
        id="boolean-input"
      />
      <Label htmlFor="boolean-input">{label}</Label>
    </div>
  );
}
