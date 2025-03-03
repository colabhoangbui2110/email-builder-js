import { z } from 'zod';

const PADDING_SCHEMA = z
  .object({
    top: z.number(),
    bottom: z.number(),
    right: z.number(),
    left: z.number(),
  })
  .optional()
  .nullable();

// Define the style schema for layout
const LayoutStyleSchema = z.object({
  position: z.enum(['relative', 'absolute', 'static', 'fixed', 'sticky']).optional().nullable(),
  positionValues: z.object({
    top: z.number().optional(),
    left: z.number().optional(),
    right: z.number().optional(),
    bottom: z.number().optional(),
    zIndex: z.number().optional(),
  }).optional(),
  width: z.string().optional(),
  height: z.string().optional(),
  overflow: z.enum(['visible', 'hidden', 'scroll', 'auto']).optional(),
  backgroundColor: z.string().optional(),
  backgroundImage: z.string().optional(),
  borderColor: z.string().optional(),
  borderRadius: z.number().optional(),
  padding: PADDING_SCHEMA,
}).optional();

const LayoutPropsSchema = z.object({
  style: LayoutStyleSchema,
  props: z
    .object({
      childrenIds: z.array(z.string()).optional(),
    })
    .optional()
    .nullable(),
});

export type LayoutProps = z.infer<typeof LayoutPropsSchema>;
export default LayoutPropsSchema;