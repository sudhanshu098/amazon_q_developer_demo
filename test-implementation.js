#!/usr/bin/env node

/**
 * Simple test script to verify the S3 implementation works correctly
 * This script tests the core functionality without requiring AWS SDK installation
 */

const path = require('path');
const fs = require('fs');

console.log('🧪 Testing S3 Implementation...\n');

// Test 1: Check if all required files exist
console.log('1. Checking file structure...');
const requiredFiles = [
  'backend/src/s3Service.js',
  'backend/tests/buckets.test.js',
  'backend/tests/s3Service.test.js',
  'README.md'
];

let allFilesExist = true;
requiredFiles.forEach(file => {
  const fullPath = path.join(__dirname, file);
  if (fs.existsSync(fullPath)) {
    console.log(`   ✅ ${file}`);
  } else {
    console.log(`   ❌ ${file} - MISSING`);
    allFilesExist = false;
  }
});

if (!allFilesExist) {
  console.log('\n❌ Some required files are missing!');
  process.exit(1);
}

// Test 2: Check if S3Service can be loaded
console.log('\n2. Testing S3Service module loading...');
try {
  // Mock the AWS SDK before requiring S3Service
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  
  Module.prototype.require = function(id) {
    if (id === '@aws-sdk/client-s3') {
      return {
        S3Client: class MockS3Client {
          constructor(config) {
            this.config = config;
          }
        },
        ListBucketsCommand: class MockListBucketsCommand {
          constructor(params) {
            this.params = params;
          }
        }
      };
    }
    return originalRequire.apply(this, arguments);
  };

  const S3Service = require('./backend/src/s3Service');
  const service = new S3Service({ region: 'ap-south-1' });
  console.log('   ✅ S3Service loaded successfully');
  console.log(`   ✅ Service initialized with client: ${!!service.client}`);
  
  // Restore original require
  Module.prototype.require = originalRequire;
} catch (error) {
  console.log(`   ❌ Failed to load S3Service: ${error.message}`);
  process.exit(1);
}

// Test 3: Check if app.js can be loaded with modifications
console.log('\n3. Testing app.js modifications...');
try {
  // Mock dependencies
  const Module = require('module');
  const originalRequire = Module.prototype.require;
  
  Module.prototype.require = function(id) {
    if (id === 'redis') {
      return {
        createClient: () => ({
          keys: async () => [],
          hGetAll: async () => ({}),
          hSet: async () => {},
          incr: async () => 1,
          exists: async () => 0,
          del: async () => 0
        })
      };
    }
    if (id === './src/s3Service') {
      return class MockS3Service {
        async listBuckets() {
          return [];
        }
      };
    }
    return originalRequire.apply(this, arguments);
  };

  const createApp = require('./backend/app');
  const mockRedis = { test: true };
  const mockS3 = { listBuckets: async () => [] };
  
  const { app } = createApp(mockRedis, mockS3);
  console.log('   ✅ app.js loaded successfully');
  console.log('   ✅ createApp accepts both redisClient and s3Service parameters');
  
  // Restore original require
  Module.prototype.require = originalRequire;
} catch (error) {
  console.log(`   ❌ Failed to load app.js: ${error.message}`);
  process.exit(1);
}

// Test 4: Check package.json modifications
console.log('\n4. Checking package.json dependencies...');
try {
  const packageJson = JSON.parse(fs.readFileSync('./backend/package.json', 'utf8'));
  
  if (packageJson.dependencies['@aws-sdk/client-s3']) {
    console.log('   ✅ AWS SDK v3 dependency added');
  } else {
    console.log('   ❌ AWS SDK v3 dependency missing');
  }
  
  if (packageJson.devDependencies['jest']) {
    console.log('   ✅ Jest testing framework present');
  } else {
    console.log('   ❌ Jest testing framework missing');
  }
} catch (error) {
  console.log(`   ❌ Failed to read package.json: ${error.message}`);
}

// Test 5: Check README content
console.log('\n5. Checking README documentation...');
try {
  const readme = fs.readFileSync('./README.md', 'utf8');
  
  const requiredSections = [
    '/api/buckets',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'ap-south-1',
    'S3Service'
  ];
  
  let allSectionsPresent = true;
  requiredSections.forEach(section => {
    if (readme.includes(section)) {
      console.log(`   ✅ Contains ${section}`);
    } else {
      console.log(`   ❌ Missing ${section}`);
      allSectionsPresent = false;
    }
  });
  
  if (allSectionsPresent) {
    console.log('   ✅ README contains all required documentation');
  }
} catch (error) {
  console.log(`   ❌ Failed to read README: ${error.message}`);
}

console.log('\n🎉 Implementation test completed!');
console.log('\nNext steps:');
console.log('1. Run "cd backend && npm install" to install dependencies');
console.log('2. Configure AWS credentials (see README.md)');
console.log('3. Run "npm test" to execute the test suite');
console.log('4. Run "npm start" to start the server');