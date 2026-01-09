const express = require('express');
const router = express.Router();
const { User } = require('./database');
const auth = require('./auth');

// Static quest definitions (keep in sync with front-end QuestWorld)
const QUESTS = [
  {
    id: 'forest_guardian',
    name: 'Forest Guardian',
    title: 'Protect the Forest',
    description: 'Defend the ancient forest from corruption',
    rewardXp: 100,
    position: [-15, 1, -20]
  },
  {
    id: 'sky_watcher',
    name: 'Sky Watcher',
    title: 'Reach the Summit',
    description: 'Climb to the highest peak and claim the treasure',
    rewardXp: 150,
    position: [15, 1, -25]
  },
  {
    id: 'crystal_keeper',
    name: 'Crystal Keeper',
    title: 'Find the Crystals',
    description: 'Collect magical crystals hidden across the world',
    rewardXp: 120,
    position: [20, 1, 5]
  },
  {
    id: 'shadow_hunter',
    name: 'Shadow Hunter',
    title: 'Defeat the Shadow',
    description: 'Defeat the ancient shadow creature',
    rewardXp: 200,
    position: [-20, 1, 15]
  }
];

// GET /api/quests - list available quests
router.get('/', (req, res) => {
  res.json({ success: true, quests: QUESTS });
});

// POST /api/quests/accept - accept a quest (auth required)
router.post('/accept', auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { questId } = req.body;

    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return res.status(404).json({ success: false, error: 'Quest not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    user.profile.activeQuests = user.profile.activeQuests || [];
    // avoid duplicate
    if (!user.profile.activeQuests.includes(questId)) {
      user.profile.activeQuests.push(questId);
    }

    await user.save();

    res.json({ success: true, message: 'Quest accepted', questId, profile: user.profile });
  } catch (err) {
    console.error('Error accepting quest:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

// POST /api/quests/complete - complete quest and grant reward (auth required)
router.post('/complete', auth.authMiddleware, async (req, res) => {
  try {
    const userId = req.user.userId;
    const { questId } = req.body;

    const quest = QUESTS.find(q => q.id === questId);
    if (!quest) return res.status(404).json({ success: false, error: 'Quest not found' });

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ success: false, error: 'User not found' });

    user.profile.activeQuests = user.profile.activeQuests || [];
    user.profile.completedQuests = user.profile.completedQuests || [];

    // remove from active
    user.profile.activeQuests = user.profile.activeQuests.filter(id => id !== questId);
    if (!user.profile.completedQuests.includes(questId)) {
      user.profile.completedQuests.push(questId);
    }

    // reward XP and increment questsCompleted
    user.profile.xp = (user.profile.xp || 0) + (quest.rewardXp || 0);
    user.profile.stats = user.profile.stats || {};
    user.profile.stats.questsCompleted = (user.profile.stats.questsCompleted || 0) + 1;

    await user.save();

    res.json({ success: true, message: 'Quest completed', questId, rewardXp: quest.rewardXp, profile: user.profile });
  } catch (err) {
    console.error('Error completing quest:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});

module.exports = router;
