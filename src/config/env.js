import { config } from 'dotenv';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

config({ path: resolve(__dirname, '../../.env') });

const required = [
  'MONGO_URI',
  'JWT_SECRET',
  'ADMIN_EMAIL',
  'ADMIN_PASSWORD',
];

const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required environment variables: ${missing.join(', ')}`);
  process.exit(1);
}

export default {
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT, 10) || 5000,
  mongoUri: process.env.MONGO_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
  adminName: process.env.ADMIN_NAME || 'Admin',
  adminEmail: process.env.ADMIN_EMAIL,
  adminPassword: process.env.ADMIN_PASSWORD,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  maxUploadSizeMb: parseInt(process.env.MAX_UPLOAD_SIZE_MB, 10) || 5,
  smtp: {
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT, 10) || 587,
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
    from: process.env.SMTP_FROM || '"Blog CMS" <noreply@blogcms.com>',
  },
};
