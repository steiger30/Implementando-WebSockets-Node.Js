import { io } from "./http.js";

const users = [];
const messages = [];

io.on("connection", (socket) => {
  socket.on("select_room", (data, callback) => {
    socket.join(data.room);

    users.push({
      username: data.username,
      socket_id: socket.id,
    });
  });

  socket.on("message", (data) => {
    const message = {
      username: data.username,
      text: data.message,
      createAt: new Date(),
    };
    messages.push(message);
    io.emit("message", message);
  });
});

function getMessagesRoom(room) {
  const messagesRoom = messages.filter((message) => message.room === room);
  return messagesRoom;
}
