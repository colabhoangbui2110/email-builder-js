import React, { useMemo } from 'react';

import { renderToStaticMarkup, useReaderData } from '@usewaypoint/email-builder';

import { useDocument } from '../../documents/editor/EditorContext';

import HighlightedCodePanel from './helper/HighlightedCodePanel';

export default function HtmlPanel() {
  const document = useDocument();
  const data = useReaderData();
  console.log('document', JSON.stringify(document));
  console.log('data', JSON.stringify(data));
  
  const code = useMemo(() => renderToStaticMarkup(document || {}, { rootBlockId: 'root' }, {
    shop: {
      name: 'Awesome Store',
      phone: '555-1234',
      email: 'info@awesome.com',
      domain: 'awesome.com',
    },
    buyer: {
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane@example.com',
      phone: '555-5678',
    },
    discount: {
      code: 'WELCOME',
      value: '15%',
    },
  }), [document]);
  return <HighlightedCodePanel type="html" value={code} />;
}
