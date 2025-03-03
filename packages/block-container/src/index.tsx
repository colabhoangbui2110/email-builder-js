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

const getPadding = (padding: z.infer<typeof PADDING_SCHEMA>) =>
  padding ? `${padding.top}px ${padding.right}px ${padding.bottom}px ${padding.left}px` : undefined;

export const ContainerPropsSchema = z.object({
  style: z
    .object({
      backgroundColor: COLOR_SCHEMA,
      backgroundImage: z.string().optional().nullable(),
      borderColor: COLOR_SCHEMA,
      borderRadius: z.number().optional().nullable(),
      padding: PADDING_SCHEMA,
      backgroundSize: z.string().optional().nullable(),
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
  const wStyle: CSSProperties = {
    backgroundColor: style?.backgroundColor ?? undefined,
    backgroundImage: style?.backgroundImage ?? undefined,
    border: getBorder(style),
    borderRadius: style?.borderRadius ?? undefined,
    padding: getPadding(style?.padding),
    backgroundSize: style?.backgroundSize ?? 'cover',
  };

  if (!children) {
    return <div style={wStyle} />;
  }
  return <div style={wStyle}>{children}</div>;
}
