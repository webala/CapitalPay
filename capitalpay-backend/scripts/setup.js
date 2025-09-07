const fs = require('fs');
const path = require('path');

console.log('🚀 Setting up CapitalPay Backend...\n');

// Check if config.env exists
const configEnvPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env');

if (!fs.existsSync(configEnvPath)) {
  console.log('❌ config.env not found!');
  
  if (fs.existsSync(envExamplePath)) {
    console.log('📋 Copying config.env.example to config.env...');
    fs.copyFileSync(envExamplePath, configEnvPath);
    console.log('✅ config.env created from example');
  } else {
    console.log('📝 Creating config.env with default values...');
    const defaultConfig = `# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGODB_URI=mongodb://localhost:27017/capitalpay

# JWT Configuration
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production-${Date.now()}
JWT_EXPIRE=7d

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-email-password

# Admin Configuration
ADMIN_EMAIL=admin@capitalpay.com
ADMIN_PASSWORD=admin123
`;
    fs.writeFileSync(configEnvPath, defaultConfig);
    console.log('✅ config.env created with default values');
  }
} else {
  console.log('✅ config.env already exists');
}

// Test environment loading
console.log('\n🔍 Testing environment variable loading...');
require('dotenv').config({ path: configEnvPath });

const requiredVars = ['PORT', 'MONGODB_URI', 'JWT_SECRET'];
let allGood = true;

requiredVars.forEach(varName => {
  if (process.env[varName]) {
    console.log(`✅ ${varName}: set`);
  } else {
    console.log(`❌ ${varName}: not set`);
    allGood = false;
  }
});

console.log('\n📋 Setup Summary:');
if (allGood) {
  console.log('✅ All required environment variables are configured');
  console.log('🚀 You can now start the server with: npm run dev');
} else {
  console.log('❌ Some environment variables are missing');
  console.log('📝 Please edit config.env and set the missing values');
}

console.log('\n💡 Next steps:');
console.log('1. Edit config.env with your actual values');
console.log('2. Make sure MongoDB is running');
console.log('3. Run: npm run seed (to populate with sample data)');
console.log('4. Run: npm run dev (to start the server)');
console.log('5. Run: npm run test-api (to test the endpoints)');
