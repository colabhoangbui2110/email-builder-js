import { z } from 'zod';
import { LayoutPropsSchema as BaseLayoutPropsSchema } from '@usewaypoint/block-layout';

const LayoutPropsSchema = BaseLayoutPropsSchema.extend({
  props: z
    .object({
      childrenIds: z.array(z.string()).optional(),
    })
    .optional()
    .nullable(),
});

export type LayoutProps = z.infer<typeof LayoutPropsSchema>;
export default LayoutPropsSchema;