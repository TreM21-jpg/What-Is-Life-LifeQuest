import React, { createContext, useContext, useState } from "react";

const PlayerHealthContext = createContext(null);

export function PlayerHealthProvider({ children }) {
  const [health, setHealth] = useState(100);
  const [maxHealth, setMaxHealth] = useState(100);

  const damage = (amount) => setHealth((h) => Math.max(0, h - amount));
  const heal = (amount) => setHealth((h) => Math.min(maxHealth, h + amount));

  return (
    <PlayerHealthContext.Provider value={{ health, maxHealth, damage, heal }}>
      {children}
    </PlayerHealthContext.Provider>
  );
}

export const usePlayerHealth = () => useContext(PlayerHealthContext);
