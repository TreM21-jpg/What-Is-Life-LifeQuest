// MiddleSchoolStage.js
import React from "react";
import QuestTracker from "./QuestTracker";
import { generateLifeMirrorChoices } from "./lifeMirror";
import { useProgress } from "./useProgress";

export default function MiddleSchoolStage() {
  const {
    xp,
    setXp,
    inventory,
    setInventory,
    selectedPath,
    setSelectedPath,
  } = useProgress("MiddleSchool");

  const quests = [
    {
      id: "friendshipBridge",
      title: "Build the Friendship Bridge",
      description: "Team up with another player to build a bridge.",
      xp: 100,
      item: "Bridge Token",
      completed: false,
    },
    {
      id: "emotionMaze",
      title: "Navigate the Emotion Maze",
      description: "Use emotional clues to find your way.",
      xp: 150,
      item: "Emotion Compass",
      completed: false,
    },
  ];

  const handleQuestComplete = (questId) => {
    const quest = quests.find((q) => q.id === questId);
    if (quest && !quest.completed) {
      setXp((prev) => prev + quest.xp);
      setInventory((prev) => [...prev, quest.item]);
      quest.completed = true;
    }
  };

  const lifeChoices = generateLifeMirrorChoices("MiddleSchool");

  return (
    <div className="stage">
      <h2>⚡ Middle School Stage</h2>
      <p><strong>XP:</strong> {xp}</p>
      <p><strong>Inventory:</strong> {inventory.join(", ") || "Empty"}</p>

      <QuestTracker initialQuests={quests} onComplete={handleQuestComplete} />

      <div className="life-mirror">
        <h3>🪞 Life Mirror Choices</h3>
        {lifeChoices.map((choice) => (
          <div key={choice.id}>
            <strong>{choice.title}</strong>
            <p>{choice.impact}</p>
            <button onClick={() => setSelectedPath(choice.title)}>Choose Path</button>
          </div>
        ))}
        {selectedPath && <p>You chose: <strong>{selectedPath}</strong></p>}
      </div>
    </div>
  );
}
