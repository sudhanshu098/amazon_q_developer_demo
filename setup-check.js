const fs = require('fs');
const path = require('path');

console.log('🔍 Jaipur Real Estate Portal - Setup Verification\n');

// Check Node.js version
const nodeVersion = process.version;
const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);

console.log(`📋 System Information:`);
console.log(`   Node.js Version: ${nodeVersion}`);
console.log(`   Platform: ${process.platform}`);
console.log(`   Architecture: ${process.arch}\n`);

if (majorVersion < 20) {
    console.log('❌ Node.js version 20 or higher is required');
    console.log('   Please upgrade Node.js and try again\n');
    process.exit(1);
} else {
    console.log('✅ Node.js version requirement met\n');
}

// Check project structure
console.log('📁 Project Structure Check:');

const requiredFiles = [
    'frontend/package.json',
    'frontend/src/app/page.tsx',
    'frontend/src/app/layout.tsx',
    'backend/package.json',
    'backend/server.js',
    'README.md'
];

const requiredDirs = [
    'frontend',
    'frontend/src',
    'frontend/src/app',
    'frontend/src/components',
    'frontend/src/lib',
    'frontend/src/types',
    'backend'
];

let allGood = true;

// Check directories
requiredDirs.forEach(dir => {
    if (fs.existsSync(dir)) {
        console.log(`   ✅ ${dir}/`);
    } else {
        console.log(`   ❌ ${dir}/ (missing)`);
        allGood = false;
    }
});

// Check files
requiredFiles.forEach(file => {
    if (fs.existsSync(file)) {
        console.log(`   ✅ ${file}`);
    } else {
        console.log(`   ❌ ${file} (missing)`);
        allGood = false;
    }
});

console.log();

if (allGood) {
    console.log('🎉 Setup verification completed successfully!\n');
    console.log('📝 Next Steps:');
    console.log('   1. Run "start.bat" (Windows) or "bash start.sh" (Linux/Mac)');
    console.log('   2. Or manually start both servers:');
    console.log('      - Backend: cd backend && npm install && npm run dev');
    console.log('      - Frontend: cd frontend && npm install && npm run dev');
    console.log('   3. Open http://localhost:3000 in your browser\n');
    console.log('🏠 Enjoy exploring the Jaipur Real Estate Portal!');
} else {
    console.log('❌ Setup verification failed!');
    console.log('   Some required files or directories are missing.');
    console.log('   Please check the project structure and try again.\n');
    process.exit(1);
}

// Check package.json files
console.log('\n📦 Package Information:');

try {
    const frontendPkg = JSON.parse(fs.readFileSync('frontend/package.json', 'utf8'));
    console.log(`   Frontend: ${frontendPkg.name} v${frontendPkg.version}`);
    
    const backendPkg = JSON.parse(fs.readFileSync('backend/package.json', 'utf8'));
    console.log(`   Backend: ${backendPkg.name} v${backendPkg.version}`);
} catch (error) {
    console.log('   ⚠️  Could not read package.json files');
}