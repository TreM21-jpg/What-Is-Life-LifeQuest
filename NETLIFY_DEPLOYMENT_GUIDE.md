# Netlify Deployment Guide for LifeQuest

## Overview
This guide walks you through deploying the LifeQuest React frontend to Netlify with automatic GitHub integration.

---

## Quick Start (3 minutes)

### Step 1: Connect Repository to Netlify
1. Go to https://netlify.com
2. Sign in with GitHub (or create account and authorize GitHub)
3. Click "Add new site" → "Import an existing project"
4. Choose "GitHub"
5. Authorize Netlify to access your GitHub repos
6. Select `TreM21-jpg/What-Is-Life-LifeQuest` repository
7. Click "Deploy site"

### Step 2: Configure Build Settings (Auto-detected)
Netlify should auto-detect these settings:
- **Build command**: `npm run build`
- **Publish directory**: `build`
- **Environment**: Node.js 18+

If not auto-detected, set them manually in Netlify dashboard → Site settings → Build & deploy.

### Step 3: Add Environment Variables
1. Go to Netlify dashboard → Your site → Settings → Build & deploy → Environment
2. Click "Edit variables"
3. Add variable:
   - **Key**: `REACT_APP_API_URL`
   - **Value**: `https://YOUR_RAILWAY_BACKEND_URL` (e.g., `https://lifequest-api-prod-xxxxx.up.railway.app`)
4. Click "Save"
5. Trigger a redeploy (or push new commit to `main`)

### Step 4: Watch Deployment
1. Go to Netlify dashboard → Deployments
2. Wait for build to complete (usually 2-5 minutes)
3. Once green, click deployment URL to preview live site

---

## Get Your Backend URL

### From Railway Dashboard
1. Go to https://railway.app/dashboard
2. Select your "lifequest-api" project
3. Click "Settings" tab
4. Under "Public Domain", copy the URL (e.g., `https://lifequest-api-prod-xxxxx.up.railway.app`)
5. Add this to Netlify as `REACT_APP_API_URL`

### From Railway Deployment
Alternatively:
1. Go to **Deployments** tab in Railway
2. Click latest deployment
3. Look for "Railway URL" or "Public Domain" badge at top
4. Copy that URL

---

## Your Netlify Site URL

After deployment, Netlify provides a `.netlify.app` URL:
- **Default**: `YOUR_SITE_NAME.netlify.app`
- **Custom domain**: You can add your own domain later

This is your public game URL.

---

## Automatic Deployments

Every time you push to `main` branch:
1. GitHub notifies Netlify
2. Netlify runs `npm run build`
3. New frontend is deployed automatically
4. No manual action needed!

**To trigger deployment**: Just commit and push:
```bash
git add .
git commit -m "Update game content"
git push origin main
```

---

## Verify Deployment Works

### 1. Check Site Loads
- Open your Netlify URL in browser
- Should see LifeQuest game loading screen
- Check console (F12 → Console) for errors

### 2. Test Backend Connection
- In game, navigate to a screen that calls backend
- Open developer console (F12)
- Check Network tab for API calls to `REACT_APP_API_URL`
- Should see 200 OK responses

### 3. Verify Environment Variable
- In browser console, run: `console.log(process.env.REACT_APP_API_URL)`
- Should output your Railway backend URL

---

## Troubleshooting

### Build Fails with "npm: not found"
- Check Node version in build settings
- Set **Node version**: 18.x or 20.x
- Click "Deploy" again

### Frontend Loads but Backend Fails
- Verify `REACT_APP_API_URL` environment variable is set
- Check if Railway backend is running (test at `https://YOUR_RAILWAY_URL/health`)
- Check browser console for CORS errors
- Ensure backend allows requests from your Netlify domain

### CORS Error (Access-Control-Allow-Origin)
- Backend (Railway) should have CORS enabled
- Check `backend/server-enhanced.js` line with `cors()`
- Should be configured to allow all origins for development

**To fix CORS (in backend):**
```javascript
const cors = require('cors');
app.use(cors()); // Allow all origins for development
```

### Page Shows 404 After Reload
- This is fixed by `netlify.toml` redirect rules (already configured)
- File should have:
  ```toml
  [[redirects]]
    from = "/*"
    to = "/index.html"
    status = 200
  ```
- If missing, add it to `netlify.toml` and redeploy

### Netlify.toml Not Being Applied
- Check file is in root: `/netlify.toml` (not in subdirectory)
- After editing, push to GitHub and redeploy
- Netlify reads `.toml` at deployment time

---

## Site Settings & Customization

### 1. Change Site Name
1. Netlify dashboard → Site settings → Site details
2. Click "Change site name"
3. Enter new name (e.g., `lifequest-game`)
4. Your URL becomes: `lifequest-game.netlify.app`

### 2. Add Custom Domain
1. Site settings → Domain management
2. Click "Add custom domain"
3. Enter your domain (e.g., `lifequest.com`)
4. Update DNS records (Netlify provides instructions)
5. Wait 24-48 hours for DNS propagation

### 3. Enable HTTPS
- ✅ Automatically enabled by Netlify (free)
- Enforced for all sites

### 4. Enable Basic Auth (Optional)
1. Site settings → Access control
2. Set password protection if desired
3. Players enter password to access game

---

## Monitoring & Analytics

### View Deployment History
- Netlify dashboard → Deployments
- Shows all builds with status (success/failed)
- Click any deployment to see logs
- Rollback to previous version if needed

### Check Build Logs
- Click failed deployment
- Scroll to "Deploy log" section
- See exact error messages
- Fix issue locally and push again

### Monitor Performance
- Netlify dashboard → Analytics
- Track page views, bandwidth, build times
- Identify performance issues

---

## Advanced Configuration

### Environment-Specific Variables
Create different env vars for staging/production:

**Production** (`main` branch):
- `REACT_APP_API_URL=https://api.lifequest.com`

**Staging** (if you add a `staging` branch):
- `REACT_APP_API_URL=https://api-staging.lifequest.com`

### Redirect Rules (netlify.toml)
```toml
[[redirects]]
  from = "/api/*"
  to = "https://YOUR_RAILWAY_URL/api/:splat"
  status = 200
  force = true
```

This proxies API calls through Netlify (useful if backend is on different domain).

### Headers for Security
Already configured in `netlify.toml`:
- `X-Frame-Options: SAMEORIGIN` (prevents embedding)
- `X-Content-Type-Options: nosniff` (blocks MIME sniffing)
- `X-XSS-Protection` (legacy XSS protection)

---

## Deployment Checklist

Before deploying to production:

- [ ] All code committed to `main` branch
- [ ] `.env` files NOT committed (use Netlify environment variables instead)
- [ ] `npm run build` works locally without errors
- [ ] `REACT_APP_API_URL` points to Railway backend
- [ ] Backend (Railway) is running and healthy
- [ ] Test game loads and connects to backend
- [ ] Check mobile responsiveness
- [ ] Verify audio/images load correctly
- [ ] Test on multiple browsers (Chrome, Firefox, Safari)

---

## Rollback a Deployment

If something breaks:

1. Netlify dashboard → Deployments
2. Find the last working deployment
3. Click "..." menu on that deployment
4. Select "Publish deploy"
5. Site reverts to that version instantly

No downtime, no data loss—instant rollback!

---

## Performance Tips

### Optimize Build
- Compress images: use ImageOptim or similar
- Remove unused dependencies: `npm prune`
- Code splitting: React does this automatically

### Optimize Runtime
- Lazy load components (already done with React.lazy)
- Cache assets: Netlify handles this automatically
- Use CDN: Netlify is a CDN by default

### Monitor Performance
- Open Devtools (F12) → Lighthouse
- Run audit and fix issues
- Target: 90+ score for Performance

---

## Paid Plans (Optional)

Netlify Free tier is perfect for development!

**Upgrade when you need:**
- Unlimited bandwidth (free tier: 100 GB/month)
- Priority support
- Advanced analytics
- Custom plugins

For LifeQuest: Free tier is likely sufficient unless you get thousands of concurrent players.

---

## Next Steps

1. ✅ Push code to GitHub `main` branch
2. ✅ Connect repo to Netlify (this guide)
3. ✅ Add `REACT_APP_API_URL` environment variable
4. ✅ Deploy backend to Railway (see `RAILWAY_SETUP.md`)
5. ✅ Set `MONGODB_URI` on Railway (see `MONGODB_ATLAS_SETUP.md`)
6. ✅ Test health endpoints

Your game is now live to the world! 🎉

---

## Support & Resources

- **Netlify Docs**: https://docs.netlify.com/
- **Netlify Community**: https://answers.netlify.com/
- **React Build Optimization**: https://facebook.github.io/create-react-app/docs/deployment
- **Troubleshooting**: Check Netlify status at https://www.netlify.com/status/

