import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';

type SliderInputProps = {
  label: string;
  iconLabel: JSX.Element;
  step?: number;
  marks?: boolean;
  units: string;
  min?: number;
  max?: number;
  defaultValue: number;
  onChange: (v: number) => void;
};

export default function SliderInput({ label, defaultValue, onChange, iconLabel, step, min, max, units }: SliderInputProps) {
  const [value, setValue] = useState(defaultValue);
  return (
    <div className="flex flex-col gap-1 items-start w-full">
      <Label className="flex items-center gap-2">{iconLabel}{label}</Label>
      <Slider
        value={[value]}
        min={min}
        max={max}
        step={step}
        onValueChange={([v]) => {
          setValue(v);
          onChange(v);
        }}
        className="w-full"
      />
      <div className="text-xs text-muted-foreground">{value}{units}</div>
    </div>
  );
}
