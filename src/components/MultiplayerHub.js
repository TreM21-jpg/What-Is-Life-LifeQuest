// MultiplayerHub.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io();

export default function MultiplayerHub({ stage }) {
  const [room, setRoom] = useState("");
  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    socket.on("newMessage", (data) => {
      setChat((prev) => [...prev, data]);
    });
  }, []);

  const joinRoom = () => {
    socket.emit("joinRoom", room);
  };

  const sendMessage = () => {
    socket.emit("chatMessage", { room, message });
    setMessage("");
  };

  return (
    <div className="multiplayer">
      <input
        placeholder="Room name"
        value={room}
        onChange={(e) => setRoom(e.target.value)}
      />
      <button onClick={joinRoom}>Join Room</button>
      <div className="chat-log">
        {chat.map((msg, i) => (
          <div key={i}>
            <strong>{msg.sender}:</strong> {msg.message}
          </div>
        ))}
      </div>
      <input
        placeholder="Type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && sendMessage()}
      />
    </div>
  );
}
