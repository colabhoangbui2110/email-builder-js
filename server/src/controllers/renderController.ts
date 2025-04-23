import { Request, Response } from 'express';

import { renderToStaticMarkup, TReaderDocument } from '@usewaypoint/email-builder';

export const renderHTML = (req: Request, res: Response) => {
  try {
    // Validate request body - basic example
    const { document, rootBlockId, context } = req.body;
    if (!document || typeof rootBlockId !== 'string' || !context) {
      return res.status(400).json({ error: 'Missing or invalid document or rootBlockId or context in request body' });
    }

    // Type assertion might be needed depending on how TReaderDocument is defined
    const doc = document as TReaderDocument;
    const options = { rootBlockId };

    // Call the rendering function
    const html = renderToStaticMarkup(doc, options, context);

    // Send the response
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send(html);
  } catch (error) {
    console.error('Error rendering email:', error);
    // Send a more specific error message in production
    res.status(500).json({ error: 'Internal server error during rendering' });
  }
};
