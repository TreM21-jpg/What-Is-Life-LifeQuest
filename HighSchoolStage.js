// HighSchoolStage.js
import React from "react";
import QuestTracker from "./QuestTracker";
import { generateLifeMirrorChoices } from "./lifeMirror";
import { useProgress } from "./useProgress";

export default function HighSchoolStage() {
  const {
    xp,
    setXp,
    inventory,
    setInventory,
    selectedPath,
    setSelectedPath,
  } = useProgress("HighSchool");

  const quests = [
    {
      id: "careerPath",
      title: "Choose Your Career Path",
      description: "Explore roles and choose your future.",
      xp: 200,
      item: "Career Badge",
      completed: false,
    },
    {
      id: "lifeMirror",
      title: "Face the Life Mirror",
      description: "Make a choice that shapes your avatar’s future.",
      xp: 250,
      item: "Mirror Token",
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

  const lifeChoices = generateLifeMirrorChoices("HighSchool");

  return (
    <div className="stage">
      <h2>🔥 High School / Adult Stage</h2>
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
