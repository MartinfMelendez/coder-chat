import userManager from "../data/fs/UserManager.fs.js";
import productManager from "../data/fs/ProductManager.fs.js";
import { socketServer } from "../../server.js";

let messages = [];

export default async (socket) => {
  console.log("Client id: " + socket.id);
  socket.emit("users", await userManager.read());
  socket.on("register", async (data) => {
    await userManager.create(data);
  });

  socket.emit("products", await productManager.read());
  socket.on("registerProduct", async (data) => {
    await productManager.create(data);
  });
  socket.on("nickname", async (nick) => {
    messages.push(
      `<p class="py-1 px-3"><span class="fw-bolder">${nick}:</span> is online</p>`
    );
    socketServer.emit("messages", messages);
  });
  socket.on("all messeges", (allMessages) => {
    messages = allMessages;
    socketServer.emit("messages", messages);
  });
};
