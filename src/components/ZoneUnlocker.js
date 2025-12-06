import { useEffect } from "react";

export default function ZoneUnlocker({ playerInfo, lockedZones, setLockedZones }) {
  useEffect(() => {
    const unlocks = {
      Park: 100,
      Home: 50
    };

    Object.entries(unlocks).forEach(([zone, xpNeeded]) => {
      if (playerInfo.xp >= xpNeeded && lockedZones.includes(zone)) {
        setLockedZones((prev) => prev.filter((z) => z !== zone));
      }
    });
  }, [playerInfo.xp, lockedZones, setLockedZones]);

  return null;
}
