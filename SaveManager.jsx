import React, { useEffect } from "react";

export default function SaveManager({ playerInfo, setPlayerInfo }) {
  // Load saved data on mount
  useEffect(() => {
    const saved = localStorage.getItem("lifequest_save");
    if (saved) {
      try {
        const data = JSON.parse(saved);
        setPlayerInfo(data);
      } catch (err) {
        console.error("Error parsing save data:", err);
      }
    }
  }, [setPlayerInfo]);

  // Save whenever playerInfo changes
  useEffect(() => {
    localStorage.setItem("lifequest_save", JSON.stringify(playerInfo));
  }, [playerInfo]);

  return null; // invisible manager
}
