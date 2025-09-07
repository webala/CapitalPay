// MongoDB initialization script
// This script runs when the MongoDB container starts for the first time

// Switch to the capitalpay database
db = db.getSiblingDB('capitalpay');

// Create collections with proper indexes
db.createCollection('users');
db.createCollection('blogposts');
db.createCollection('contactmessages');

// Create indexes for better performance
// User indexes
db.users.createIndex({ email: 1 }, { unique: true });
db.users.createIndex({ role: 1 });
db.users.createIndex({ createdAt: -1 });

// Blog post indexes
db.blogposts.createIndex({ slug: 1 }, { unique: true });
db.blogposts.createIndex({ status: 1, publishedAt: -1 });
db.blogposts.createIndex({ category: 1 });
db.blogposts.createIndex({ featured: 1 });
db.blogposts.createIndex({ author: 1 });
db.blogposts.createIndex({ title: 'text', content: 'text', excerpt: 'text' });

// Contact message indexes
db.contactmessages.createIndex({ email: 1 });
db.contactmessages.createIndex({ status: 1, createdAt: -1 });
db.contactmessages.createIndex({ priority: 1, createdAt: -1 });
db.contactmessages.createIndex({ name: 'text', subject: 'text', message: 'text' });

print('✅ Database initialization completed');
print('📊 Collections created: users, blogposts, contactmessages');
print('🔍 Indexes created for optimal performance');
