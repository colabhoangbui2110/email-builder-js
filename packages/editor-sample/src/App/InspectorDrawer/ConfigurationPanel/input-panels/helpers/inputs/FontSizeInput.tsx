import React, { useState } from 'react';

import { Label } from '@/components/ui/label';
import { TextFieldsOutlined } from '@mui/icons-material';

import RawSliderInput from './raw/RawSliderInput';

type Props = {
  label: string;
  defaultValue: number;
  onChange: (v: number) => void;
};
export default function FontSizeInput({ label, defaultValue, onChange }: Props) {
  const [value, setValue] = useState(defaultValue);
  const handleChange = (value: number) => {
    setValue(value);
    onChange(value);
  };
  return (
    <div className="flex flex-col items-start gap-2 pb-1">
      <Label className="mb-1">{label}</Label>
      <RawSliderInput
        iconLabel={<TextFieldsOutlined sx={{ fontSize: 16 }} />}
        value={value}
        setValue={handleChange}
        units="px"
        step={1}
        min={10}
        max={48}
      />
    </div>
  );
}
