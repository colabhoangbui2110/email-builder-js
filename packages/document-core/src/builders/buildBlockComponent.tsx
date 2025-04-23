import React from 'react';
import { z } from 'zod';

import { BaseZodDictionary, BlockConfiguration, DocumentBlocksDictionary } from '../utils';

// Helper function to process text with context values
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function processTextWithContext(text: string, context?: any): string {
  if (!text || !context) return text;
  
  // Use regex to find all placeholders in the format {{path.to.value}}
  return text.replace(/\{\{\s*([^{}]+)\s*\}\}/g, (match, path) => {
    const trimmedPath = path.trim();
    const pathParts = trimmedPath.split('.');
    
    // Navigate through the context object following the path
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let value: any = context;
    for (const part of pathParts) {
      if (!value || typeof value !== 'object') return match; // Return original if path is invalid
      value = value[part];
      if (value === undefined) return match; // Return original if value not found
    }
    
    // Return the found value or the original placeholder if value is not a primitive
    return (value !== null && (typeof value === 'string' || typeof value === 'number')) 
      ? String(value) 
      : match;
  });
}

const ContextTextSchema = z
    .object({
      shop: z
        .object({
          domain: z.string(),
          name: z.string(),
          email: z.string(),
          phone: z.string(),
        })
        .optional()
        .nullable(),
      buyer: z
        .object({
          first_name: z.string(),
          last_name: z.string(),
          email: z.string(),
          phone: z.string(),
        })
        .optional()
        .nullable(),
      discount: z
        .object({
          code: z.string(),
          value: z.union([z.number(), z.string()]),
        })
        .optional()
        .nullable(),
    })
    .optional()
    .nullable();

const MAP_TYPE_SCHEMA = {
  'Heading': ContextTextSchema,
  'Text': ContextTextSchema
};

const MAP_ALLOWED_RENDER_TEXT = {
  'Heading': true,
  'Text': true,
};

/**
 * @param blocks Main DocumentBlocksDictionary
 * @returns React component that can render a BlockConfiguration that is compatible with blocks
 */
export default function buildBlockComponent<T extends BaseZodDictionary>(blocks: DocumentBlocksDictionary<T>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function BlockComponent({ type, data, context }: BlockConfiguration<T>) {
    const Component = blocks[type].Component;
    if (MAP_ALLOWED_RENDER_TEXT[type as keyof typeof MAP_ALLOWED_RENDER_TEXT] === undefined) {
      console.log(type);
      return (
        <Component {...data} />
      );
    }

    const prepareRenderFunc = (text: string) => {
      const refinedContext = MAP_TYPE_SCHEMA[type as keyof typeof MAP_TYPE_SCHEMA].parse(context);
      console.log(refinedContext, text, '...refinedContext, text');
      
      return processTextWithContext(text, refinedContext);
    };
    return (
      <Component {...data} prepareRenderFunc={prepareRenderFunc} />
    );
  };
}
