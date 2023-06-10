import { EMessageStatus, MessageMatch } from "@models/match";
import { io } from "@shared/infra/http/app";
import { container } from "tsyringe";
import { SaveChatUseCase } from "../chat/SaveMatchUseCase";

interface IRoomUser {
  socket_id: string;
  username: string;
  room: string;
}

const users: IRoomUser[] = [];

const saveMessagesRoom = async (room: string, msg: MessageMatch) => {
  if (msg.status == EMessageStatus.prepare) {
    msg.status = EMessageStatus.sent;
    const matchController = container.resolve(SaveChatUseCase);
    await matchController.execute(room, msg);
  }
};

io.on("connection", (socket) => {
  console.log("***Connection Chat***");
  console.log("Socket connected:", socket.id);

  socket.on("select_room", (data) => {
    console.log("***select_room***");
    console.log(data);
    // Colocar o usuario em alguma sala em especifica na conexão de socket
    socket.join(data.room);

    const userInRoom = users.find(
      (user) => user.username === data.username && user.room === data.room
    );

    if (userInRoom) {
      userInRoom.socket_id = socket.id;
    } else {
      users.push({
        room: data.room,
        username: data.username,
        socket_id: socket.id,
      });
    }
  });

  socket.on("message", ({ room, text, username }) => {
    console.log("***message***");
    console.log(text);
    // Salvar mensagens
    const message: MessageMatch = {
      room,
      text,
      username,
      createdAt: new Date(),
      status: EMessageStatus.prepare,
    };
    console.log("***ADD MSG ${message.text}***");
    saveMessagesRoom(room, message);

    // Enviar para os usuarios da sala especifica
    io.to(room).emit("message", true);
  });

  socket.on("disconnect", async () => {
    console.log("[CHAT] Socket disconnected:", socket.id);
    const index = users.findIndex((user) => user.socket_id === socket.id);
    if (index !== -1) {
      users.splice(index, 1)[0];
    }
  });
});
