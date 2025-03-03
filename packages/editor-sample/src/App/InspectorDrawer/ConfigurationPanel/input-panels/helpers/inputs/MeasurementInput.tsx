import React, { useState } from 'react';
import { Stack } from '@mui/material';
import TextDimensionInput from './TextDimensionInput';

// type engthUnit = 'px' | '%' | 'em' | 'rem' | 'vh' | 'vw' | 'vmin' | 'vmax' | 'cm' | 'mm' | 'in' | 'pt' | 'pc';

type MeasurementData = {
  value?: number;
  maxValue?: number;
  minValue?: number;
  // unit?: engthUnit | 'px';
};

type PositionInputProps = {
  label: string;
  property: string;
  defaultValue: MeasurementData | null;
  onChange: (name: string, value: any) => void;
};

export default function MeasurementInput({
  label,
  property,
  defaultValue,
  onChange,
}: PositionInputProps) {
  const [value, setValue] = useState(defaultValue?.value || undefined);
  const [maxValue, setMaxValue] = useState(defaultValue?.maxValue || undefined);
  const [minValue, setMinValue] = useState(defaultValue?.minValue || undefined);
  // const [unit, setUnit] = useState(defaultValue?.unit || 'px');

  function upperCaseFirstLetter(str: string) {
    if (!str) {
      return str;
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function handleValueChange(newValue: number | null) {
    setValue(newValue || undefined);
    onChange(property, newValue);
  }

  function handleMaxValueChange(newValue: number | null) {
    setMaxValue(newValue || undefined);
    onChange(`max${upperCaseFirstLetter(property)}`, newValue);
  }

  function handleMinValueChange(newValue: number | null) {
    setMinValue(newValue || undefined);
    onChange(`min${upperCaseFirstLetter(property)}`, newValue);
  }

  return (
    <Stack spacing={2} alignItems="flex-start" pb={1}>
      <Stack direction="row" spacing={2}>
        <TextDimensionInput
          label={label}
          defaultValue={defaultValue?.value || undefined}
          onChange={handleValueChange}
        />
        <TextDimensionInput
          label="Max"
          defaultValue={defaultValue?.maxValue || undefined}
          onChange={handleMaxValueChange}
        />
        <TextDimensionInput
          label="Min"
          defaultValue={defaultValue?.minValue || undefined}
          onChange={handleMinValueChange}
        />
      </Stack>
    </Stack>
  );
}