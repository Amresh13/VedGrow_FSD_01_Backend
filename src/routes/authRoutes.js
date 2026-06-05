import { Router } from 'express';
import {
  register,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  resetPassword,
  getMe,
  changePassword,
} from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import {
  registerSchema,
  loginSchema,
  emailSchema,
  verifyEmailSchema,
  resetPasswordSchema,
  changePasswordSchema,
} from '../validators/authValidator.js';

const router = Router();

router.post('/register', validate(registerSchema), register);
router.post('/login', validate(loginSchema), login);
router.post('/verify-email', validate(verifyEmailSchema), verifyEmail);
router.post('/resend-verification', validate(emailSchema), resendVerification);
router.post('/forgot-password', validate(emailSchema), forgotPassword);
router.post('/reset-password', validate(resetPasswordSchema), resetPassword);
router.get('/me', protect, getMe);
router.post('/change-password', protect, validate(changePasswordSchema), changePassword);

export default router;
