import React from 'react';

import { RoundedCornerOutlined } from '@mui/icons-material';

import { TStyle } from '../../../../../../documents/blocks/helpers/TStyle';
import { NullableColorInput } from '../inputs/ColorInput';
import { NullableFontFamily } from '../inputs/FontFamily';
import FontSizeInput from '../inputs/FontSizeInput';
import FontWeightInput from '../inputs/FontWeightInput';
import BackgroundImageInput from '../inputs/BackgroundImageInput';
import PaddingInput from '../inputs/PaddingInput';
import SliderInput from '../inputs/SliderInput';
import TextAlignInput from '../inputs/TextAlignInput';
import PositionInput from '../inputs/PositionInput';
import MeasurementInput from '../inputs/MeasurementInput';

type StylePropertyPanelProps = {
  name: keyof TStyle;
  value: TStyle;
  onChange: (style: TStyle) => void;
};
export default function SingleStylePropertyPanel({ name, value, onChange }: StylePropertyPanelProps) {
  const defaultValue = value[name] ?? null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleChange = (v: any) => {
    onChange({ ...value, [name]: v });
  };

  const updateValue = (name: string, v: any) => {
    onChange({ ...value, [name]: v });
  };

  switch (name) {
    case 'backgroundImage':
      return <BackgroundImageInput label="Background image" defaultValue={defaultValue} onChange={handleChange} />;
    case 'backgroundColor':
      return <NullableColorInput label="Background color" defaultValue={defaultValue} onChange={handleChange} />;
    case 'borderColor':
      return <NullableColorInput label="Border color" defaultValue={defaultValue} onChange={handleChange} />;
    case 'borderRadius':
      return (
        <SliderInput
          iconLabel={<RoundedCornerOutlined />}
          units="px"
          step={4}
          marks
          min={0}
          max={48}
          label="Border radius"
          defaultValue={defaultValue}
          onChange={handleChange}
        />
      );
    case 'color':
      return <NullableColorInput label="Text color" defaultValue={defaultValue} onChange={handleChange} />;
    case 'fontFamily':
      return <NullableFontFamily label="Font family" defaultValue={defaultValue} onChange={handleChange} />;
    case 'fontSize':
      return <FontSizeInput label="Font size" defaultValue={defaultValue} onChange={handleChange} />;
    case 'fontWeight':
      return <FontWeightInput label="Font weight" defaultValue={defaultValue} onChange={handleChange} />;
    case 'textAlign':
      return <TextAlignInput label="Alignment" defaultValue={defaultValue} onChange={handleChange} />;
    case 'padding':
      return <PaddingInput label="Padding" defaultValue={defaultValue} onChange={handleChange} />;
    case 'position':
      const customDefaultValue = {
        values: {
          top: value?.top ?? 0,
          bottom: value?.bottom ?? 0,
          right: value?.right ?? 0,
          left: value?.left ?? 0,
          zIndex: value?.zIndex ?? 0,
        },
        position: defaultValue
      } 
      return <PositionInput label="Position" defaultValue={customDefaultValue} onChange={updateValue} />;
    case 'width': 
      return <MeasurementInput label="Width" property='width' defaultValue={{
        value: value?.width ?? 0,
        maxValue: value?.maxWidth ?? 0,
        minValue: value?.minWidth ?? 0,
      }} onChange={updateValue} />;
    case 'height': 
      return <MeasurementInput label="Height" property='height' defaultValue={{
        value: value?.height ?? 0,
        maxValue: value?.maxHeight ?? 0,
        minValue: value?.minHeight ?? 0,
      }} onChange={updateValue} />;
  }
}
