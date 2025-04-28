import React, { useState } from 'react';

import { Button } from '@/components/ui/button';

import SendEmailDialog from './SendEmailDialog';

export default function ImportJson() {
  const [open, setOpen] = useState(false);

  let dialog = null;
  if (open) {
    dialog = <SendEmailDialog onClose={() => setOpen(false)} />;
  }

  return (
    <>
      <Button variant="outline" className="flex items-center space-x-1" onClick={() => setOpen(true)}>
        Send test
      </Button>
      {dialog}
    </>
  );
}
