import {
  AlertCircle,
} from 'lucide-react';
import React, { useState } from 'react';

import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';

import { resetDocument } from '../../../documents/editor/EditorContext';

import validateJsonStringValue from './validateJsonStringValue';

type ImportJsonDialogProps = {
  onClose: () => void;
};
export default function ImportJsonDialog({ onClose }: ImportJsonDialogProps) {
  const [value, setValue] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleChange: React.ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (ev) => {
    const v = ev.currentTarget.value;
    setValue(v);
    const { error } = validateJsonStringValue(v);
    setError(error ?? null);
  };

  let errorAlert = null;
  if (error) {
    errorAlert = (
      <Alert variant="destructive" className="mb-2">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Import JSON</DialogTitle>
        </DialogHeader>
        <form
          onSubmit={(ev) => {
            ev.preventDefault();
            const { error, data } = validateJsonStringValue(value);
            setError(error ?? null);
            if (!data) {
              return;
            }
            resetDocument(data);
            onClose();
          }}
        >
          <div className="mb-2 text-muted-foreground text-sm">
            Copy and paste an EmailBuilder.js JSON (
            <a
              href="https://gist.githubusercontent.com/jordanisip/efb61f56ba71bd36d3a9440122cb7f50/raw/30ea74a6ac7e52ebdc309bce07b71a9286ce2526/emailBuilderTemplate.json"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              example
            </a>
            ).
          </div>
          {errorAlert}
          <Label htmlFor="import-json-textarea" className="mb-1">JSON</Label>
          <Textarea
            id="import-json-textarea"
            value={value}
            onChange={handleChange}
            rows={10}
            placeholder="Paste your JSON here"
            className="mb-2"
          />
          <div className="text-xs text-muted-foreground mb-4">
            This will override your current template.
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
            </DialogClose>
            <Button variant="default" type="submit" disabled={error !== null}>
              Import
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
