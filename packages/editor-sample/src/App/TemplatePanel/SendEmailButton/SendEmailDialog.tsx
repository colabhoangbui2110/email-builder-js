import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';

type SendEmailDialogProps = {
  onClose: () => void;
};

const FormSchema = z.object({
  email: z.string().email({
    message: 'Please enter a valid email address',
  }),
});

export default function SendEmailDialog({ onClose }: SendEmailDialogProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
    },
  });

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Send a test email</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit((ev) => {
              console.log(ev);
              onClose();
            })}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Send a test to</FormLabel>
                  <FormControl>
                    <Input placeholder="sample@test.com" {...field} />
                  </FormControl>
                  <FormDescription>Use commas to separate multiple emails.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </DialogClose>
              <Button variant="default" type="submit" className="bg-primary-500 hover:bg-primary-600">
                Send test
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
