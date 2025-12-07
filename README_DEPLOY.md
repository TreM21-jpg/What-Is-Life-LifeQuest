# Deployment Guide — LifeQuest Backend

This document collects quick commands and instructions to deploy the LifeQuest backend and set up persistent storage.

Summary of options
- Local (Docker Compose): Run MongoDB + backend locally using Docker.
- Heroku: Fastest public deploy (uses `Procfile`).
- Railway: GitHub connect + auto-deploy (web UI).
- AWS Elastic Beanstalk / ECS: Production-grade, more setup.
- MongoDB Atlas: Managed DB for persistence.

If you prefer I can run some of these commands for you, but some steps require you to authenticate (Heroku, Railway, AWS, Atlas).

1) Local Docker (recommended for dev testing)

Prereqs: Docker Desktop / Docker Engine

Commands (PowerShell):

```powershell
# Build and start MongoDB + backend
docker compose up --build -d

# View logs
docker compose logs -f backend

# Stop
docker compose down
```

The compose file exposes backend at `http://localhost:3001` and MongoDB at `localhost:27017`.

2) Heroku (quick public deploy)

Prereqs: Heroku CLI installed and logged in

Commands (PowerShell):

```powershell
# login (interactive)
heroku login

# from repo root
cd C:\path\to\What-Is-Life-LifeQuest
git push heroku main

# set MongoDB URI after you have it
heroku config:set MONGODB_URI="your_mongodb_uri_here"

# view logs
heroku logs --tail
```

Notes:
- If `MONGODB_URI` is not set, the server will run in-memory (no persistence).
- The `Procfile` in this repo runs `node backend/server-enhanced.js`.

3) Railway (web UI)

Steps:
- Create an account at https://railway.app
- Create a new project and connect your GitHub repo.
- Add an Environment variable `MONGODB_URI` in the Railway project settings.
- Enable auto-deploy or trigger a deploy from the UI.

4) AWS Elastic Beanstalk (container or Node platform)

Use EB for a production environment. Typical flow:

Commands (PowerShell):

```powershell
# Install EB CLI and configure credentials
pip install awsebcli --user
eb init -p node.js lifequest-api --region us-east-1
eb create lifequest-env
eb setenv MONGODB_URI="your_mongodb_uri_here"
eb deploy
```

5) MongoDB Atlas (managed persistence)

Steps:
1. Sign in to https://cloud.mongodb.com (create an account if needed).
2. Create a new free cluster (Shared Tier).
3. Create a database user (username/password).
4. Network Access → Add your IP or 0.0.0.0/0 for quick testing.
5. Connect → Copy the connection string and replace `<username>` and `<password>` and the DB name.
6. Set the connection string as `MONGODB_URI` in your hosting environment (Heroku/Railway/EB) or `.env` locally.

Example Atlas URI:

```
MONGODB_URI=mongodb+srv://myUser:myPass@cluster0.abcd.mongodb.net/lifequest?retryWrites=true&w=majority
```

6) Post-deploy checklist
- Confirm health endpoint: `GET /health` returns `database: MongoDB` when connected.
- Test save/load: `POST /api/player/save` then `GET /api/player/load` with `X-Session-Id` header.
- Monitor logs (Heroku: `heroku logs --tail`, Railway / EB have web logs).

If you want, I can:
- Attempt a Heroku deploy from this machine (requires you to run `heroku login` here).
- Start a local Docker Compose stack (requires Docker installed).
- Walk you through creating an Atlas cluster and then set the `MONGODB_URI` on the host.
