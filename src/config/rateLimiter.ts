import { rateLimit } from 'express-rate-limit'

export const rateLimiterConfig = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100,
	standardHeaders: 'draft-7', // From documentation
	legacyHeaders: false, // From documentation
})