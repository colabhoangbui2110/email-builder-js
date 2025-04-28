import React, { useState } from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import {
  SpaceBarOutlined,
  VerticalAlignBottomOutlined,
  VerticalAlignCenterOutlined,
  VerticalAlignTopOutlined,
} from '@mui/icons-material';

import ColumnsContainerPropsSchema, {
  ColumnsContainerProps,
} from '../../../../documents/blocks/ColumnsContainer/ColumnsContainerPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import ColumnWidthsInput from './helpers/inputs/ColumnWidthsInput';
import RadioGroupInput from './helpers/inputs/RadioGroupInput';
import SliderInput from './helpers/inputs/SliderInput';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type ColumnsContainerPanelProps = {
  data: ColumnsContainerProps;
  setData: (v: ColumnsContainerProps) => void;
};
export default function ColumnsContainerPanel({ data, setData }: ColumnsContainerPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const updateData = (d: unknown) => {
    const res = ColumnsContainerPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  return (
    <BaseSidebarPanel title="Columns block">
      <RadioGroupInput
        label="Number of columns"
        defaultValue={data.props?.columnsCount === 2 ? '2' : '3'}
        onChange={(v) => {
          updateData({ ...data, props: { ...data.props, columnsCount: v === '2' ? 2 : 3 } });
        }}
      >
        <ToggleGroup type="single" value={data.props?.columnsCount === 2 ? '2' : '3'} onValueChange={(v) => updateData({ ...data, props: { ...data.props, columnsCount: v === '2' ? 2 : 3 } })}>
          <ToggleGroupItem value="2">2</ToggleGroupItem>
          <ToggleGroupItem value="3">3</ToggleGroupItem>
        </ToggleGroup>
      </RadioGroupInput>
      <ColumnWidthsInput
        defaultValue={data.props?.fixedWidths}
        onChange={(fixedWidths) => {
          updateData({ ...data, props: { ...data.props, fixedWidths } });
        }}
      />
      <SliderInput
        label="Columns gap"
        iconLabel={<SpaceBarOutlined sx={{ color: 'text.secondary' }} />}
        units="px"
        step={4}
        marks
        min={0}
        max={80}
        defaultValue={data.props?.columnsGap ?? 0}
        onChange={(columnsGap) => updateData({ ...data, props: { ...data.props, columnsGap } })}
      />
      <RadioGroupInput
        label="Alignment"
        defaultValue={data.props?.contentAlignment ?? 'middle'}
        onChange={(contentAlignment) => {
          updateData({ ...data, props: { ...data.props, contentAlignment } });
        }}
      >
        <ToggleGroupItem value="top">
          <VerticalAlignTopOutlined fontSize="small" />
        </ToggleGroupItem>
        <ToggleGroupItem value="middle">
          <VerticalAlignCenterOutlined fontSize="small" />
        </ToggleGroupItem>
        <ToggleGroupItem value="bottom">
          <VerticalAlignBottomOutlined fontSize="small" />
        </ToggleGroupItem>
      </RadioGroupInput>

      <MultiStylePropertyPanel
        names={['backgroundColor', 'padding']}
        value={data.style}
        onChange={(style) => updateData({ ...data, style })}
      />
    </BaseSidebarPanel>
  );
}
