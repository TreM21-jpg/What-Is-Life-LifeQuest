// lifeMirror.js

export function generateLifeMirrorChoices(stage) {
  if (stage === "HighSchool") {
    return [
      {
        id: "mentorPath",
        title: "Become a Mentor",
        impact: "Unlock Legacy XP and mentor younger players.",
      },
      {
        id: "creatorPath",
        title: "Pursue Creativity",
        impact: "Unlock design tools and build your own quests.",
      },
      {
        id: "healerPath",
        title: "Support Others",
        impact: "Gain empathy emotes and emotional quests.",
      },
    ];
  }

  if (stage === "MiddleSchool") {
    return [
      {
        id: "explorerPath",
        title: "Explore New Interests",
        impact: "Unlock new hobbies and curiosity-based quests.",
      },
      {
        id: "connectorPath",
        title: "Build Friendships",
        impact: "Gain social XP and unlock team-based missions.",
      },
    ];
  }

  if (stage === "Elementary") {
    return [
      {
        id: "helperPath",
        title: "Be a Helper",
        impact: "Earn kindness points and unlock team-building games.",
      },
      {
        id: "dreamerPath",
        title: "Be a Dreamer",
        impact: "Unlock imagination-based quests and creative tools.",
      },
    ];
  }

  return [];
}
