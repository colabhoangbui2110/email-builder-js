import React, { useMemo } from 'react';

import { renderToStaticMarkup } from '@usewaypoint/email-builder';

import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  const document = useDocument();
  console.log(JSON.stringify(document));
  const code = useMemo(() => renderToStaticMarkup(document, { rootBlockId: 'root' }), [document]);
  return <HighlightedCodePanel type="html" value={code} />;
}
