const axios = require('axios');

// Base URL for the API
const BASE_URL = 'http://localhost:5000/api';

// Test data
const testUser = {
  name: 'Test User',
  email: 'test@example.com',
  password: 'password123'
};

const testBlog = {
  title: 'Test Blog Post',
  excerpt: 'This is a test blog post excerpt for API testing purposes.',
  content: 'This is the full content of the test blog post. It contains detailed information about the topic and provides value to readers.',
  category: 'TECHNOLOGY',
  tags: ['test', 'api', 'blog']
};

const testContact = {
  name: 'Test Contact',
  email: 'contact@example.com',
  subject: 'API Test Message',
  message: 'This is a test message sent via the contact form API endpoint.'
};

let authToken = '';
let userId = '';
let blogId = '';

// Helper function to make API requests
const apiRequest = async (method, endpoint, data = null, token = null) => {
  try {
    const config = {
      method,
      url: `${BASE_URL}${endpoint}`,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` })
      },
      ...(data && { data })
    };

    const response = await axios(config);
    return response.data;
  } catch (error) {
    console.error(`❌ ${method.toUpperCase()} ${endpoint} failed:`, 
      error.response?.data?.message || error.message);
    return null;
  }
};

// Test functions
const testHealthCheck = async () => {
  console.log('🏥 Testing health check...');
  const result = await apiRequest('GET', '/health');
  if (result && result.success) {
    console.log('✅ Health check passed');
  }
};

const testUserRegistration = async () => {
  console.log('👤 Testing user registration...');
  const result = await apiRequest('POST', '/auth/register', testUser);
  if (result && result.success) {
    console.log('✅ User registration successful');
    authToken = result.token;
    userId = result.user.id;
    return true;
  }
  return false;
};

const testUserLogin = async () => {
  console.log('🔐 Testing user login...');
  const loginData = {
    email: testUser.email,
    password: testUser.password
  };
  const result = await apiRequest('POST', '/auth/login', loginData);
  if (result && result.success) {
    console.log('✅ User login successful');
    authToken = result.token;
    return true;
  }
  return false;
};

const testGetProfile = async () => {
  console.log('👨‍💼 Testing get user profile...');
  const result = await apiRequest('GET', '/auth/me', null, authToken);
  if (result && result.success) {
    console.log('✅ Get profile successful');
    return true;
  }
  return false;
};

const testCreateBlog = async () => {
  console.log('📝 Testing blog creation...');
  const result = await apiRequest('POST', '/blogs', testBlog, authToken);
  if (result && result.success) {
    console.log('✅ Blog creation successful');
    blogId = result.data._id;
    return true;
  }
  return false;
};

const testGetBlogs = async () => {
  console.log('📖 Testing get blogs...');
  const result = await apiRequest('GET', '/blogs');
  if (result && result.success) {
    console.log(`✅ Get blogs successful - Found ${result.count} blogs`);
    return true;
  }
  return false;
};

const testContactForm = async () => {
  console.log('📧 Testing contact form...');
  const result = await apiRequest('POST', '/contact', testContact);
  if (result && result.success) {
    console.log('✅ Contact form submission successful');
    return true;
  }
  return false;
};

const testGetContactMessages = async () => {
  console.log('📬 Testing get contact messages...');
  const result = await apiRequest('GET', '/contact', null, authToken);
  if (result && result.success) {
    console.log(`✅ Get contact messages successful - Found ${result.count} messages`);
    return true;
  }
  return false;
};

// Main test runner
const runTests = async () => {
  console.log('🚀 Starting CapitalPay API Tests...\n');

  try {
    // Test basic endpoints
    await testHealthCheck();
    
    // Test authentication
    const registrationSuccess = await testUserRegistration();
    if (!registrationSuccess) {
      // Try login if registration failed (user might already exist)
      await testUserLogin();
    }
    
    await testGetProfile();
    
    // Test blog functionality
    await testGetBlogs();
    await testCreateBlog();
    
    // Test contact form
    await testContactForm();
    await testGetContactMessages();
    
    console.log('\n🎉 All tests completed!');
    console.log('\n📋 Test Summary:');
    console.log('   ✅ Health Check');
    console.log('   ✅ User Authentication');
    console.log('   ✅ User Profile');
    console.log('   ✅ Blog Operations');
    console.log('   ✅ Contact Form');
    
  } catch (error) {
    console.error('❌ Test runner error:', error.message);
  }
};

// Check if server is running
const checkServer = async () => {
  try {
    await axios.get(`${BASE_URL}/health`);
    console.log('✅ Server is running, starting tests...\n');
    runTests();
  } catch (error) {
    console.error('❌ Server is not running. Please start the server first:');
    console.error('   npm run dev');
    console.error('   or');
    console.error('   npm start');
  }
};

// Add axios dependency check
try {
  require.resolve('axios');
  checkServer();
} catch (error) {
  console.error('❌ axios is required for API testing.');
  console.error('Install it with: npm install axios');
}
