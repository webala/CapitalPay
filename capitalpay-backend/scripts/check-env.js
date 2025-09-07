const fs = require('fs');
const path = require('path');

console.log('🔍 Environment Variables Diagnostic Tool\n');

// Check current working directory
console.log('📂 Current working directory:', process.cwd());
console.log('📂 Script directory:', __dirname);
console.log('📂 Expected config.env path:', path.join(__dirname, '..', 'config.env'));
console.log('');

// Check if config files exist
const configEnvPath = path.join(__dirname, '..', 'config.env');
const dotEnvPath = path.join(__dirname, '..', '.env');

console.log('📋 Config file status:');
console.log('   config.env exists:', fs.existsSync(configEnvPath));
console.log('   .env exists:', fs.existsSync(dotEnvPath));
console.log('');

// Try to read config.env content
if (fs.existsSync(configEnvPath)) {
  console.log('📄 config.env content:');
  const content = fs.readFileSync(configEnvPath, 'utf8');
  const lines = content.split('\n');
  lines.forEach((line, index) => {
    if (line.trim() && !line.trim().startsWith('#')) {
      const [key] = line.split('=');
      console.log(`   Line ${index + 1}: ${key}=***`);
    }
  });
  console.log('');
}

// Test loading environment variables
console.log('🧪 Testing environment variable loading...');

// Method 1: Load from config.env
if (fs.existsSync(configEnvPath)) {
  console.log('\n🔬 Method 1: Loading from config.env');
  require('dotenv').config({ path: configEnvPath });
  
  const testVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET', 'ADMIN_EMAIL'];
  testVars.forEach(varName => {
    const value = process.env[varName];
    console.log(`   ${varName}:`, value ? `${value.substring(0, 10)}...` : 'NOT SET');
  });
}

// Method 2: Load from default location
console.log('\n🔬 Method 2: Loading from default .env');
require('dotenv').config();

const testVars = ['PORT', 'NODE_ENV', 'MONGODB_URI', 'JWT_SECRET', 'ADMIN_EMAIL'];
testVars.forEach(varName => {
  const value = process.env[varName];
  console.log(`   ${varName}:`, value ? `${value.substring(0, 10)}...` : 'NOT SET');
});

// Check Node.js version
console.log('\n🔧 System Information:');
console.log('   Node.js version:', process.version);
console.log('   Platform:', process.platform);
console.log('   Architecture:', process.arch);

// Recommendations
console.log('\n💡 Troubleshooting Tips:');
console.log('1. Make sure config.env is in the root directory of your project');
console.log('2. Check that there are no spaces around the = sign in config.env');
console.log('3. Make sure there are no quotes around values unless needed');
console.log('4. Try running: npm run setup');
console.log('5. If using Windows, check for file encoding issues (should be UTF-8)');

// Quick fix suggestion
if (!fs.existsSync(configEnvPath)) {
  console.log('\n🚨 QUICK FIX: config.env not found!');
  console.log('Run this command to create it:');
  console.log('npm run setup');
}
