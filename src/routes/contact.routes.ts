// src/routes/contact.routes.ts
import { Router } from 'express';
import { sendContactRequest, acceptContactRequest, getAcceptedContacts } from '@controllers/contact.controller';
import { authenticate } from '@middleware/auth.middleware';

const router = Router();

router.post('/request', authenticate, sendContactRequest);
router.post('/accept', authenticate, acceptContactRequest);
router.get('/', authenticate, getAcceptedContacts);

export default router;
