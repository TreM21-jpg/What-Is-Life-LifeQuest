import React, { useEffect } from "react";

export default function AutoSave({ playerInfo, inventory, lockedZones }) {
  useEffect(() => {
    const data = { playerInfo, inventory, lockedZones, timestamp: Date.now() };
    localStorage.setItem("lifequest_autos