const mongoose = require('mongoose');

const contactMessageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    maxlength: [100, 'Name cannot exceed 100 characters']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email'
    ]
  },
  company: {
    type: String,
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters'],
    default: null
  },
  subject: {
    type: String,
    required: [true, 'Subject is required'],
    trim: true,
    maxlength: [200, 'Subject cannot exceed 200 characters']
  },
  message: {
    type: String,
    required: [true, 'Message is required'],
    trim: true,
    maxlength: [2000, 'Message cannot exceed 2000 characters']
  },
  status: {
    type: String,
    enum: ['new', 'read', 'replied', 'resolved', 'spam'],
    default: 'new'
  },
  priority: {
    type: String,
    enum: ['low', 'medium', 'high', 'urgent'],
    default: 'medium'
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  ipAddress: {
    type: String,
    default: null
  },
  userAgent: {
    type: String,
    default: null
  },
  source: {
    type: String,
    enum: ['website', 'mobile_app', 'api'],
    default: 'website'
  },
  tags: [{
    type: String,
    trim: true
  }],
  notes: [{
    content: {
      type: String,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    addedAt: {
      type: Date,
      default: Date.now
    }
  }],
  repliedAt: {
    type: Date,
    default: null
  },
  resolvedAt: {
    type: Date,
    default: null
  }
}, {
  timestamps: true
});

// Index for better search performance
contactMessageSchema.index({ email: 1 });
contactMessageSchema.index({ status: 1, createdAt: -1 });
contactMessageSchema.index({ priority: 1, createdAt: -1 });
contactMessageSchema.index({ name: 'text', subject: 'text', message: 'text' });

// Update status and timestamps
contactMessageSchema.methods.markAsRead = function(userId = null) {
  this.status = 'read';
  if (userId) this.assignedTo = userId;
  return this.save();
};

contactMessageSchema.methods.markAsReplied = function(userId = null) {
  this.status = 'replied';
  this.repliedAt = new Date();
  if (userId) this.assignedTo = userId;
  return this.save();
};

contactMessageSchema.methods.markAsResolved = function(userId = null) {
  this.status = 'resolved';
  this.resolvedAt = new Date();
  if (userId) this.assignedTo = userId;
  return this.save();
};

contactMessageSchema.methods.addNote = function(content, userId) {
  this.notes.push({
    content,
    addedBy: userId,
    addedAt: new Date()
  });
  return this.save();
};

// Static methods
contactMessageSchema.statics.getUnread = function() {
  return this.find({ status: 'new' }).sort({ createdAt: -1 });
};

contactMessageSchema.statics.getByPriority = function(priority) {
  return this.find({ priority }).sort({ createdAt: -1 });
};

contactMessageSchema.statics.getStats = function() {
  return this.aggregate([
    {
      $group: {
        _id: '$status',
        count: { $sum: 1 }
      }
    }
  ]);
};

module.exports = mongoose.model('ContactMessage', contactMessageSchema);
