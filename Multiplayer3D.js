import React, { useEffect } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:4000");

export default function Multiplayer3D() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("✅ Connected to multiplayer server");
    });

    return () => socket.disconnect();
  }, []);

  return null;
}
