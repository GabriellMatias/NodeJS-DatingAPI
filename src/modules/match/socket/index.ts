import { EMessageStatus, MessageMatch } from "@models/match";
import { io } from "@shared/infra/http/app";
import { container } from "tsyringe";
import { MatchUseCase } from "../useCases/match/MatchUseCase";

interface IRoomUser {
  socket_id: string;
  username: string;
  room: string;
}

const users: IRoomUser[] = [];


io.on("connection", (socket) => {
  console.log("***Connection Match ***");
  console.log("Socket connected:", socket.id);

  socket.on("match", (data) => {
    console.log("***match***");
    console.log(data);
  });

  // socket.on("message", ({ room, text, username }) => {
  //   console.log("***message***");
  //   console.log(text);
  //   // Salvar mensagens
  //   const message: MessageMatch = {
  //     room,
  //     text,
  //     username,
  //     createdAt: new Date(),
  //     status: EMessageStatus.prepare,
  //   };
  //   console.log("***ADD MSG ${message.text}***");

  //   // Enviar para os usuarios da sala especifica
  //   io.to(room).emit("message", true);
  // });

  socket.on("send_match", async ({user_id, liked}, callback)=> {
    console.log("***send_match***");
    console.log({user_id, liked});

    try {
      const matchController = container.resolve(MatchUseCase);
      const match = await matchController.execute({
        user_id,
        liked
      });
      callback({
        ok: true,
        match,
      })
    } catch (error) {
      console.log(error)
      callback({
        ok: false,
        error: "Faild to match"
      })
    }
  })

  socket.on("disconnect", async () => {
    console.log("[CHAT] Socket disconnected:", socket.id);
    const index = users.findIndex((user) => user.socket_id === socket.id);
    if (index !== -1) {
      users.splice(index, 1)[0];
    }
  });
});
