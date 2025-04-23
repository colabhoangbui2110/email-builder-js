import React from 'react';

import { Container as BaseContainer } from '@usewaypoint/block-container';

import { ReaderBlock } from '../../Reader/core';

import { ContainerProps } from './ContainerPropsSchema';

export default function ContainerReader({ style, props }: ContainerProps) {
  const childrenIds = props?.childrenIds ?? [];
  return (
    <BaseContainer style={style}>
      {childrenIds.map((childId: string) => (
        <ReaderBlock key={childId} id={childId} />
      ))}
    </BaseContainer>
  );
}
