# Adding Available Blocks to EmailBuilder.js Editor Sample

This guide explains how to add existing blocks from the EmailBuilder.js package to your editor-sample implementation.

## Overview

EmailBuilder.js comes with several built-in blocks that you can add to your editor implementation. These blocks are available as separate npm packages under the `@usewaypoint` namespace.

## Available Blocks

The following blocks are available out of the box:
- Avatar (`@usewaypoint/block-avatar`)
- Button (`@usewaypoint/block-button`)
- Columns (`@usewaypoint/block-columns-container`)
- Container (`@usewaypoint/block-container`)
- Divider (`@usewaypoint/block-divider`)
- Heading (`@usewaypoint/block-heading`)
- HTML (`@usewaypoint/block-html`)
- Image (`@usewaypoint/block-image`)
- Spacer (`@usewaypoint/block-spacer`)
- Text (`@usewaypoint/block-text`)

## Step-by-Step Guide

### 1. Install the Block Package

First, install the block package you want to add:

```bash
cd packages/editor-sample
npm install @usewaypoint/block-yourblock
```

### 2. Import Block in Editor Core

Update `packages/editor-sample/src/documents/editor/core.tsx`:

```typescript name=core.tsx
import { YourBlock, YourBlockPropsSchema } from '@usewaypoint/block-yourblock';
import { buildBlockConfigurationDictionary } from '@usewaypoint/document-core';

const EDITOR_DICTIONARY = buildBlockConfigurationDictionary({
  // ... existing blocks ...
  YourBlock: {
    schema: YourBlockPropsSchema,
    Component: (props) => (
      <EditorBlockWrapper>
        <YourBlock {...props} />
      </EditorBlockWrapper>
    ),
  },
});
```

### 3. Add Sample Configuration

Create a new sample in `packages/editor-sample/src/getConfiguration/sample/your-block.ts`:

```typescript name=your-block.ts
import { TEditorConfiguration } from '../../documents/editor/core';

const YOUR_BLOCK_SAMPLE: TEditorConfiguration = {
  root: {
    type: 'EmailLayout',
    data: {
      backdropColor: '#F8F8F8',
      canvasColor: '#FFFFFF',
      textColor: '#242424',
      fontFamily: 'MODERN_SANS',
      childrenIds: ['block-sample'],
    },
  },
  'block-sample': {
    type: 'YourBlock',
    data: {
      style: {
        padding: {
          top: 16,
          bottom: 16,
          right: 24,
          left: 24,
        },
      },
      props: {
        // Add block-specific props here
      },
    },
  },
};

export default YOUR_BLOCK_SAMPLE;
```

### 4. Register the Sample

Update `packages/editor-sample/src/getConfiguration/index.ts`:

```typescript name=index.ts
import YOUR_BLOCK_SAMPLE from './sample/your-block';

export default function getConfiguration(hash: string): TEditorConfiguration {
  switch (hash) {
    // ... existing cases ...
    case '#sample/your-block':
      return YOUR_BLOCK_SAMPLE;
    default:
      return EMPTY;
  }
}
```

### 5. Add to Samples Drawer

Update `packages/editor-sample/src/App/SamplesDrawer/index.tsx`:

```typescript name=index.tsx
export default function SamplesDrawer() {
  return (
    <Drawer>
      <Stack>
        {/* ... existing buttons ... */}
        <SidebarButton href="#sample/your-block">
          Your Block Example
        </SidebarButton>
      </Stack>
    </Drawer>
  );
}
```

## Block-Specific Configuration Examples

Here are examples for some common blocks:

### Button Block

```typescript
{
  type: 'Button',
  data: {
    style: {
      fontSize: 14,
      padding: {
        top: 16,
        bottom: 24,
        right: 24,
        left: 24,
      },
    },
    props: {
      buttonBackgroundColor: '#0079cc',
      buttonStyle: 'rectangle',
      text: 'Click me',
      url: 'https://example.com',
    },
  },
}
```

### Text Block

```typescript
{
  type: 'Text',
  data: {
    style: {
      fontWeight: 'normal',
      padding: {
        top: 0,
        bottom: 16,
        right: 24,
        left: 24,
      },
    },
    props: {
      text: 'Your text content here',
    },
  },
}
```

### Image Block

```typescript
{
  type: 'Image',
  data: {
    style: {
      padding: {
        top: 16,
        bottom: 16,
        right: 24,
        left: 24,
      },
    },
    props: {
      url: 'https://example.com/image.jpg',
      alt: 'Image description',
      linkHref: null,
      contentAlignment: 'middle',
    },
  },
}
```

## Testing Blocks

1. Start the development server:
```bash
cd packages/editor-sample
npm run dev
```

2. Open http://localhost:5173/email-builder-js/

3. Click on your new block sample in the samples drawer

4. Verify that:
   - The block renders correctly
   - All props work as expected
   - Styles are applied properly
   - The block is responsive
   - HTML output is valid

## Troubleshooting

### Common Issues

1. Block not appearing:
   - Verify the block is properly imported
   - Check the configuration in `core.tsx`
   - Ensure the sample configuration is correct

2. Style issues:
   - Check the style properties in the configuration
   - Verify padding and spacing values
   - Test in different email clients

3. Props not working:
   - Review the block's documentation for required props
   - Check prop types match the schema
   - Verify prop values are correctly formatted

### Getting Help

If you encounter issues:
1. Check the block's documentation in its package
2. Review existing samples for reference
3. Open an issue on GitHub with:
   - Block configuration
   - Expected behavior
   - Any error messages