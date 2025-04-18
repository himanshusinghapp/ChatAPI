import { Router } from 'express';
import { sendMessage, getMessages } from '@controllers/message.controller';
import { authenticate } from '@middleware/auth.middleware';
import { messageRateLimiter } from '@middleware/rateLimiter';

const router = Router();

// Send message to a contact
router.post('/messages', authenticate, messageRateLimiter, sendMessage);

// Get messages with a contact
router.get('/messages/:contactId', authenticate, getMessages);

export default router;
