import React, { useState } from 'react';
import { FormControl, FormLabel, MenuItem, Select, Stack } from '@mui/material';

import TextDimensionInput from './TextDimensionInput';
import SliderInput from './SliderInput';

type PositionValues = {
  top?: number;
  bottom?: number;
  left?: number;
  right?: number;
  zIndex?: number;
};

type PositionData = {
  position: 'relative' | 'absolute' | null | undefined;
  values?: PositionValues | null;
};

type PositionInputProps = {
  label: string;
  defaultValue: PositionData | null;
  onChange: (name: string, value: any) => void;
};

export default function PositionInput({
  label,
  defaultValue,
  onChange,
}: PositionInputProps) {
  const [position, setPosition] = useState(defaultValue?.position || 'relative');
  const [values, setValues] = useState<PositionValues>(() => {
    if (defaultValue?.values) {
      return defaultValue.values;
    }
    return {
      top: undefined,
      left: undefined,
      bottom: undefined,
      right: undefined,
      zIndex: 0,
    };
  });

  function handlePositionChange(newPosition: 'relative' | 'absolute') {
    setPosition(newPosition);
    onChange('position', newPosition);
  }

  function handleValueChange(key: keyof PositionValues, newValue: number | undefined) {
    const updatedValues = {
      ...values,
      [key]: newValue,
    };
    setValues(updatedValues);
    onChange(key, newValue);
  }

  return (
    <Stack spacing={2} alignItems="flex-start" pb={1}>
      <FormControl fullWidth margin="normal">
        <FormLabel>{label}</FormLabel>
        <Select
          value={position}
          onChange={(e) => {
            handlePositionChange(e.target.value as 'relative' | 'absolute');
          }}
        >
          <MenuItem value="relative">Relative</MenuItem>
          <MenuItem value="absolute">Absolute</MenuItem>
        </Select>
      </FormControl>

      {position === 'absolute' && (
        <>
          <Stack spacing={2} direction="row" sx={{ mt: 2, width: '100%' }}>
            <TextDimensionInput
              label="Top"
              defaultValue={values.top !== undefined ? values.top : ''}
              onChange={(value) => handleValueChange('top', value === null ? undefined : value)}
            />
            <TextDimensionInput
              label="Left"
              defaultValue={values.left !== undefined ? values.left : ''}
              onChange={(value) => handleValueChange('left', value === null ? undefined : value)}
            />
          </Stack>

          <Stack spacing={2} direction="row" sx={{ mt: 2, width: '100%' }}>
            <TextDimensionInput
              label="Bottom"
              defaultValue={values.bottom !== undefined ? values.bottom : ''}
              onChange={(value) => handleValueChange('bottom', value === null ? undefined : value)}
            />
            <TextDimensionInput
              label="Right"
              defaultValue={values.right !== undefined ? values.right : ''}
              onChange={(value) => handleValueChange('right', value === null ? undefined : value)}
            />
          </Stack>

          <SliderInput
            label="Z-Index"
            min={0}
            max={10}
            step={1}
            defaultValue={values.zIndex ?? 0}
            onChange={(zIndex) => handleValueChange('zIndex', zIndex)}
            iconLabel={undefined}
            units=""
          />
        </>
      )}
    </Stack>
  );
}