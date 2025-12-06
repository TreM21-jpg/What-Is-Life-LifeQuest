import React from "react";
import AIChatButton from "./AIChatButton";

export default function UIOverlay3D() {
  return (
    <div className="absolute top-4 left-4 space-y-3 z-50">
      <h1 className="text-2xl font-bold">🌍 LifeQuest 3D Hub</h1>
      <AIChatButton />
      <button className="bg-green-500 px-4 py-2 rounded-lg hover:bg-green-600 transition">
        Enter Stage
      </button>
      <button className="bg-purple-500 px-4 py-2 rounded-lg hover:bg-purple-600 transition">
        Multiplayer Lobby
      </button>
    </div>
  );
}
