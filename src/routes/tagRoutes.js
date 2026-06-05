import { Router } from 'express';
import {
  getTags,
  getTag,
  createTag,
  updateTag,
  deleteTag,
} from '../controllers/tagController.js';
import { protect } from '../middleware/authMiddleware.js';
import { validate } from '../middleware/validateMiddleware.js';
import { createTagSchema, updateTagSchema } from '../validators/tagValidator.js';

const router = Router();

router.get('/', getTags);
router.get('/:slug', getTag);
router.post('/', protect, validate(createTagSchema), createTag);
router.put('/:id', protect, validate(updateTagSchema), updateTag);
router.delete('/:id', protect, deleteTag);

export default router;
