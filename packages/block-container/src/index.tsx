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

const MARGIN_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

// Add position schema similar to block-layout
const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

const getMargin = (margin: z.infer<typeof MARGIN_SCHEMA>) =>
  margin ? `${margin.top}px ${margin.right}px ${margin.bottom}px ${margin.left}px` : undefined;

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      backgroundImage: z.string().optional().nullable(),
      borderColor: COLOR_SCHEMA,
      borderRadius: z.number().optional().nullable(),
      padding: PADDING_SCHEMA,
      margin: MARGIN_SCHEMA,
      backgroundSize: z.string().optional().nullable(),
      // Add position properties
      position: z.enum(['relative', 'absolute', 'static', 'fixed', 'sticky']).optional().nullable(),
      top: z.number().optional(),
      bottom: z.number().optional(),
      left: z.number().optional(),
      right: z.number().optional(),
      zIndex: z.number().optional(),
      width: z.number().optional(),
      height: z.number().optional(),
      // Add other properties
      maxWidth: z.number().optional(),
      minWidth: z.number().optional(),
      maxHeight: z.number().optional(),
      minHeight: z.number().optional(),
    })
    .optional()
    .nullable(),
});

export type ContainerProps = {
  style?: z.infer<typeof ContainerPropsSchema>['style'];
  children?: JSX.Element | JSX.Element[] | null;
};

function getBorder(style: ContainerProps['style']) {
  if (!style || !style.borderColor) {
    return undefined;
  }
  return `1px solid ${style.borderColor}`;
}

export function Container({ style, children }: ContainerProps) {
  console.log('b-container', style);
  
  // split background image if is multiple path
  if (style?.backgroundImage) {
    const backgroundImage = style.backgroundImage.split(',');
    style.backgroundImage = backgroundImage.map((image) => {
      // check image is link wrap it in url()
      // if not return image
      if (!image.startsWith('http')) {
        return image;
      }

      return `url("${image.trim()}")`
    }).join(',');
  }

  // Extract position values
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    backgroundImage: style?.backgroundImage ?? undefined,
    border: getBorder(style),
    borderRadius: style?.borderRadius ?? undefined,
    padding: getPadding(style?.padding),
    margin: getMargin(style?.margin),
    backgroundSize: style?.backgroundSize ?? 'cover',
    // Add position properties
    position: style?.position ?? undefined,
    top: style?.top ?? undefined,
    bottom: style?.bottom ?? undefined,
    left: style?.left ?? undefined,
    right: style?.right ?? undefined,
    zIndex: style?.zIndex ?? undefined,
    width: style?.width ? `${style.width}px` : undefined,
    height: style?.height ? `${style.height}px` : undefined,
    // Add other properties
    maxWidth: style?.maxWidth ? `${style.maxWidth}px` : undefined,
    minWidth: style?.minWidth ? `${style.minWidth}px` : undefined,
    maxHeight: style?.maxHeight ? `${style.maxHeight}px` : undefined,
    minHeight: style?.minHeight ? `${style.minHeight}px` : undefined,
  };

  if (!children) {
    return <div style={wStyle} />;
  }
  return <div style={wStyle}>{children}</div>;
}
