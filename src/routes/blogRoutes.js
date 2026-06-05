import { Router } from 'express';
import {
  getBlogs,
  getBlogBySlug,
  getAllBlogsAdmin,
  createBlog,
  updateBlog,
  deleteBlog,
  toggleBlogStatus,
} from '../controllers/blogController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createBlogSchema, updateBlogSchema } from '../validators/blogValidator.js';

const router = Router();

router.get('/', getBlogs);
router.get('/admin/all', protect, getAllBlogsAdmin);
router.get('/:slug', getBlogBySlug);
router.post('/', protect, validate(createBlogSchema), createBlog);
router.put('/:id', protect, validate(updateBlogSchema), updateBlog);
router.delete('/:id', protect, deleteBlog);
router.patch('/:id/status', protect, toggleBlogStatus);

export default router;
