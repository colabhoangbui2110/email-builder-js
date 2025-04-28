import { Download } from 'lucide-react';
import React, { useMemo } from 'react';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useDocument } from '../../../documents/editor/EditorContext';

export default function DownloadJson() {
  const doc = useDocument();
  const href = useMemo(() => {
    return `data:text/plain,${encodeURIComponent(JSON.stringify(doc, null, '  '))}`;
  }, [doc]);
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" asChild>
            <a href={href} download="emailTemplate.json">
              <Download size={16} />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent>Download JSON file</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
