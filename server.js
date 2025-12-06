// server.js
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("joinRoom", (room) => {
    socket.join(room);
    io.to(room).emit("playerJoined", socket.id);
  });

  socket.on("chatMessage", ({ room, message }) => {
    io.to(room).emit("newMessage", { sender: socket.id, message });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

app.post("/api/chat", async (req, res) => {
  const { message, stage } = req.body;
  // Replace with OpenAI or custom NLP logic
  res.json({
    reply: `You're in the ${stage} stage. Here's a thought: Growth begins with curiosity.`,
  });
});

server.listen(3001, () => console.log("Server running on port 3001"));
