const express = require('express');
const BlogPost = require('../models/BlogPost');
const { protect, authorize, optionalAuth, checkOwnership } = require('../middleware/auth');
const { validateBlogPost } = require('../middleware/validation');

const router = express.Router();

// @desc    Get all published blog posts
// @route   GET /api/blogs
// @access  Public
router.get('/', optionalAuth, async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const category = req.query.category;
    const search = req.query.search;
    const featured = req.query.featured === 'true';

    // Build query
    let query = { status: 'published' };

    if (category) {
      query.category = category;
    }

    if (featured) {
      query.featured = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const total = await BlogPost.countDocuments(query);

    // Execute query
    let blogQuery = BlogPost.find(query)
      .populate('author', 'name email avatar')
      .sort({ publishedAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // If searching, sort by text score
    if (search) {
      blogQuery = blogQuery.sort({ score: { $meta: 'textScore' } });
    }

    const blogs = await blogQuery;

    // Pagination info
    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    };

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get featured blog posts
// @route   GET /api/blogs/featured
// @access  Public
router.get('/featured', async (req, res, next) => {
  try {
    const blogs = await BlogPost.getFeatured();

    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get blog categories
// @route   GET /api/blogs/categories
// @access  Public
router.get('/categories', async (req, res, next) => {
  try {
    const categories = await BlogPost.distinct('category', { status: 'published' });

    res.status(200).json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single blog post by slug
// @route   GET /api/blogs/:slug
// @access  Public
router.get('/:slug', optionalAuth, async (req, res, next) => {
  try {
    const blog = await BlogPost.findOne({ 
      slug: req.params.slug,
      status: 'published'
    }).populate('author', 'name email avatar');

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    // Increment views
    await blog.incrementViews();

    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Create new blog post
// @route   POST /api/blogs
// @access  Private (Admin/Moderator)
router.post('/', protect, authorize('admin', 'moderator'), validateBlogPost, async (req, res, next) => {
  try {
    const blogData = {
      ...req.body,
      author: req.user.id
    };

    const blog = await BlogPost.create(blogData);

    // Populate author info
    await blog.populate('author', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Blog post created successfully',
      data: blog
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update blog post
// @route   PUT /api/blogs/:id
// @access  Private (Admin/Moderator/Author)
router.put('/:id', 
  protect, 
  checkOwnership(BlogPost),
  validateBlogPost,
  async (req, res, next) => {
    try {
      const blog = await BlogPost.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true
        }
      ).populate('author', 'name email avatar');

      res.status(200).json({
        success: true,
        message: 'Blog post updated successfully',
        data: blog
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Delete blog post
// @route   DELETE /api/blogs/:id
// @access  Private (Admin/Moderator/Author)
router.delete('/:id',
  protect,
  checkOwnership(BlogPost),
  async (req, res, next) => {
    try {
      await BlogPost.findByIdAndDelete(req.params.id);

      res.status(200).json({
        success: true,
        message: 'Blog post deleted successfully'
      });
    } catch (error) {
      next(error);
    }
  }
);

// @desc    Get all blog posts (including drafts) - Admin only
// @route   GET /api/blogs/admin/all
// @access  Private (Admin)
router.get('/admin/all', protect, authorize('admin'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const status = req.query.status;

    // Build query
    let query = {};
    if (status) {
      query.status = status;
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const total = await BlogPost.countDocuments(query);

    const blogs = await BlogPost.find(query)
      .populate('author', 'name email avatar')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // Pagination info
    const pagination = {
      page,
      limit,
      total,
      pages: Math.ceil(total / limit),
      hasNext: page < Math.ceil(total / limit),
      hasPrev: page > 1
    };

    res.status(200).json({
      success: true,
      count: blogs.length,
      pagination,
      data: blogs
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Toggle blog post featured status
// @route   PATCH /api/blogs/:id/featured
// @access  Private (Admin)
router.patch('/:id/featured', protect, authorize('admin'), async (req, res, next) => {
  try {
    const blog = await BlogPost.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: 'Blog post not found'
      });
    }

    blog.featured = !blog.featured;
    await blog.save();

    res.status(200).json({
      success: true,
      message: `Blog post ${blog.featured ? 'featured' : 'unfeatured'} successfully`,
      data: { featured: blog.featured }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
