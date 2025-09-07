const express = require('express');
const ContactMessage = require('../models/ContactMessage');
const { protect, authorize } = require('../middleware/auth');
const { validateContactMessage } = require('../middleware/validation');

const router = express.Router();

// @desc    Submit contact form message
// @route   POST /api/contact
// @access  Public
router.post('/', validateContactMessage, async (req, res, next) => {
  try {
    const { name, email, company, subject, message } = req.body;

    // Get client IP and user agent for tracking
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent');

    const contactMessage = await ContactMessage.create({
      name,
      email,
      company,
      subject,
      message,
      ipAddress,
      userAgent,
      source: 'website'
    });

    res.status(201).json({
      success: true,
      message: 'Your message has been sent successfully! We will get back to you soon.',
      data: {
        id: contactMessage._id,
        name: contactMessage.name,
        email: contactMessage.email,
        subject: contactMessage.subject,
        createdAt: contactMessage.createdAt
      }
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get all contact messages
// @route   GET /api/contact
// @access  Private (Admin/Moderator)
router.get('/', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 20;
    const status = req.query.status;
    const priority = req.query.priority;
    const search = req.query.search;

    // Build query
    let query = {};

    if (status) {
      query.status = status;
    }

    if (priority) {
      query.priority = priority;
    }

    if (search) {
      query.$text = { $search: search };
    }

    // Calculate pagination
    const startIndex = (page - 1) * limit;
    const total = await ContactMessage.countDocuments(query);

    // Execute query
    let messageQuery = ContactMessage.find(query)
      .populate('assignedTo', 'name email')
      .populate('notes.addedBy', 'name email')
      .sort({ createdAt: -1 })
      .skip(startIndex)
      .limit(limit);

    // If searching, sort by text score
    if (search) {
      messageQuery = messageQuery.sort({ score: { $meta: 'textScore' } });
    }

    const messages = await messageQuery;

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
      count: messages.length,
      pagination,
      data: messages
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get contact message statistics
// @route   GET /api/contact/stats
// @access  Private (Admin/Moderator)
router.get('/stats', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const stats = await ContactMessage.getStats();
    
    // Get unread count
    const unreadCount = await ContactMessage.countDocuments({ status: 'new' });
    
    // Get messages from last 7 days
    const lastWeek = new Date();
    lastWeek.setDate(lastWeek.getDate() - 7);
    const recentCount = await ContactMessage.countDocuments({ 
      createdAt: { $gte: lastWeek } 
    });

    const formattedStats = {
      byStatus: stats.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      unreadCount,
      recentCount,
      totalCount: await ContactMessage.countDocuments()
    };

    res.status(200).json({
      success: true,
      data: formattedStats
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Get single contact message
// @route   GET /api/contact/:id
// @access  Private (Admin/Moderator)
router.get('/:id', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id)
      .populate('assignedTo', 'name email avatar')
      .populate('notes.addedBy', 'name email avatar');

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    res.status(200).json({
      success: true,
      data: message
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Update contact message status
// @route   PATCH /api/contact/:id/status
// @access  Private (Admin/Moderator)
router.patch('/:id/status', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const { status, priority, assignedTo } = req.body;

    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    // Update fields
    if (status) {
      message.status = status;
      
      // Update timestamps based on status
      if (status === 'replied' && !message.repliedAt) {
        message.repliedAt = new Date();
      } else if (status === 'resolved' && !message.resolvedAt) {
        message.resolvedAt = new Date();
      }
    }

    if (priority) {
      message.priority = priority;
    }

    if (assignedTo) {
      message.assignedTo = assignedTo;
    }

    await message.save();

    // Populate for response
    await message.populate('assignedTo', 'name email avatar');

    res.status(200).json({
      success: true,
      message: 'Contact message updated successfully',
      data: message
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Add note to contact message
// @route   POST /api/contact/:id/notes
// @access  Private (Admin/Moderator)
router.post('/:id/notes', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const { content } = req.body;

    if (!content || content.trim().length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Note content is required'
      });
    }

    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await message.addNote(content.trim(), req.user.id);

    // Populate for response
    await message.populate('notes.addedBy', 'name email avatar');

    res.status(201).json({
      success: true,
      message: 'Note added successfully',
      data: message.notes[message.notes.length - 1]
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Delete contact message
// @route   DELETE /api/contact/:id
// @access  Private (Admin only)
router.delete('/:id', protect, authorize('admin'), async (req, res, next) => {
  try {
    const message = await ContactMessage.findById(req.params.id);

    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Contact message not found'
      });
    }

    await ContactMessage.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Contact message deleted successfully'
    });
  } catch (error) {
    next(error);
  }
});

// @desc    Mark multiple messages as read
// @route   PATCH /api/contact/bulk/mark-read
// @access  Private (Admin/Moderator)
router.patch('/bulk/mark-read', protect, authorize('admin', 'moderator'), async (req, res, next) => {
  try {
    const { messageIds } = req.body;

    if (!messageIds || !Array.isArray(messageIds)) {
      return res.status(400).json({
        success: false,
        message: 'Message IDs array is required'
      });
    }

    await ContactMessage.updateMany(
      { _id: { $in: messageIds } },
      { 
        status: 'read',
        assignedTo: req.user.id
      }
    );

    res.status(200).json({
      success: true,
      message: `${messageIds.length} messages marked as read`
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
