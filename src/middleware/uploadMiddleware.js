import multer from 'multer';
import { resolve, dirname, extname } from 'path';
import { fileURLToPath } from 'url';
import slugify from 'slugify';
import env from '../config/env.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const storage = multer.diskStorage({
  destination: resolve(__dirname, '../../uploads'),
  filename: (_req, file, cb) => {
    const ext = extname(file.originalname);
    const name = slugify(file.originalname.replace(ext, ''), { lower: true, strict: true });
    cb(null, `${name}-${Date.now()}${ext}`);
  },
});

const fileFilter = (_req, file, cb) => {
  const allowed = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
  if (allowed.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Only jpeg, png, gif, and webp images are allowed'), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: env.maxUploadSizeMb * 1024 * 1024 },
});

export default upload;
