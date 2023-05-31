import { MessageMatch } from "@models/match";
import { SaveMatchUseCase } from "@modules/match/useCases/save/SaveMatchUseCase";
import { io } from "@shared/infra/http/app";
import { container } from "tsyringe";

interface IRoomUser {
  socket_id: string;
  username: string;
  room: string;
}

const users: IRoomUser[] = [];

const messages: MessageMatch[] = [];

const getMessagesRoom = (room: string) => {
  const messagesRoom = messages.filter((message) => message.room === room);

  return messagesRoom;
};

io.on("connection", (socket) => {
  console.log("***Connection***");
  console.log('Socket connected:', socket.id);
  
  
  socket.on("select_room", (data, callback) => {
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

    const messagesRoom = getMessagesRoom(data.room);

    callback(messagesRoom);
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
    };

    messages.push(message);

    // Enviar para os usuarios da sala especifica
    io.to(room).emit("message", message);
  });

  socket.on("disconnect", async () => {
    console.log("***Disconnect***");
    console.log('Socket disconnected:', socket.id);
    // Remova o usuário da lista de usuários quando eles se desconectarem
    const index = users.findIndex((user) => user.socket_id === socket.id);
    if (index !== -1) {
      const disconnectedUser = users.splice(index, 1)[0];
      //console.log('Disconnected user:', disconnectedUser);
      const mensagemRoom = getMessagesRoom(disconnectedUser.room);

      //console.log('Mensagens:\n',mensagemRoom);
      if(mensagemRoom.length > 0) {
        const matchController = container.resolve(SaveMatchUseCase);

        await matchController.execute(disconnectedUser.room, mensagemRoom);
      }
    }
  });
});
