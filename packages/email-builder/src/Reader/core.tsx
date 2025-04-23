import React, { createContext, useContext } from 'react';
import { z } from 'zod';

import { Avatar, AvatarPropsSchema } from '@usewaypoint/block-avatar';
import { Button, ButtonPropsSchema } from '@usewaypoint/block-button';
import { Divider, DividerPropsSchema } from '@usewaypoint/block-divider';
import { Heading, HeadingPropsSchema } from '@usewaypoint/block-heading';
import { Html, HtmlPropsSchema } from '@usewaypoint/block-html';
import { Image, ImagePropsSchema } from '@usewaypoint/block-image';
import { Spacer, SpacerPropsSchema } from '@usewaypoint/block-spacer';
import { Text, TextPropsSchema } from '@usewaypoint/block-text';
import {
  buildBlockComponent,
  buildBlockConfigurationDictionary,
  buildBlockConfigurationSchema,
} from '@usewaypoint/document-core';

import ColumnsContainerPropsSchema from '../blocks/ColumnsContainer/ColumnsContainerPropsSchema';
import ColumnsContainerReader from '../blocks/ColumnsContainer/ColumnsContainerReader';
import { ContainerPropsSchema } from '../blocks/Container/ContainerPropsSchema';
import ContainerReader from '../blocks/Container/ContainerReader';
import { EmailLayoutPropsSchema } from '../blocks/EmailLayout/EmailLayoutPropsSchema';
import EmailLayoutReader from '../blocks/EmailLayout/EmailLayoutReader';
import { RenderContext } from '../renderers/renderToStaticMarkup';

console.log('READER_DICTIONARY');
export const ReaderContext = createContext<TReaderDocument>({});
export const ReaderDataContext = createContext<TReaderDataSource>({});
export function useReaderDocument() {
  return useContext(ReaderContext);
}
export function useReaderData() {
  return useContext(ReaderDataContext);
}

const READER_DICTIONARY = buildBlockConfigurationDictionary({
  ColumnsContainer: {
    schema: ColumnsContainerPropsSchema,
    Component: ColumnsContainerReader,
  },
  Container: {
    schema: ContainerPropsSchema,
    Component: ContainerReader,
  },
  EmailLayout: {
    schema: EmailLayoutPropsSchema,
    Component: EmailLayoutReader,
  },
  //
  Avatar: {
    schema: AvatarPropsSchema,
    Component: Avatar,
  },
  Button: {
    schema: ButtonPropsSchema,
    Component: Button,
  },
  Divider: {
    schema: DividerPropsSchema,
    Component: Divider,
  },
  Heading: {
    schema: HeadingPropsSchema,
    Component: Heading,
  },
  Html: {
    schema: HtmlPropsSchema,
    Component: Html,
  },
  Image: {
    schema: ImagePropsSchema,
    Component: Image,
  },
  Spacer: {
    schema: SpacerPropsSchema,
    Component: Spacer,
  },
  Text: {
    schema: TextPropsSchema,
    Component: Text,
  },
});

export const ReaderBlockSchema = buildBlockConfigurationSchema(READER_DICTIONARY);
export type TReaderBlock = z.infer<typeof ReaderBlockSchema>;
export type TReaderDataSource = z.infer<typeof RenderContext>;

export const ReaderDocumentSchema = z.record(z.string(), ReaderBlockSchema);
export type TReaderDocument = Record<string, TReaderBlock>;

const BaseReaderBlock = buildBlockComponent(READER_DICTIONARY);

export type TReaderBlockProps = { id: string };
export function ReaderBlock({ id }: TReaderBlockProps) {
  return (
    <ReaderContext.Consumer>
      {(document) => (
        <ReaderDataContext.Consumer>
          {(context) => (
            <BaseReaderBlock
              context={context}
              {...document[id]} 
            />
          )}
        </ReaderDataContext.Consumer>
      )}
    </ReaderContext.Consumer>
  );
}

export type TReaderProps = {
  document: Record<string, z.infer<typeof ReaderBlockSchema>>;
  context?: TReaderDataSource;
  rootBlockId: string;
};

const defaultReaderDataContext = {
  shop: {
    name: 'The Cozy Corner Bookstore',
    phone: '+84 24 123 4567',
    email: 'info@cozycornerbooks.com',
    domain: 'cozycornerbooks.com',
  },
  buyer: {
    first_name: 'Nguyen',
    last_name: 'Thi Mai',
    email: 'mai.nguyen@email.com',
    phone: '+84 90 987 6543',
  },
  discount: {
    code: 'SUMMER25',
    value: '25%',
  },
};

export default function Reader({ document, rootBlockId, context }: TReaderProps) {
  const effectiveDataContext = context || defaultReaderDataContext;
  const effectiveDocument = document || {
    root: {
      type: 'EmailLayout',
      data: {},
    },
  };

  return (
    <ReaderContext.Provider value={effectiveDocument}>
      <ReaderDataContext.Provider value={effectiveDataContext}>
        <ReaderBlock id={rootBlockId} />
      </ReaderDataContext.Provider>
    </ReaderContext.Provider>
  );
}
