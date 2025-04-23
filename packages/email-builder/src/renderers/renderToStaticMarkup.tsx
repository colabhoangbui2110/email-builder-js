import React from 'react';
import { renderToStaticMarkup as baseRenderToStaticMarkup } from 'react-dom/server';
import { z } from 'zod';

import Reader, { TReaderDataSource, TReaderDocument } from '../Reader/core';

type TOptions = {
  rootBlockId: string;
};

export const RenderContext = z.object({
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
  line_items: z
    .array(
      z.object({
        title: z.string(),
        quantity: z.number(),
        price: z.number(),
        vendor: z.string(),
      })
    )
    .optional()
    .nullable(),
  discount: z.object({
    code: z.string(),
    value: z.union([z.number(), z.string()]),
  })
  .optional()
  .nullable(),
});

export default function renderToStaticMarkup(document: TReaderDocument, { rootBlockId }: TOptions, context?: TReaderDataSource) {
  console.log('@renderToStaticMarkup', context);
  return (
    '<!DOCTYPE html>' +
    baseRenderToStaticMarkup(
      <html>
        <body>
          <Reader document={document} rootBlockId={rootBlockId} context={context} />
        </body>
      </html>
    )
  );
}
