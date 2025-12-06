import React, { useEffect } from "react";

export default function ZoneUnlocker({ playerInfo, lockedZones, setLockedZones }) {
  useEffect(() => {
    let newLocked = [...lockedZones];

    // Elementary progression
    if (playerInfo.completedQuests.includes("HomeworkFound") &&
        playerInfo.completedQuests.includes("BullyDefeated")) {
      newLocked = newLocked.filter(zone => zone !== "Park");
    }

    // Middle progression
    if (playerInfo.completedQuests.includes("EmpathyGiven") &&
        playerInfo.completedQuests.includes("MindfulnessWin")) {
      newLocked = newLocked.filter(zone => zone !== "Home");
    }

    // High/Adult progression
    if (playerInfo.completedQuests.includes("ExamPassed") ||
        playerInfo.completedQuests.includes("MentorSupport")) {
      newLocked = newLocked.filter(zone => zone !== "Battle");
    }

    // Update locked zones if changed
    if (JSON.stringify(newLocked) !== JSON.stringify(lockedZones)) {
      setLockedZones(newLocked);
    }
  }, [playerInfo.completedQuests, lockedZones, setLockedZones]);

  return null; // invisible manager
}
