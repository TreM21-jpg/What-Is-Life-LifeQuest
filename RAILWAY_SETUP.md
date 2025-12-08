# Railway setup (Option C)

Quick steps to enable Railway auto-deploy for this repository:

1. Go to https://railway.app and sign in (or create an account).
2. Click "New Project" → "Deploy from GitHub".
3. Connect your GitHub account and grant access to the `What-Is-Life-LifeQuest` repo.
4. Select the `main` branch and create the project; Railway will detect the Node app.
5. In the Railway project dashboard, open "Variables" and add `MONGODB_URI` with your Atlas connection string.
6. Push a commit to `main` (or re-run the deployment) — Railway will build and deploy automatically.

Notes:
- If Railway asks for a Start Command, use: `node backend/server-enhanced.js`
- Alternatively you can install the Railway CLI locally (`npm i -g railway`) and run `railway up` from the repo to link the project from your machine.
