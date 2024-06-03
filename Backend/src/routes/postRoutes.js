import { Router } from 'express';
import { getPosts } from '../controllers/postController.js';
import auth from '../middlewares/authMiddleware.js';
const router = Router();

router.get('/', auth, getPosts);

export default router;
