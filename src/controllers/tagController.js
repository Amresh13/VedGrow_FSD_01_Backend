import Tag from '../models/Tag.js';

export const getTags = async (_req, res, next) => {
  try {
    const tags = await Tag.find().sort('name');
    res.json({ success: true, data: tags });
  } catch (error) {
    next(error);
  }
};

export const getTag = async (req, res, next) => {
  try {
    const tag = await Tag.findOne({ slug: req.params.slug });
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }
    res.json({ success: true, data: tag });
  } catch (error) {
    next(error);
  }
};

export const createTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(201).json({ success: true, data: tag });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Tag name already exists' });
    }
    next(error);
  }
};

export const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }
    res.json({ success: true, data: tag });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ success: false, message: 'Tag name already exists' });
    }
    next(error);
  }
};

export const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) {
      return res.status(404).json({ success: false, message: 'Tag not found' });
    }
    res.json({ success: true, message: 'Tag deleted' });
  } catch (error) {
    next(error);
  }
};
