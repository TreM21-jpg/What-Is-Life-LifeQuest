import React from "react";

export default function Logo() {
  return (
    <div className="flex flex-col items-center mb-6">
      <img
        src="https://i.imgur.com/BKfpYwG.png"
        alt="LifeQuest Tree Logo"
        className="w-32 h-32 object-contain mb-2"
      />
      <h1 className="text-3xl font-bold text-blue-600 tracking-widest">LifeQuest</h1>
    </div>
  );
}
