// useProgress.js
import { useEffect, useState } from "react";

export function useProgress(stage) {
  const key = `lifequest-${stage}`;
  const [xp, setXp] = useState(0);
  const [inventory, setInventory] = useState([]);
  const [selectedPath, setSelectedPath] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved) {
      setXp(saved.xp || 0);
      setInventory(saved.inventory || []);
      setSelectedPath(saved.selectedPath || null);
    }
  }, [key]);

  useEffect(() => {
    localStorage.setItem(
      key,
      JSON.stringify({ xp, inventory, selectedPath })
    );
  }, [xp, inventory, selectedPath, key]);

  return { xp, setXp, inventory, setInventory, selectedPath, setSelectedPath };
}
