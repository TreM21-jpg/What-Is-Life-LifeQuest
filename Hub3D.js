import React from "react";
import GameScene from "./GameScene";
import UIOverlay3D from "./UIOverlay3D";

export default function Hub3D() {
  return (
    <div className="w-full h-screen bg-gray-900 text-white relative overflow-hidden">
      <GameScene />
      <UIOverlay3D />
    </div>
  );
}
