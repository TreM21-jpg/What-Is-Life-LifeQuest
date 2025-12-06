// quest.js
const questData = [
  /* ---------------- Elementary Stage ---------------- */
  {
    id: "lost_homework",
    stage: "Elementary",
    npc: "Classmate",
    zone: "School",
    dialogue: [
      {
        text: "I lost my homework scrolls! Can you help me find them?",
        choices: [
          { text: "Sure, I’ll help.", effect: { xp: 20, quest: "HomeworkFound" } },
          { text: "Sorry, I’m busy.", effect: { xp: 0 } }
        ]
      }
    ]
  },
  {
    id: "playground_bully",
    stage: "Elementary",
    npc: "Bully",
    zone: "Playground",
    dialogue: [
      {
        text: "You can’t play here unless you beat me in a challenge!",
        choices: [
          { text: "Stand up to the bully.", effect: { xp: 50, quest: "BullyDefeated" } },
          { text: "Walk away quietly.", effect: { xp: 10 } }
        ]
      }
    ]
  },

  /* ---------------- Middle Stage ---------------- */
  {
    id: "mirror_emotions",
    stage: "Middle",
    npc: "Friend",
    zone: "Park",
    dialogue: [
      {
        text: "I feel overwhelmed with emotions. Can you listen?",
        choices: [
          { text: "Yes, I’ll listen.", effect: { xp: 40, quest: "EmpathyGiven" } },
          { text: "Not right now.", effect: { xp: 0 } }
        ]
      }
    ]
  },
  {
    id: "shadow_doubt",
    stage: "Middle",
    npc: "Shadow of Doubt",
    zone: "Battle",
    dialogue: [
      {
        text: "You’ll never succeed. Do you believe in yourself?",
        choices: [
          { text: "I believe in myself!", effect: { xp: 80, quest: "MindfulnessWin" } },
          { text: "Maybe you’re right...", effect: { xp: 0 } }
        ]
      }
    ]
  },

  /* ---------------- High/Adult Stage ---------------- */
  {
    id: "exam_dragon",
    stage: "High/Adult",
    npc: "Exam Dragon",
    zone: "Battle",
    dialogue: [
      {
        text: "Face me if you are ready for the ultimate test!",
        choices: [
          { text: "Fight bravely.", effect: { xp: 150, quest: "ExamPassed" } },
          { text: "Run away.", effect: { xp: 0 } }
        ]
      }
    ]
  },
  {
    id: "mentor_support",
    stage: "High/Adult",
    npc: "Mentor",
    zone: "Home",
    dialogue: [
      {
        text: "I can guide you toward your future. Do you accept?",
        choices: [
          { text: "Yes, I’d love your support.", effect: { xp: 100, quest: "MentorSupport" } },
          { text: "No thanks, I’ll go alone.", effect: { xp: 20 } }
        ]
      }
    ]
  }
];

export default questData;
