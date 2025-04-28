import { PlusIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

import Picker from './Picker';

type Props =
  | {
      nullable: true;
      label: string;
      onChange: (value: string | null) => void;
      defaultValue: string | null;
    }
  | {
      nullable: false;
      label: string;
      onChange: (value: string) => void;
      defaultValue: string;
    };

export default function ColorInput({ label, defaultValue, onChange, nullable }: Props) {
  const [value, setValue] = useState(defaultValue);

  const renderResetButton = () => {
    if (!nullable) {
      return null;
    }
    if (typeof value !== 'string' || value.trim().length === 0) {
      return null;
    }
    return (
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8"
        onClick={() => {
          setValue(null);
          onChange(null);
        }}
      >
        <XIcon className="h-4 w-4 text-muted-foreground" />
      </Button>
    );
  };

  const renderColorButton = () => {
    if (value) {
      return (
        <div
          className="h-8 w-8 rounded border border-input"
          style={{ backgroundColor: value }}
        />
      );
    }
    return (
      <div className="h-8 w-8 rounded border border-input flex items-center justify-center">
        <PlusIcon className="h-4 w-4" />
      </div>
    );
  };

  return (
    <div className="flex flex-col items-start">
      <Label className="mb-1.5">{label}</Label>
      <div className="flex flex-row space-x-1">
        <Popover>
          <PopoverTrigger asChild>
            {renderColorButton()}
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Picker
              value={value || ''}
              onChange={(v) => {
                setValue(v);
                onChange(v);
              }}
            />
          </PopoverContent>
        </Popover>
        {renderResetButton()}
      </div>
    </div>
  );
}
