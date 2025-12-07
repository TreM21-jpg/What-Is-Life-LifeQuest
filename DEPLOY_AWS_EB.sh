#!/bin/bash
# AWS Elastic Beanstalk Deployment Script for LifeQuest Backend
# Prerequisites: AWS CLI, EB CLI, AWS credentials configured

echo "🚀 LifeQuest AWS Elastic Beanstalk Deployment"
echo "=============================================="
echo ""

# Check prerequisites
echo "Checking prerequisites..."
if ! command -v aws &> /dev/null; then
  echo "❌ AWS CLI not installed. Install from: https://aws.amazon.com/cli/"
  exit 1
fi

if ! command -v eb &> /dev/null; then
  echo "❌ EB CLI not installed. Install with: pip install awsebcli --user"
  exit 1
fi

echo "✅ Prerequisites found"
echo ""

# Configuration
APP_NAME="lifequest-api"
ENV_NAME="lifequest-env"
REGION="us-east-1"

echo "Configuration:"
echo "  App Name: $APP_NAME"
echo "  Environment: $ENV_NAME"
echo "  Region: $REGION"
echo ""

# Step 1: Initialize EB
echo "Step 1: Initializing Elastic Beanstalk..."
eb init -p "Node.js 18 running on 64bit Amazon Linux 2" $APP_NAME --region $REGION

# Step 2: Create environment
echo ""
echo "Step 2: Creating environment (this may take a few minutes)..."
eb create $ENV_NAME --instance-type t3.micro

# Step 3: Set MongoDB URI
echo ""
echo "Step 3: Setting environment variables..."
read -p "Enter MongoDB Atlas URI (or press Enter to skip): " MONGODB_URI

if [ -n "$MONGODB_URI" ]; then
  eb setenv MONGODB_URI="$MONGODB_URI"
  echo "✅ MongoDB URI set"
fi

# Step 4: Deploy
echo ""
echo "Step 4: Deploying application..."
eb deploy

# Step 5: Get URL
echo ""
echo "Step 5: Deployment Summary"
echo "=========================="
APP_URL=$(eb open --print-url)
echo "✅ Your backend is live at: $APP_URL"
echo ""
echo "Health check:"
echo "  curl $APP_URL/health"
echo ""
echo "Set this in frontend .env.local:"
echo "  REACT_APP_API_URL=$APP_URL"
echo ""
echo "Useful commands:"
echo "  eb status          - Check status"
echo "  eb logs            - View logs"
echo "  eb terminate       - Delete environment"
echo "  eb console         - Open AWS console"
echo ""
