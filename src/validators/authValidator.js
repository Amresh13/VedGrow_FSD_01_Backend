import Joi from 'joi';

export const registerSchema = Joi.object({
  name: Joi.string().trim().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(128).required(),
});

export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

export const emailSchema = Joi.object({
  email: Joi.string().email().required(),
});

export const verifyEmailSchema = Joi.object({
  token: Joi.string().required(),
});

export const resetPasswordSchema = Joi.object({
  token: Joi.string().required(),
  newPassword: Joi.string().min(8).max(128).required(),
});

export const changePasswordSchema = Joi.object({
  currentPassword: Joi.string().required(),
  newPassword: Joi.string().min(8).max(128).required(),
});
