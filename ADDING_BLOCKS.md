# How to Add a Block to EmailBuilder.js

This guide explains how to create and add a new block to EmailBuilder.js. Blocks are reusable components that can be included in email templates.

## Overview

Each block in EmailBuilder.js:
- Is its own npm package
- Contains both the React component and its schema definition
- Can be imported and used in the main email builder
- Must support email client compatibility

## Step-by-Step Guide

### 1. Create a New Block Package

Create a new directory in the `packages` folder with the naming convention `block-{yourblockname}`:

```bash
mkdir packages/block-yourblockname
cd packages/block-yourblockname
npm init
```

### 2. Set Up Package Structure

Your block package should have the following structure:

```
block-yourblockname/
├── src/
│   ├── index.tsx        # Main component file
│   └── PropsSchema.ts   # Schema definition
├── package.json
├── tsconfig.json
└── README.md
```

### 3. Define the Block Schema

Create `src/PropsSchema.ts` to define your block's properties schema using Zod:

```typescript
import { z } from 'zod';

export const YourBlockPropsSchema = z.object({
  style: z.object({
    // Define style properties
    padding: z.object({
      top: z.number(),
      bottom: z.number(),
      right: z.number(),
      left: z.number(),
    }).optional(),
    // Add other style properties
  }),
  props: z.object({
    // Define your block's specific properties
    // Example:
    content: z.string(),
  }),
});

export type TYourBlockProps = z.infer<typeof YourBlockPropsSchema>;
```

### 4. Create the Block Component

Create `src/index.tsx` to implement your block component:

```typescript
import React from 'react';
import { YourBlockPropsSchema, TYourBlockProps } from './PropsSchema';

export { YourBlockPropsSchema };

export const YourBlock: React.FC<TYourBlockProps> = ({ style, props }) => {
  return (
    <div style={{
      padding: `${style?.padding?.top}px ${style?.padding?.right}px ${style?.padding?.bottom}px ${style?.padding?.left}px`,
      // Add other styles
    }}>
      {/* Your block's content */}
      {props.content}
    </div>
  );
};
```

### 5. Configure Package.json

Update your `package.json` with necessary dependencies and configuration:

```json
{
  "name": "@usewaypoint/block-yourblockname",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "peerDependencies": {
    "react": "^18.0.0",
    "zod": "^3.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "typescript": "^4.0.0"
  }
}
```

### 6. Register the Block

Add your block to the main email builder by updating `packages/email-builder/src/Reader/core.tsx`:

```typescript
import { YourBlock, YourBlockPropsSchema } from '@usewaypoint/block-yourblockname';

const READER_DICTIONARY = buildBlockConfigurationDictionary({
  // ... existing blocks ...
  YourBlock: {
    schema: YourBlockPropsSchema,
    Component: YourBlock,
  },
});
```

### 7. Test Email Client Compatibility

Before finalizing your block:
1. Test rendering in major email clients:
   - Gmail
   - Apple Mail
   - Outlook
   - Yahoo! Mail
   - Mobile email clients
2. Ensure the block is responsive
3. Verify that styles are properly applied across different email clients

### 8. Document Your Block

Create a README.md in your block's package directory:

```markdown
# @usewaypoint/block-yourblockname

Description of your block and its purpose.

## Usage

```javascript
import { YourBlock } from '@usewaypoint/block-yourblockname';

// Usage example
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| prop1    | type | description |
| prop2    | type | description |
```

## Best Practices

1. **Email Compatibility**
   - Use email-safe CSS properties
   - Avoid using unsupported HTML5 elements
   - Test thoroughly across email clients

2. **Performance**
   - Keep the block lightweight
   - Optimize images and assets
   - Minimize dependencies

3. **Maintainability**
   - Follow the existing code style
   - Add proper TypeScript types
   - Include comprehensive documentation

4. **Reusability**
   - Make props configurable
   - Keep the block focused on a single responsibility
   - Follow the existing block patterns in the project

## Example Block Configuration

Here's an example of how your block would be used in an email template configuration:

```javascript
{
  "block-yourblock": {
    "type": "YourBlock",
    "data": {
      "style": {
        "padding": {
          "top": 16,
          "bottom": 16,
          "right": 24,
          "left": 24
        }
      },
      "props": {
        "content": "Your block content"
      }
    }
  }
}
```
