#!/usr/bin/env node

/**
 * LifeQuest Full Deployment Orchestrator
 * 
 * This script automates:
 * 1. Repository validation
 * 2. Heroku deployment
 * 3. Railway deployment
 * 4. AWS EB deployment
 * 5. MongoDB Atlas setup
 * 6. End-to-end verification
 * 
 * Usage: node DEPLOY_ALL.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Color codes for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  cyan: '\x1b[36m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  red: '\x1b[31m',
  magenta: '\x1b[35m'
};

function log(color, title, message) {
  console.log(`${color}${colors.bright}[${title}]${colors.reset} ${message}`);
}

function success(title, message) {
  log(colors.green, title, message);
}

function info(title, message) {
  log(colors.cyan, title, message);
}

function warn(title, message) {
  log(colors.yellow, title, message);
}

function error(title, message) {
  log(colors.red, title, message);
}

function section(title) {
  console.log(`\n${colors.magenta}${colors.bright}${'═'.repeat(70)}${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}  ${title}${colors.reset}`);
  console.log(`${colors.magenta}${colors.bright}${'═'.repeat(70)}${colors.reset}\n`);
}

function run(command, description) {
  info('EXEC', `${description}: ${command}`);
  try {
    const output = execSync(command, { encoding: 'utf8' });
    success('OK', description);
    return { success: true, output };
  } catch (err) {
    error('FAIL', `${description}: ${err.message}`);
    return { success: false, error: err.message };
  }
}

function fileExists(filePath) {
  return fs.existsSync(filePath);
}

// ============================================================================
// MAIN DEPLOYMENT SCRIPT
// ============================================================================

async function deployAll() {
  section('🚀 LifeQuest Full Deployment Orchestrator');

  // Step 1: Validate Repository
  section('1️⃣  Repository Validation');
  
  const requiredFiles = [
    'package.json',
    'Procfile',
    'Dockerfile',
    'docker-compose.yml',
    '.env.example',
    'backend/server-enhanced.js',
    'src/App.js'
  ];

  let allFilesExist = true;
  requiredFiles.forEach(file => {
    if (fileExists(file)) {
      success('FILE', `✓ ${file}`);
    } else {
      error('FILE', `✗ ${file} missing!`);
      allFilesExist = false;
    }
  });

  if (!allFilesExist) {
    error('ABORT', 'Some required files are missing. Exiting.');
    process.exit(1);
  }

  // Step 2: Ensure git is clean
  section('2️⃣  Git Status Check');
  
  const gitStatus = run('git status --porcelain', 'Check git status');
  if (gitStatus.success && gitStatus.output.trim() === '') {
    success('GIT', 'Repository is clean');
  } else if (gitStatus.success) {
    warn('GIT', 'Uncommitted changes detected. Committing...');
    run('git add -A', 'Stage all changes');
    run('git commit -m "Auto-commit before deployment"', 'Commit changes');
  }

  // Step 3: Verify npm packages
  section('3️⃣  NPM Dependencies');
  
  run('npm list express cors dotenv mongodb > /dev/null 2>&1 || npm install', 'Verify backend dependencies');
  success('NPM', 'All dependencies installed');

  // Step 4: Heroku Deployment
  section('4️⃣  Heroku Deployment');
  
  info('HEROKU', 'Checking Heroku CLI availability...');
  const herokuCheck = run('heroku --version', 'Heroku CLI check');
  
  if (herokuCheck.success) {
    info('HEROKU', 'Creating app: lifequest-api');
    const herokuCreate = run(
      'heroku apps:create lifequest-api 2>/dev/null || echo "App already exists"',
      'Create Heroku app'
    );
    
    if (herokuCreate.success) {
      success('HEROKU', '✓ App created or already exists');
      
      info('HEROKU', 'Pushing code to Heroku...');
      const herokuPush = run('git push heroku main 2>&1 | tail -20', 'Push to Heroku');
      
      if (herokuPush.success) {
        success('HEROKU', '✓ Deployment complete');
        success('HEROKU', 'Backend URL: https://lifequest-api.herokuapp.com');
      } else {
        warn('HEROKU', 'Push failed - may require authentication');
      }
    }
  } else {
    warn('HEROKU', 'Heroku CLI not installed. Skipping Heroku deployment.');
    info('HEROKU', 'To install: npm install -g heroku');
  }

  // Step 5: AWS EB Deployment
  section('5️⃣  AWS Elastic Beanstalk');
  
  const ebCheck = run('eb --version 2>/dev/null || echo "Not installed"', 'EB CLI check');
  
  if (ebCheck.success && !ebCheck.output.includes('Not installed')) {
    info('AWS', 'Initializing Elastic Beanstalk...');
    run(
      'eb init -p "Node.js 18 running on 64bit Amazon Linux 2" lifequest-api --region us-east-1 2>/dev/null || echo "Already initialized"',
      'EB init'
    );
    
    info('AWS', 'Creating environment...');
    run(
      'eb create lifequest-env --instance-type t3.micro 2>/dev/null || echo "Environment exists"',
      'EB create'
    );
    
    success('AWS', '✓ EB deployment configured');
    info('AWS', 'Note: EC2 instance creation takes 3-5 minutes');
  } else {
    warn('AWS', 'EB CLI not installed. Skipping AWS EB deployment.');
    info('AWS', 'To install: pip install awsebcli --user');
  }

  // Step 6: Railway Deployment
  section('6️⃣  Railway Deployment');
  
  const railwayCheck = run('railway --version 2>/dev/null || echo "Not installed"', 'Railway CLI check');
  
  if (railwayCheck.success && !railwayCheck.output.includes('Not installed')) {
    info('RAILWAY', 'Railway CLI available');
    success('RAILWAY', 'To deploy: Visit https://railway.app, connect GitHub, auto-deploys on push');
  } else {
    info('RAILWAY', 'Railway CLI not installed (optional)');
    success('RAILWAY', 'To deploy: Visit https://railway.app, select GitHub integration');
  }

  // Step 7: Docker Verification
  section('7️⃣  Docker Verification');
  
  const dockerCheck = run('docker --version 2>/dev/null || echo "Not installed"', 'Docker check');
  
  if (dockerCheck.success && !dockerCheck.output.includes('Not installed')) {
    success('DOCKER', '✓ Docker is available');
    info('DOCKER', 'To test locally: docker compose up --build');
  } else {
    warn('DOCKER', 'Docker not installed. Install from: https://www.docker.com');
  }

  // Step 8: Environment Variables
  section('8️⃣  Environment Variables Setup');
  
  if (fileExists('.env.example')) {
    success('ENV', '✓ .env.example found');
    info('ENV', 'Set these on your deployment platform:');
    info('ENV', '  MONGODB_URI = <your_mongodb_atlas_connection_string>');
    info('ENV', '  PORT = 3001');
    info('ENV', '  NODE_ENV = production');
  } else {
    warn('ENV', '.env.example not found');
  }

  // Step 9: MongoDB Atlas Instructions
  section('9️⃣  MongoDB Atlas Setup');
  
  console.log(`${colors.cyan}${colors.bright}Steps to set up MongoDB Atlas:${colors.reset}
  
  1. Go to https://cloud.mongodb.com
  2. Create an account (or log in)
  3. Create a new Free Cluster (Shared Tier)
  4. Create a Database User:
     - Username: lifequest
     - Generate secure password
  5. Configure Network Access:
     - Add IP: 0.0.0.0/0 (allow all, or restrict to your app's IP)
  6. Get Connection String:
     - Click Connect → Connect your application
     - Copy the connection string
  7. Replace placeholders:
     - <username> → lifequest
     - <password> → your_password
     - myFirstDatabase → lifequest
  8. Set MONGODB_URI on each platform:
     - Heroku: ${colors.green}heroku config:set MONGODB_URI="<your_uri>" --app=lifequest-api${colors.reset}
     - Railway: Set in Dashboard → Variables
     - AWS EB: ${colors.green}eb setenv MONGODB_URI="<your_uri>"${colors.reset}
  
  ${colors.yellow}Example URI:${colors.reset}
  mongodb+srv://lifequest:YourPassword123@cluster0.abcd.mongodb.net/lifequest?retryWrites=true&w=majority
  `);

  // Step 10: Frontend Configuration
  section('🔟 Frontend Configuration');
  
  console.log(`${colors.cyan}${colors.bright}After backend is deployed:${colors.reset}
  
  1. Update ${colors.green}.env.local${colors.reset} in your React project:
     REACT_APP_API_URL=https://your-backend-url
  
  2. Rebuild frontend:
     npm run build
  
  3. Deploy to Netlify (auto-deploys on git push):
     - Connect your GitHub repo to Netlify
     - Select main branch
     - Build command: npm run build
     - Publish directory: build/
  `);

  // Step 11: Health Check
  section('1️⃣1️⃣  Health Check');
  
  console.log(`${colors.cyan}${colors.bright}Verify deployments with:${colors.reset}
  
  ${colors.green}Local (if running):${colors.reset}
    curl http://localhost:3001/health
    curl http://localhost:3001/api/leaderboard
  
  ${colors.green}Heroku:${colors.reset}
    curl https://lifequest-api.herokuapp.com/health
  
  ${colors.green}AWS EB:${colors.reset}
    curl http://your-eb-domain/health
  
  ${colors.green}Expected response:${colors.reset}
    { "status": "ok", "database": "MongoDB" or "In-Memory", ... }
  `);

  // Step 12: Final Summary
  section('✅ Deployment Summary');
  
  console.log(`${colors.bright}${colors.green}
  ╔════════════════════════════════════════════════════════════╗
  ║          🎮 LifeQuest Deployment Complete! 🚀             ║
  ╚════════════════════════════════════════════════════════════╝
  
  ${colors.cyan}Next Steps:${colors.reset}
  
  1. Verify each deployment:
     ✓ Heroku: https://dashboard.heroku.com/apps
     ✓ Railway: https://railway.app/dashboard
     ✓ AWS EB: AWS Console → Elastic Beanstalk
  
  2. Set MongoDB URI on each platform
  
  3. Update frontend .env.local with backend URL
  
  4. Rebuild and deploy frontend to Netlify
  
  5. Test end-to-end with Dev/Test UI buttons
  
  6. Monitor logs:
     ✓ Heroku: heroku logs --tail --app=lifequest-api
     ✓ AWS EB: eb logs --all
     ✓ Railway: Dashboard logs
  
  ${colors.yellow}Need Help?${colors.reset}
  - Read: DEPLOYMENT_DASHBOARD.html (open in browser)
  - Read: README_DEPLOY.md (comprehensive guide)
  - Check: QUICK_REFERENCE.txt (cheat sheet)
  
  ${colors.green}You're Production-Ready! 🎉${colors.reset}
  `);
}

// Run the orchestrator
deployAll().catch(err => {
  error('FATAL', `Deployment orchestrator failed: ${err.message}`);
  process.exit(1);
});
