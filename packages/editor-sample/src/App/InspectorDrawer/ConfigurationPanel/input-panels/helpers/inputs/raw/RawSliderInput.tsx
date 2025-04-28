import React from 'react';

import { Slider } from '@/components/ui/slider';

type SliderInputProps = {
  iconLabel: JSX.Element;
  step?: number;
  marks?: boolean;
  units: string;
  min?: number;
  max?: number;
  value: number;
  setValue: (v: number) => void;
};

export default function RawSliderInput({ iconLabel, value, setValue, units, ...props }: SliderInputProps) {
  return (
    <div className="flex items-center justify-between w-full space-x-2">
      <div className="min-w-6 flex-shrink-0 leading-none">
        {iconLabel}
      </div>
      <Slider
        defaultValue={[value]}
        min={props.min}
        max={props.max}
        step={props.step}
        onValueChange={(values) => {
          setValue(values[0]);
        }}
        className="flex-grow"
      />
      <div className="min-w-8 text-right flex-shrink-0">
        <span className="text-sm text-muted-foreground leading-none">
          {value}{units}
        </span>
      </div>
    </div>
  );
}
