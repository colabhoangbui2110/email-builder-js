import { Code, Edit, Eye,FileJson2 } from 'lucide-react';
import React from 'react';

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

import { setSelectedMainTab, useSelectedMainTab } from '../../documents/editor/EditorContext';

export default function MainTabsGroup() {
  const selectedMainTab = useSelectedMainTab();
  const handleChange = (value: string) => {
    switch (value) {
      case 'json':
      case 'preview':
      case 'editor':
      case 'html':
        setSelectedMainTab(value);
        return;
      default:
        setSelectedMainTab('editor');
    }
  };

  return (
    <ToggleGroup type="single" value={selectedMainTab} onValueChange={handleChange} className="space-x-1">
      <ToggleGroupItem value="editor" aria-label="Editor">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Edit size={16} />
              </span>
            </TooltipTrigger>
            <TooltipContent>Desktop view</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
      <ToggleGroupItem value="preview" aria-label="Preview">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Eye size={16} />
              </span>
            </TooltipTrigger>
            <TooltipContent>Preview</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
      <ToggleGroupItem value="html" aria-label="HTML">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <Code size={16} />
              </span>
            </TooltipTrigger>
            <TooltipContent>HTML Output</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
      <ToggleGroupItem value="json" aria-label="JSON">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <span>
                <FileJson2 size={16} />
              </span>
            </TooltipTrigger>
            <TooltipContent>JSON Output</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </ToggleGroupItem>
    </ToggleGroup>
  );
}
