import Joi from 'joi';

export const createBlogSchema = Joi.object({
  title: Joi.string().trim().max(200).required(),
  excerpt: Joi.string().trim().max(300).allow('', null),
  content: Joi.string().required(),
  coverImage: Joi.string().allow('', null),
  category: Joi.string().required(),
  tags: Joi.array().items(Joi.string()).default([]),
  status: Joi.string().valid('draft', 'published').default('draft'),
});

export const updateBlogSchema = Joi.object({
  title: Joi.string().trim().max(200),
  excerpt: Joi.string().trim().max(300).allow('', null),
  content: Joi.string(),
  coverImage: Joi.string().allow('', null),
  category: Joi.string(),
  tags: Joi.array().items(Joi.string()),
  status: Joi.string().valid('draft', 'published'),
}).min(1);
