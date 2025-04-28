import React, { useState } from 'react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { AspectRatioOutlined } from '@mui/icons-material';
import { AvatarProps, AvatarPropsDefaults, AvatarPropsSchema } from '@usewaypoint/block-avatar';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';

type AvatarSidebarPanelProps = {
  data: AvatarProps;
  setData: (v: AvatarProps) => void;
};

export default function AvatarSidebarPanel({ data, setData }: AvatarSidebarPanelProps) {
  const [, setErrors] = useState<Zod.ZodError | null>(null);
  const updateData = (d: unknown) => {
    const res = AvatarPropsSchema.safeParse(d);
    if (res.success) {
      setData(res.data);
      setErrors(null);
    } else {
      setErrors(res.error);
    }
  };

  const size = data.props?.size ?? AvatarPropsDefaults.size;
  const imageUrl = data.props?.imageUrl ?? AvatarPropsDefaults.imageUrl;
  const alt = data.props?.alt ?? AvatarPropsDefaults.alt;
  const shape = data.props?.shape ?? AvatarPropsDefaults.shape;

  return (
    <BaseSidebarPanel title="Avatar block">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center">
            <AspectRatioOutlined className="mr-2 h-4 w-4 text-muted-foreground" />
            <Label>Size</Label>
          </div>
          <Slider
            defaultValue={[size]}
            min={32}
            max={256}
            step={3}
            onValueChange={(values) => {
              updateData({ ...data, props: { ...data.props, size: values[0] } });
            }}
          />
          <div className="text-xs text-muted-foreground text-right">{size}px</div>
        </div>
        
        <div className="space-y-2">
          <Label>Shape</Label>
          <ToggleGroup
            type="single"
            value={shape}
            onValueChange={(value) => {
              if (value) updateData({ ...data, props: { ...data.props, shape: value } });
            }}
            className="justify-start"
          >
            <ToggleGroupItem value="circle">Circle</ToggleGroupItem>
            <ToggleGroupItem value="square">Square</ToggleGroupItem>
            <ToggleGroupItem value="rounded">Rounded</ToggleGroupItem>
          </ToggleGroup>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="image-url">Image URL</Label>
          <Input
            id="image-url"
            defaultValue={imageUrl}
            onChange={(e) => {
              updateData({ ...data, props: { ...data.props, imageUrl: e.target.value } });
            }}
          />
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="alt-text">Alt text</Label>
          <Input
            id="alt-text"
            defaultValue={alt}
            onChange={(e) => {
              updateData({ ...data, props: { ...data.props, alt: e.target.value } });
            }}
          />
        </div>

        <MultiStylePropertyPanel
          names={['textAlign', 'padding']}
          value={data.style}
          onChange={(style) => updateData({ ...data, style })}
        />
      </div>
    </BaseSidebarPanel>
  );
}
