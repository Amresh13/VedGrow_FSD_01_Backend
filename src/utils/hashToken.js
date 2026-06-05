import crypto from 'crypto';

export const createHash = (token) => {
  return crypto.createHash('sha256').update(token).digest('hex');
};

export const createRandomToken = () => {
  return crypto.randomBytes(32).toString('hex');
};
