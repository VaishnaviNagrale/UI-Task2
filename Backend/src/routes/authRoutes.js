import { Router } from 'express';
import { check } from 'express-validator';
import { signup } from '../controllers/authController.js';
const router = Router();

router.post(
    '/signup',
    [
        check('username', 'Username is required').not().isEmpty(),
        check('email', 'Please include a valid email').isEmail(),
        check('password', 'Password must be 6 or more characters').isLength({ min: 6 }),
    ],
    signup
);

export default router;
