const fs = require('fs');
const fetch = global.fetch || require('node-fetch');

async function req(method, url, body, token) {
  const headers = { 'Content-Type': 'application/json' };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const text = await res.text();
  let json = null;
  try { json = JSON.parse(text); } catch (e) { json = { raw: text }; }
  return { status: res.status, ok: res.ok, body: json };
}

async function run() {
  const API = process.env.API_URL || 'https://lifequest.fly.dev';
  const now = Date.now();
  const user = `e2e_full_js_${now}`;
  const pw = 'E2ePass123!';
  const results = { startedAt: new Date().toISOString(), steps: [] };

  // Register
  results.steps.push({ name: 'register', result: await req('POST', `${API}/api/auth/register`, { username: user, email: `${user}@example.com`, password: pw }) });

  // Login
  const loginRes = await req('POST', `${API}/api/auth/login`, { username: user, password: pw });
  results.steps.push({ name: 'login', result: loginRes });
  const token = loginRes.body && loginRes.body.token;

  // Verify
  results.steps.push({ name: 'verify', result: await req('POST', `${API}/api/auth/verify`, null, token) });

  // Profile get
  results.steps.push({ name: 'profile_get', result: await req('GET', `${API}/api/player/profile`, null, token) });

  // Profile put
  results.steps.push({ name: 'profile_put', result: await req('PUT', `${API}/api/player/profile`, { level: 7, xp: 777 }, token) });

  // Save
  results.steps.push({ name: 'save', result: await req('POST', `${API}/api/player/save`, { xp: 777, level: 7, inventory: [], region: 'Hub', questsCompleted: 3, achievements: [], stats: { enemiesDefeated: 7 }, playtime: 90 }, token) });

  // Load
  results.steps.push({ name: 'load', result: await req('GET', `${API}/api/player/load`, null, token) });

  // Saves
  results.steps.push({ name: 'saves', result: await req('GET', `${API}/api/player/saves?limit=5`, null, token) });

  // Leader submit
  results.steps.push({ name: 'leader_submit', result: await req('POST', `${API}/api/leaderboard/submit`, { xp: 777, level: 7, playtime: 90, questsCompleted: 3 }, token) });

  // Leaderboard
  results.steps.push({ name: 'leaderboard', result: await req('GET', `${API}/api/leaderboard?limit=5`, null, token) });

  // Achievements
  results.steps.push({ name: 'achievements', result: await req('GET', `${API}/api/achievements`) });
  results.steps.push({ name: 'unlock', result: await req('POST', `${API}/api/achievements/unlock`, { achievementId: 1 }, token) });
  results.steps.push({ name: 'user_achievements', result: await req('GET', `${API}/api/achievements/user`, null, token) });

  // Cleanup via delete_user.js (call as child process)
  const { spawnSync } = require('child_process');
  const env = Object.assign({}, process.env);
  env.MONGODB_URI = env.MONGODB_URI || env.MONGO_URI; // allow override
  const del = spawnSync('node', ['delete_user.js', user], { cwd: __dirname, env, encoding: 'utf8' });
  results.cleanup = { stdout: del.stdout, stderr: del.stderr, status: del.status };

  results.endedAt = new Date().toISOString();
  const outFile = `${__dirname}/e2e_results_${now}.json`;
  fs.writeFileSync(outFile, JSON.stringify(results, null, 2));
  console.log('E2E done, results saved to', outFile);
}

run().catch(err => { console.error('E2E failed:', err); process.exit(1); });
