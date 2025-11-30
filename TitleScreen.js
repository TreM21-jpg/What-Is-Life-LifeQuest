// TitleScreen.js
import React from "react";
import "./TitleScreen.css";

export default function TitleScreen({ onStart }) {
  return (
    <div className="title-screen">
      <div className="logo">
        <h1>🌳 LifeQuest</h1>
        <p className="subtitle">The Interactive Life RPG</p>
      </div>
      <button className="start-button" onClick={onStart}>Start Your Journey</button>
    </div>
  );
}
