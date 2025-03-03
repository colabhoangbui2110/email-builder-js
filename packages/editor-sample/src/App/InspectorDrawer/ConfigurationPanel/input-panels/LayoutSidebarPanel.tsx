import React, { useState } from 'react';
import { FormControl, FormLabel, MenuItem, Select, Stack } from '@mui/material';

import LayoutPropsSchema from '../../../../documents/blocks/Layout/LayoutPropsSchema';
import { LayoutProps } from '../../../../documents/blocks/Layout/LayoutPropsSchema';

import BaseSidebarPanel from './helpers/BaseSidebarPanel';
import MultiStylePropertyPanel from './helpers/style-inputs/MultiStylePropertyPanel';
import SliderInput from './helpers/inputs/SliderInput';
import TextDimensionInput from './helpers/inputs/TextDimensionInput';

type LayoutSidebarPanelProps = {
    data: LayoutProps;
    setData: (v: LayoutProps) => void;
};

export default function LayoutSidebarPanel({ data, setData }: LayoutSidebarPanelProps) {
    const [, setErrors] = useState<Zod.ZodError | null>(null);

    const updateData = (d: unknown) => {
        const res = LayoutPropsSchema.safeParse(d);
        if (res.success) {
            setData(res.data);
            setErrors(null);
        } else {
            setErrors(res.error);
        }
    };

    // Extract position values for easier access
    const position = data.style?.position || 'relative';
    const positionValues = data.style?.positionValues || {};
    const width = data.style?.width || '';
    const height = data.style?.height || '';
    const overflow = data.style?.overflow || 'visible';

    return (
        <BaseSidebarPanel title="Layout block">
            <FormControl fullWidth margin="normal">
                <FormLabel>Position</FormLabel>
                <Select
                    value={position}
                    onChange={(e) => {
                        const newPosition = e.target.value as 'relative' | 'absolute';
                        updateData({
                            ...data,
                            style: {
                                ...data.style,
                                position: newPosition,
                            },
                        });
                    }}
                >
                    <MenuItem value="relative">Relative</MenuItem>
                    <MenuItem value="absolute">Absolute</MenuItem>
                </Select>
            </FormControl>

            {position === 'absolute' && (
                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <TextDimensionInput
                        label="Top"
                        defaultValue={positionValues.top !== undefined ? `${positionValues.top}px` : ''}
                        onChange={(value) => {
                            updateData({
                                ...data,
                                style: {
                                    ...data.style,
                                    positionValues: {
                                        ...positionValues,
                                        top: value === null ? undefined : value,
                                    },
                                },
                            });
                        }}
                    />
                    <TextDimensionInput
                        label="Left"
                        defaultValue={positionValues.left !== undefined ? `${positionValues.left}px` : ''}
                        onChange={(value) => {

                            updateData({
                                ...data,
                                style: {
                                    ...data.style,
                                    positionValues: {
                                        ...positionValues,
                                        left: value === null ? undefined : value,
                                    },
                                },
                            });
                        }}
                    />
                </Stack>
            )}

            {position === 'absolute' && (
                <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                    <TextDimensionInput
                        label="Bottom"
                        defaultValue={positionValues.bottom !== undefined ? `${positionValues.bottom}px` : ''}
                        onChange={(value) => {

                            updateData({
                                ...data,
                                style: {
                                    ...data.style,
                                    positionValues: {
                                        ...positionValues,
                                        bottom: value === null ? undefined : value,
                                    },
                                },
                            });
                        }}
                    />
                    <TextDimensionInput
                        label="Right"
                        defaultValue={positionValues.right !== undefined ? `${positionValues.right}px` : ''}
                        onChange={(value) => {

                            updateData({
                                ...data,
                                style: {
                                    ...data.style,
                                    positionValues: {
                                        ...positionValues,
                                        right: value === null ? undefined : value,
                                    },
                                },
                            });
                        }}
                    />
                </Stack>
            )}

            {position === 'absolute' && (
                <SliderInput
                    label="Z-Index"
                    min={0}
                    max={10}
                    step={1}
                    defaultValue={positionValues.zIndex ?? 0}
                    onChange={(zIndex) => {
                        updateData({
                            ...data,
                            style: {
                                ...data.style,
                                positionValues: {
                                    ...positionValues,
                                    zIndex,
                                },
                            },
                        });
                    }}
                    iconLabel={undefined}
                    units={''} />
            )}

            <Stack spacing={2} direction="row" sx={{ mt: 2 }}>
                <TextDimensionInput
                    label="Width"
                    defaultValue={width}
                    onChange={(width) => {
                        updateData({
                            ...data,
                            style: {
                                ...data.style,
                                width,
                            },
                        });
                    }}
                />
                <TextDimensionInput
                    label="Height"
                    defaultValue={height}
                    onChange={(height) => {
                        updateData({
                            ...data,
                            style: {
                                ...data.style,
                                height,
                            },
                        });
                    }}
                />
            </Stack>

            <FormControl fullWidth margin="normal">
                <FormLabel>Overflow</FormLabel>
                <Select
                    value={overflow}
                    onChange={(e) => {
                        const newOverflow = e.target.value as 'visible' | 'hidden' | 'scroll' | 'auto';
                        updateData({
                            ...data,
                            style: {
                                ...data.style,
                                overflow: newOverflow,
                            },
                        });
                    }}
                >
                    <MenuItem value="visible">Visible</MenuItem>
                    <MenuItem value="hidden">Hidden</MenuItem>
                    <MenuItem value="scroll">Scroll</MenuItem>
                    <MenuItem value="auto">Auto</MenuItem>
                </Select>
            </FormControl>

            <MultiStylePropertyPanel
                names={['backgroundColor', 'backgroundImage', 'borderColor', 'borderRadius', 'padding']}
                value={data.style}
                onChange={(style) => updateData({ ...data, style })}
            />
        </BaseSidebarPanel>
    );
}