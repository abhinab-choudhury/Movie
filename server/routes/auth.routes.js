import { Router } from 'express';
import {
  forgotPassword,
  googleAuth,
  localAuth,
  resetPassword,
} from '../controllers/auth.controllers.js';

const router = Router();

router.post('/local', localAuth);
router.post('/google', googleAuth);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
export default router;
