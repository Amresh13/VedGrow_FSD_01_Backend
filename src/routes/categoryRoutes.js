import { Router } from 'express';
import {
  getCategories,
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/categoryController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createCategorySchema, updateCategorySchema } from '../validators/categoryValidator.js';

const router = Router();

router.get('/', getCategories);
router.get('/:slug', getCategory);
router.post('/', protect, validate(createCategorySchema), createCategory);
router.put('/:id', protect, validate(updateCategorySchema), updateCategory);
router.delete('/:id', protect, deleteCategory);

export default router;
