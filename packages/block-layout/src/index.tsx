import React, { CSSProperties } from 'react';
import { z } from 'zod';

const COLOR_SCHEMA = z
  .string()
  .regex(/^#[0-9a-fA-F]{6}$/)
  .nullable()
  .optional();

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

const POSITION_SCHEMA = z
  .object({
    top: z.number().optional(),
    bottom: z.number().optional(),
    left: z.number().optional(),
    right: z.number().optional(),
    zIndex: z.number().optional(),
  })
  .optional()
  .nullable();

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const LayoutPropsSchema = z.object({
  children: z.any().optional().nullable(),
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      backgroundImage: z.string().optional().nullable(),
      borderColor: COLOR_SCHEMA,
      borderRadius: z.number().optional().nullable(),
      padding: PADDING_SCHEMA,
      position: z.enum(['relative', 'absolute']).optional().nullable(),
      positionValues: POSITION_SCHEMA,
      width: z.string().optional().nullable(),
      height: z.string().optional().nullable(),
      overflow: z.enum(['visible', 'hidden', 'scroll', 'auto']).optional().nullable(),
    })
    .optional()
    .nullable(),
});

function getBorder(style: z.infer<typeof LayoutPropsSchema>['style']) {
  if (!style || !style.borderColor) {
    return undefined;
  }
  return `1px solid ${style.borderColor}`;
}

export function Layout({ style, children }: z.infer<typeof LayoutPropsSchema>) {
  // Process background image if it exists
  if (style?.backgroundImage) {
    const backgroundImage = style.backgroundImage.split(',');
    style.backgroundImage = backgroundImage
      .map((image) => {
        // Check if image is a URL and wrap it in url()
        if (!image.startsWith('http')) {
          return image;
        }
        return `url("${image.trim()}")`;
      })
      .join(',');
  }

  // Extract position values
  const positionValues = style?.positionValues || {};
  
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    backgroundImage: style?.backgroundImage ?? undefined,
    border: getBorder(style),
    borderRadius: style?.borderRadius ?? undefined,
    padding: getPadding(style?.padding),
    backgroundSize: 'cover',
    position: style?.position ?? 'relative',
    width: style?.width ?? '100%',
    height: style?.height ?? 'auto',
    overflow: style?.overflow ?? 'visible',
    top: positionValues.top,
    bottom: positionValues.bottom,
    left: positionValues.left,
    right: positionValues.right,
    zIndex: positionValues.zIndex,
  };

  if (!children) {
    return <div style={wStyle} />;
  }
  return <div style={wStyle}>{children}</div>;
}