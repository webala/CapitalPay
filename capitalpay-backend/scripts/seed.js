const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const path = require('path');

// Load environment variables from parent directory
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// Import models
const User = require('../models/User');
const BlogPost = require('../models/BlogPost');
const ContactMessage = require('../models/ContactMessage');

// Get MongoDB URI - use environment variable or default
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/capitalpay';

console.log('🔗 Connecting to MongoDB:', mongoUri.replace(/\/\/.*@/, '//***:***@')); // Hide credentials in logs

// Connect to MongoDB
mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Sample data
const users = [
  {
    name: 'Admin User',
    email: process.env.ADMIN_EMAIL || 'admin@capitalpay.com',
    password: process.env.ADMIN_PASSWORD || 'admin123',
    role: 'admin',
    isActive: true
  },
  {
    name: 'Sarah Okonkwo',
    email: 'sarah@capitalpay.com',
    password: 'password123',
    role: 'moderator',
    isActive: true
  },
  {
    name: 'John Smith',
    email: 'john@capitalpay.com',
    password: 'password123',
    role: 'user',
    isActive: true
  }
];

const blogPosts = [
  {
    title: 'The Basics about CapitalPay',
    excerpt: 'At Capital Pay International, we are redefining the future of digital finance with a mission to make financial services simple, secure, and accessible for everyone, everywhere.',
    content: `
      <p>At Capital Pay International, we are redefining the future of digital finance with a mission to make financial services simple, secure, and accessible for everyone, everywhere.</p>
      
      <p>From bustling marketplaces in Africa, to the dynamic hubs of Asia, and the established financial centers of the UK and Europe, we provide a unified platform that simplifies payments for businesses and individuals.</p>
      
      <h2>Our Global Network</h2>
      <p>CapitalPay operates across multiple markets including:</p>
      <ul>
        <li>United Kingdom</li>
        <li>South Sudan</li>
        <li>Philippines</li>
        <li>Tanzania</li>
        <li>Kenya</li>
        <li>Crawford Capital (Africa)</li>
      </ul>
      
      <h2>Security First</h2>
      <p>Security is paramount when choosing a digital wallet service. CapitalPay employs bank-grade encryption, multi-factor authentication, and advanced fraud detection systems to protect your financial data.</p>
      
      <p>Our platform is fully compliant with international security standards including PCI DSS and GDPR, ensuring your transactions meet the highest security protocols.</p>
    `,
    category: 'FINANCE',
    tags: ['fintech', 'payments', 'digital wallet', 'global'],
    status: 'published',
    featured: true,
    publishedAt: new Date()
  },
  {
    title: 'Digital Transformation in African Financial Services',
    excerpt: 'Exploring how digital payment solutions are revolutionizing financial inclusion across African markets.',
    content: `
      <p>Africa is experiencing a digital financial revolution, with mobile money and digital payment solutions leading the charge in financial inclusion.</p>
      
      <h2>The Current Landscape</h2>
      <p>Traditional banking infrastructure in many African countries has been limited, creating opportunities for innovative fintech solutions to fill the gap.</p>
      
      <h2>CapitalPay's Role</h2>
      <p>Through our operations in South Sudan, Tanzania, and Kenya, we're providing businesses and individuals with secure, reliable payment solutions that work across borders.</p>
      
      <h2>Key Benefits</h2>
      <ul>
        <li>Instant cross-border transfers</li>
        <li>Low transaction fees</li>
        <li>Mobile-first approach</li>
        <li>Multi-currency support</li>
      </ul>
    `,
    category: 'BUSINESS',
    tags: ['africa', 'fintech', 'mobile money', 'financial inclusion'],
    status: 'published',
    featured: false,
    publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) // 7 days ago
  },
  {
    title: 'Understanding Virtual Cards and Digital Payments',
    excerpt: 'A comprehensive guide to virtual cards, their benefits, and how they\'re changing the way we make online payments.',
    content: `
      <p>Virtual cards are revolutionizing online payments by providing secure, convenient alternatives to traditional payment methods.</p>
      
      <h2>What are Virtual Cards?</h2>
      <p>Virtual cards are digital payment cards that exist only online. They provide all the functionality of physical cards but with enhanced security features.</p>
      
      <h2>Benefits of Virtual Cards</h2>
      <ul>
        <li>Enhanced security with unique card numbers</li>
        <li>Instant issuance and activation</li>
        <li>Easy spending controls and limits</li>
        <li>Real-time transaction monitoring</li>
      </ul>
      
      <h2>CapitalPay Virtual Cards</h2>
      <p>Our virtual card solutions provide businesses and individuals with secure, flexible payment options for online transactions across our global network.</p>
    `,
    category: 'TECHNOLOGY',
    tags: ['virtual cards', 'online payments', 'security', 'digital'],
    status: 'published',
    featured: true,
    publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) // 3 days ago
  }
];

const contactMessages = [
  {
    name: 'Michael Johnson',
    email: 'michael@example.com',
    company: 'Tech Solutions Ltd',
    subject: 'Partnership Inquiry',
    message: 'Hello, I\'m interested in exploring partnership opportunities with CapitalPay for our business clients. Could we schedule a call to discuss this further?',
    status: 'new',
    priority: 'high'
  },
  {
    name: 'Emily Chen',
    email: 'emily@startup.com',
    subject: 'API Integration Question',
    message: 'Hi, I\'m a developer working on integrating CapitalPay\'s API into our platform. I have some questions about the authentication process and rate limits.',
    status: 'read',
    priority: 'medium'
  },
  {
    name: 'David Williams',
    email: 'david@business.co.uk',
    company: 'Global Trading Co',
    subject: 'Bulk Payment Solutions',
    message: 'We\'re looking for a solution to handle bulk salary payments for our international team. Can CapitalPay support payments to multiple countries simultaneously?',
    status: 'replied',
    priority: 'high'
  }
];

const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await User.deleteMany({});
    await BlogPost.deleteMany({});
    await ContactMessage.deleteMany({});

    // Create users
    console.log('👥 Creating users...');
    const createdUsers = [];
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      createdUsers.push(user);
    }
    console.log(`✅ Created ${createdUsers.length} users`);

    // Create blog posts
    console.log('📝 Creating blog posts...');
    const adminUser = createdUsers.find(user => user.role === 'admin');
    const moderatorUser = createdUsers.find(user => user.role === 'moderator');
    
    for (let i = 0; i < blogPosts.length; i++) {
      const postData = blogPosts[i];
      postData.author = i === 0 ? adminUser._id : moderatorUser._id;
      
      const blogPost = new BlogPost(postData);
      await blogPost.save();
    }
    console.log(`✅ Created ${blogPosts.length} blog posts`);

    // Create contact messages
    console.log('📧 Creating contact messages...');
    for (const messageData of contactMessages) {
      const message = new ContactMessage(messageData);
      await message.save();
    }
    console.log(`✅ Created ${contactMessages.length} contact messages`);

    console.log('\n🎉 Database seeding completed successfully!');
    console.log('\n📋 Summary:');
    console.log(`   👥 Users: ${createdUsers.length}`);
    console.log(`   📝 Blog Posts: ${blogPosts.length}`);
    console.log(`   📧 Contact Messages: ${contactMessages.length}`);
    console.log('\n🔑 Admin Credentials:');
    console.log(`   Email: ${adminUser.email}`);
    console.log(`   Password: ${process.env.ADMIN_PASSWORD || 'admin123'}`);
    console.log('\n🚀 You can now start the server with: npm run dev');

  } catch (error) {
    console.error('❌ Error seeding database:', error);
  } finally {
    mongoose.connection.close();
  }
};

// Run the seeder
seedDatabase();
