// ElementaryStage.js
import React from "react";
import QuestTracker from "./QuestTracker";
import { generateLifeMirrorChoices } from "./lifeMirror";
import { useProgress } from "./useProgress";

export default function ElementaryStage() {
  const {
    xp,
    setXp,
    inventory,
    setInventory,
    selectedPath,
    setSelectedPath,
  } = useProgress("Elementary");

  const quests = [
    {
      id: "helpFriend",
      title: "Help a Friend",
      description: "Find someone in need and offer help.",
      xp: 50,
      item: "Kindness Badge",
      completed: false,
    },
    {
      id: "natureWalk",
      title: "Nature Walk",
      description: "Explore the forest and collect 3 glowing leaves.",
      xp: 75,
      item: "Leaf Token",
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

  const lifeChoices = generateLifeMirrorChoices("Elementary");

  return (
    <div className="stage">
      <h2>🌱 Elementary Stage</h2>
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
