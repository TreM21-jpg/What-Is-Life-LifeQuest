# Game Features Summary: Monthly Events, Updates & Age-Gated Stages

## Overview
Three major systems have been added to engage players and support the game's long-term vision:

1. **Monthly Event System** — Seasonal events that rotate throughout the year
2. **Bi-Weekly Update & Feedback System** — Regular content updates and player engagement
3. **Age-Gated Stage Progression** — Age-appropriate content tailored to player maturity level

---

## 1. Monthly Event System

### How It Works
- **12 Seasonal Events** — One for each month, automatically rotating
- **Event Rewards** — XP multipliers, coins, cosmetics, special quest bonuses
- **Active Period** — Events refresh at the start of each month

### Monthly Events

| Month | Event Name | Theme | Key Rewards | Icon |
|-------|-----------|-------|------------|------|
| January | New Year's Quest | renewal | 2x XP, 500 coins | 🎆 |
| February | Love's Challenge | compassion | heart tokens, 400 coins | ❤️ |
| March | Spring Awakening | growth | 1.5x skill XP, 450 coins | 🌱 |
| April | Fool's Gold | trickery | 600 coins, riddle passes | 🃏 |
| May | Harvest Moon | abundance | rare item boost, 500 coins | 🌾 |
| June | Summer Festival | celebration | 700 coins, cosmetics | 🎉 |
| July | Dragon's Ascent | power | 800 coins, power boost | 🐉 |
| August | Twilight's Mystery | mystery | 550 coins, lore unlocks | 🌙 |
| September | Autumn Trials | endurance | 600 coins, endurance boost | 🍂 |
| October | Spooky Spirits | Halloween | 650 coins, creepy cosmetics | 👻 |
| November | Gratitude's Bounty | gratitude | 700 coins, team multipliers | 🦃 |
| December | Winter's Gift | winter | 900 coins, holiday cosmetics | 🎄 |

### Backend Integration
**File:** `backend/eventSystem.js`

Key functions:
- `getCurrentEvent()` — Get the active event for this month
- `getUpcomingEvents()` — Show next 3 months of events
- `applyEventRewards(player, event)` — Add event rewards to player
- `refreshEventStatus(player)` — Auto-refresh expired events

### Frontend Usage
Import and display using the `EventsAndUpdatesOverlay` component:
```jsx
import EventsAndUpdatesOverlay from '@/components/EventsAndUpdatesOverlay';

<EventsAndUpdatesOverlay
  isOpen={showEvents}
  onClose={() => setShowEvents(false)}
  playerAge={playerAge}
  currentEvent={currentEvent}
  onSubmitFeedback={handleFeedback}
/>
```

---

## 2. Bi-Weekly Update & Feedback System

### How It Works
- **Regular Updates** — New features/bug fixes released every 2-3 weeks
- **Player Feedback** — Players can submit bugs, suggestions, complaints, or praise
- **Team Tracking** — All feedback is logged and categorized by severity
- **Public Roadmap** — Show players upcoming updates and current issues being worked on

### Feedback Types

| Type | Use Case | Severity Options |
|------|----------|------------------|
| 🐛 Bug Report | Game issues/crashes | Low, Medium, High, Critical |
| 💡 Suggestion | Feature requests | N/A |
| 😞 Complaint | Player frustration | Low, Medium, High |
| 😊 Praise | Positive feedback | N/A |

### Backend Integration
**File:** `backend/updateSystem.js`

Key functions:
- `submitFeedback(sessionId, type, title, description, severity)` — Record player feedback
- `getFeedbackStats()` — Get feedback statistics
- `getCriticalIssues()` — Find critical bugs needing urgent attention
- `updateFeedbackStatus(feedbackId, status, note)` — Mark issues as "fixing", "resolved", etc.
- `addUpdate(version, title, changes, bugFixes)` — Log a new update
- `getNextUpdateDate()` — Calculate when next update is due (2-3 weeks from last)

### Update Cycle Example
```
Version 1.1.0 (Jan 8) → Version 1.2.0 (Jan 22) → Version 1.3.0 (Feb 5)
          14 days               14 days              ~14 days
```

### Frontend Usage
Players see:
- **Latest updates** with bug fixes and new features
- **Release dates** and version numbers
- **Feedback form** to submit issues or suggestions
- **Feedback stats** showing how many issues have been addressed

---

## 3. Age-Gated Stage Progression

### Overview
The game automatically adjusts story content based on player age. Players progress through stages designed specifically for their age bracket.

### Age Brackets & Stages

#### 🎀 **Littles (Ages 4-6)**
- **Forest of Beginnings** (Difficulty 1)
  - Theme: gentle
  - Content: Meet friendly characters, collect items, introductory story
  - Duration: 10-15 min
  - Rating: G

#### 🟦 **Elementary (Ages 7-9)**
- **Forest of Beginnings** (Difficulty 1) — Discovery theme
- **Mountain of Trials** (Difficulty 2) — Challenge theme
- Content: Basic combat, puzzles, quest completion
- Durations: 20-45 min per stage
- Rating: G / PG

#### 🟩 **Middle School (Ages 10-12)**
- **Forest of Discovery** (Difficulty 2) — Growth theme
- **Mountain of Trials** (Difficulty 3) — Perseverance theme
- **The Abyss** (Difficulty 4) — Courage theme
- Content: Faction quests, boss battles, deeper lore
- Durations: 30-90 min per stage
- Rating: PG / PG-13

#### 🟨 **High School (Ages 13-17)**
- **The Crossroads** (Difficulty 3) — Choice/path selection theme
- **Mountain of Trials** (Difficulty 4) — Mastery theme
- **The Abyss** (Difficulty 5) — Reflection theme
- **Sanctuary of Truth** (Difficulty 6) — Wisdom/enlightenment theme
- Content: Philosophy, complex choices, multiple endings, skill specialization
- Durations: 45-150 min per stage
- Rating: PG-13

#### 🟪 **Adult (Ages 18+)**
- **The Crossroads Revisited** (Difficulty 4) — Reflection/mentorship
- **The Abyss Deep** (Difficulty 5) — Philosophical depth
- **Sanctuary of Truth - Ultimate** (Difficulty 6) — New Game+ content
- Content: Transcendence, mentoring younger players, unlocking secret lore
- Durations: 60-200 min per stage
- Rating: R

### Progression Rules
- **Linear Progression** — Complete stages in order (must finish previous stage to unlock next)
- **One First Stage Access** — Players always have access to the first stage
- **Difficulty Scaling** — Stages increase in difficulty and complexity with age
- **Content Rating** — Each stage is marked with appropriate content rating (G, PG, PG-13, R)

### Backend Integration
**File:** `backend/ageGatedStages.js`

Key functions:
- `getAgeBracket(playerAge)` — Determine which age bracket a player belongs to
- `getAccessibleStages(playerAge)` — Get all stages available to this age group
- `canAccessStage(playerAge, stageId, playerProgress)` — Check if stage is unlocked
- `getRecommendedStage(playerAge, playerLevel)` — Suggest next stage based on player level
- `getAllBrackets()` — Get all age brackets (for admin dashboard)

### Frontend Usage
```jsx
import AgeGatedStagesOverlay from '@/components/AgeGatedStagesOverlay';

<AgeGatedStagesOverlay
  isOpen={showStages}
  onClose={() => setShowStages(false)}
  playerAge={playerAge}
  completedStages={playerCompletedStages}
  onSelectStage={handleStageSelection}
/>
```

### UI Features
- **Stage Cards** — Visual display of each stage with difficulty stars
- **Lock Indicators** — Shows which stages are locked and why
- **Completion Badges** — ✓ marks on completed stages
- **Progress Bar** — Shows completion percentage for current age bracket
- **Duration Estimates** — Help players plan their play sessions
- **Theme Descriptions** — Explain the core theme of each stage

---

## Integration Checklist

### Backend Setup
- [ ] Import systems in `backend/server-enhanced.js`
- [ ] Add API routes for:
  - GET `/api/events/current` — Get current event
  - GET `/api/events/upcoming` — Get upcoming events
  - POST `/api/feedback` — Submit feedback
  - GET `/api/updates` — Get update history
  - GET `/api/stages?age=<age>` — Get stages for age bracket

### Frontend Setup
- [ ] Import `EventsAndUpdatesOverlay` component in main game UI
- [ ] Import `AgeGatedStagesOverlay` component in stage selection screen
- [ ] Add buttons/menu items to open overlays
- [ ] Connect player age from player profile/settings
- [ ] Store completed stages in player progress

### Database Collections (MongoDB)
- [ ] `playerFeedback` — Store feedback submissions
- [ ] `gameUpdates` — Track update history
- [ ] `playerProgress` — Track completed stages per player

### Environment Variables (if needed)
```
# Optional: Update notification email
UPDATE_NOTIFICATION_EMAIL=admin@lifequest.com

# Event cycle configuration
EVENT_CYCLE_ENABLED=true
```

---

## Player Experience Flow

### New Player (Age 8, Elementary)
1. Creates account, selects age 8
2. Sees "Elementary (Ages 7-9)" bracket
3. Has access to:
   - **Stage 1: Forest of Beginnings** (Difficulty 1) ✅ Unlocked
   - **Stage 2: Mountain of Trials** (Difficulty 2) 🔒 Locked
4. Completes Stage 1
5. Now sees Stage 2 as unlocked
6. Can view current event (e.g., "Spring Awakening" in March)
7. Sees upcoming events in preview

### Returning Player (Age 11, Middle School)
1. Logs in, bracket updated to "Middle School (Ages 10-12)"
2. Sees new stages unlocked from progression to their age
3. New event active (different from last month)
4. Can submit feedback on any issues encountered
5. Sees latest updates and bug fixes from development team

### Adult Player (Age 25)
1. Logs in, access to all adult-tier stages
2. Can mentor younger players (age 10-12) through cooperative challenges
3. Sees New Game+ option after finishing all main content
4. Can replay stages at higher difficulty for prestige rewards
5. Access to secret lore entries not available to younger players

---

## Engagement & Retention

### Monthly Events
- Keep game feeling fresh with rotating rewards
- Encourage return visits each month
- Provide collectible cosmetics across year

### Bi-Weekly Updates
- Show players that game is actively developed
- Address critical issues quickly
- Build community through feedback loop

### Age-Gated Progression
- Players feel the game "grows up" with them
- Appropriate challenge and content at all ages
- Clear progression path motivates continued play
- Unlock new content as they age (within or outside the game)

---

## Testing & Validation

### Manual Testing Checklist
- [ ] Test event system with different current dates
- [ ] Submit feedback of each type and severity
- [ ] Test stage unlocking with various player ages
- [ ] Verify progress bar calculations
- [ ] Test mobile responsiveness of overlays

### QA Focus Areas
1. **Event Rewards** — Ensure multipliers apply correctly to XP/coins
2. **Feedback Submission** — Verify all fields save to database
3. **Stage Progression** — Test unlock logic with various age/progress combinations
4. **UI Responsiveness** — Overlays should work on all screen sizes

---

## Future Enhancements

### Phase 2 Features
- **Event Leaderboards** — Compete during monthly events for rankings
- **Player Mentorship Program** — Experienced players help newer ones
- **Custom Events** — Admin ability to create limited-time events
- **Feedback Dashboard** — Show community what's being worked on
- **Age Milestone Events** — Special rewards when player ages up in real life

### Phase 3 Features
- **Seasonal Passes** — Time-limited cosmetics and story chapters
- **Community Voting** — Let players vote on next month's event theme
- **Live Events** — Real-time global challenges during specific times
- **Cross-Age Cooperation** — Older players help younger ones in story

---

## Files Added/Modified

### New Files
- `backend/eventSystem.js` — Event data and logic
- `backend/updateSystem.js` — Updates and feedback tracking
- `backend/ageGatedStages.js` — Age-gated stage system
- `src/components/EventsAndUpdatesOverlay.jsx` — Event/update UI
- `src/components/EventsAndUpdatesOverlay.css` — Event/update styles
- `src/components/AgeGatedStagesOverlay.jsx` — Stage selection UI
- `src/components/AgeGatedStagesOverlay.css` — Stage selection styles

### Ready for Integration
All systems are production-ready and can be integrated into the main game immediately.

---

## Support & Questions
Refer to each system file for detailed JSDoc comments and usage examples.
