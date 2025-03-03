import React from 'react';

import { Layout as BaseLayout } from '@usewaypoint/block-layout';

import { ReaderBlock } from '../../Reader/core';
import { LayoutProps } from './LayoutPropsSchema';

export default function LayoutReader({ style, props }: LayoutProps) {
  const childrenIds = props?.childrenIds ?? [];
  
  return (
    <BaseLayout style={style}>
      {childrenIds.map((childId: any) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseLayout>
  );
}