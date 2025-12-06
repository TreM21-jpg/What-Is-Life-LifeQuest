// Hub.js
import React, { useState } from "react";
import Avatar3D from "./Avatar3D";
import AIChatAnimated from "./AIChatAnimated";
import MultiplayerHub from "./MultiplayerHub";
import ElementaryStage from "./ElementaryStage";
import MiddleSchoolStage from "./MiddleSchoolStage";
import HighSchoolStage from "./HighSchoolStage";
import DailyInspiration from "./DailyInspiration.jsx";
import { useProgress } from "./useProgress";
import "./App.css";

export default function Hub() {
  const [stage, setStage] = useState("Elementary");
  const { xp } = useProgress(stage);

  const renderStage = () => {
    switch (stage) {
      case "Elementary":
        return <ElementaryStage />;
      case "MiddleSchool":
        return <MiddleSchoolStage />;
      case "HighSchool":
        return <HighSchoolStage />;
      default:
        return null;
    }
  };

  return (
    <div className="hub">
      <h1>🌍 LifeQuest Hub</h1>
      <select onChange={(e) => setStage(e.target.value)} value={stage}>
        <option value="Elementary">Elementary</option>
        <option value="MiddleSchool">Middle School</option>
        <option value="HighSchool">High School / Adult</option>
      </select>

      {/* Daily Inspiration */}
      <DailyInspiration />

      <Avatar3D stage={stage} xp={xp} />
      {renderStage()}
      <AIChatAnimated playerStage={stage} />
      <MultiplayerHub stage={stage} />
    </div>
  );
}
