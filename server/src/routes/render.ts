import { Router } from 'express';

import { renderHTML } from '../controllers/renderController';

const router = Router();

// Define the POST endpoint
router.post('/render', renderHTML);

export default router;