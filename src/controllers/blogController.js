import Blog from '../models/Blog.js';
import sanitizeHtml from 'sanitize-html';

const sanitize = (dirty) =>
  sanitizeHtml(dirty, {
    allowedTags: [
      'p', 'h1', 'h2', 'h3', 'h4', 'ul', 'ol', 'li',
      'strong', 'em', 'b', 'i', 'u', 'a', 'img',
      'blockquote', 'code', 'pre', 'br', 'hr', 'span',
    ],
    allowedAttributes: {
      a: ['href', 'target', 'rel'],
      img: ['src', 'alt'],
    },
    allowedSchemes: ['http', 'https', 'data'],
  });

export const getBlogs = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search, category, tag, sort = '-publishedAt' } = req.query;
    const query = { status: 'published' };

    if (search) {
      query.$text = { $search: search };
    }
    if (category) {
      query.category = category;
    }
    if (tag) {
      query.tags = tag;
    }

    const total = await Blog.countDocuments(query);
    const blogs = await Blog.find(query)
      .populate('author', 'name')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .sort(sort)
      .skip((page - 1) * limit)
      .limit(Number(limit));

    res.json({
      success: true,
      data: blogs,
      meta: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBlogBySlug = async (req, res, next) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug, status: 'published' })
      .populate('author', 'name')
      .populate('category', 'name slug')
      .populate('tags', 'name slug');

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.views += 1;
    await blog.save({ validateBeforeSave: false });

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const getAllBlogsAdmin = async (req, res, next) => {
  try {
    const blogs = await Blog.find()
      .populate('author', 'name')
      .populate('category', 'name slug')
      .populate('tags', 'name slug')
      .sort('-createdAt');

    res.json({ success: true, data: blogs });
  } catch (error) {
    next(error);
  }
};

export const createBlog = async (req, res, next) => {
  try {
    req.body.content = sanitize(req.body.content);
    const blog = await Blog.create({ ...req.body, author: req.user.id });
    const populated = await blog.populate(['author', 'category', 'tags']);
    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (req, res, next) => {
  try {
    if (req.body.content) {
      req.body.content = sanitize(req.body.content);
    }

    const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate(['author', 'category', 'tags']);

    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (req, res, next) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }
    res.json({ success: true, message: 'Blog deleted' });
  } catch (error) {
    next(error);
  }
};

export const toggleBlogStatus = async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) {
      return res.status(404).json({ success: false, message: 'Blog not found' });
    }

    blog.status = blog.status === 'published' ? 'draft' : 'published';
    await blog.save();

    res.json({ success: true, data: blog });
  } catch (error) {
    next(error);
  }
};
