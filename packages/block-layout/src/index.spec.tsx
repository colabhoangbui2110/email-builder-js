import React from 'react';
import { render } from '@testing-library/react';
import { Layout } from '.';

describe('block-layout', () => {
  it('renders with default values', () => {
    expect(render(<Layout />).asFragment()).toMatchSnapshot();
  });

  it('renders with nested components', () => {
    const { asFragment } = render(
      <Layout style={{ position: 'relative', height: '300px' }}>
        <div data-testid="child-1">Child 1</div>
        <div data-testid="child-2">Child 2</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it('renders with absolute positioning', () => {
    const { asFragment } = render(
      <Layout 
        style={{ 
          position: 'absolute', 
          positionValues: { top: 10, left: 20, zIndex: 2 },
          backgroundColor: '#f5f5f5'
        }}
      >
        <div>Positioned content</div>
      </Layout>
    );
    expect(asFragment()).toMatchSnapshot();
  });
});