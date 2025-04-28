import { Share2 } from 'lucide-react';
import React from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { useDocument } from '../../documents/editor/EditorContext';

export default function ShareButton() {
  const document = useDocument();

  const onClick = () => {
    const c = encodeURIComponent(JSON.stringify(document));
    location.hash = `#code/${btoa(c)}`;
    toast({
      title: 'Share',
      description: 'The URL was updated. Copy it to share your current template.',
      duration: 3000,
    });
  };

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={onClick}>
            <Share2 size={16} />
          </Button>
        </TooltipTrigger>
        <TooltipContent>Share current template</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
