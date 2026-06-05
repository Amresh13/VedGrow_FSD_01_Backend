import Blog from '../models/Blog.js';
import Category from '../models/Category.js';
import Tag from '../models/Tag.js';

export const getStats = async (_req, res, next) => {
  try {
    const [totalBlogs, publishedBlogs, draftBlogs, totalViews, totalCategories, totalTags] =
      await Promise.all([
        Blog.countDocuments(),
        Blog.countDocuments({ status: 'published' }),
        Blog.countDocuments({ status: 'draft' }),
        Blog.aggregate([{ $group: { _id: null, total: { $sum: '$views' } } }]),
        Category.countDocuments(),
        Tag.countDocuments(),
      ]);

    res.json({
      success: true,
      data: {
        totalBlogs,
        publishedBlogs,
        draftBlogs,
        totalViews: totalViews[0]?.total || 0,
        totalCategories,
        totalTags,
      },
    });
  } catch (error) {
    next(error);
  }
};
