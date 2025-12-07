#!/bin/bash
# Heroku Deployment Script for LifeQuest Backend
# Run this from the repo root: bash DEPLOY_HEROKU.sh

set -e

APP_NAME="lifequest-api"
REGION="us"

echo "🚀 LifeQuest Heroku Deployment"
echo "=============================="
echo ""

# Step 1: Login
echo "Step 1: Authenticating with Heroku..."
heroku login -i

# Step 2: Create app (if not exists)
echo ""
echo "Step 2: Creating Heroku app (or using existing)..."
heroku apps:create $APP_NAME --region $REGION 2>/dev/null || echo "App $APP_NAME already exists"

# Step 3: Push repo to Heroku
echo ""
echo "Step 3: Deploying code to Heroku..."
git push heroku main

# Step 4: Set MongoDB URI (optional)
echo ""
echo "Step 4: (Optional) Set MongoDB URI"
echo "If you have a MongoDB Atlas URI, set it now:"
echo "  heroku config:set MONGODB_URI='your_mongodb_uri_here' --app=$APP_NAME"
echo ""
echo "Or press Enter to skip (backend will use in-memory storage)"
read -p "Enter MongoDB URI (or press Enter to skip): " MONGODB_URI

if [ -n "$MONGODB_URI" ]; then
  heroku config:set MONGODB_URI="$MONGODB_URI" --app=$APP_NAME
  echo "✅ MongoDB URI set"
fi

# Step 5: View logs
echo ""
echo "Step 5: Viewing deployment logs..."
heroku logs --tail --app=$APP_NAME &
LOGS_PID=$!

sleep 5

echo ""
echo "✅ Deployment complete!"
echo ""
echo "Your backend is live at:"
heroku apps:info $APP_NAME | grep "Web URL"
echo ""
echo "Health check:"
echo "  curl https://$APP_NAME.herokuapp.com/health"
echo ""
echo "Set this URL in your frontend .env.local:"
echo "  REACT_APP_API_URL=https://$APP_NAME.herokuapp.com"
echo ""
echo "Press Ctrl+C to stop viewing logs"
wait $LOGS_PID
