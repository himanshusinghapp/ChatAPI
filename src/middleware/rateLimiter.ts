import rateLimit from 'express-rate-limit';
import { AuthenticatedRequest } from './auth.middleware';  // Import the custom request type

// Limit: 5 messages per minute **per user**
export const messageRateLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 5,
  message: 'Too many messages sent. Please wait and try again.',
  keyGenerator: (req: AuthenticatedRequest) => {
    return req.user?.id || req.ip;  // Access the 'user' property now
  },
});
