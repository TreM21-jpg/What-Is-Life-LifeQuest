import { useEffect } from "react";

export default function SaveManager({ playerInfo, setPlayerInfo }) {
  useEffect(() => {
    const saved = localStorage.getItem(playerInfo.email);
    if (saved) {
      setPlayerInfo(JSON.parse(saved));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(playerInfo.email, JSON.stringify(playerInfo));
  }, [playerInfo]);

  return null;
}
