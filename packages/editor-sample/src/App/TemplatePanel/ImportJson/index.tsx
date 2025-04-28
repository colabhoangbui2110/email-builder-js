import { Upload } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import ImportJsonDialog from './ImportJsonDialog';

export default function ImportJson() {
  const [open, setOpen] = useState(false);

  let dialog = null;
  if (open) {
    dialog = <ImportJsonDialog onClose={() => setOpen(false)} />;
  }

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" onClick={() => setOpen(true)}>
              <Upload size={16} />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Import JSON</TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {dialog}
    </>
  );
}
