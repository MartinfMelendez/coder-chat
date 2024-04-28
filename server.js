import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import morgan from "morgan";
import { engine } from "express-handlebars";


import indexRouter from "./src/routers/index.router.js";
import socketCb from "./src/routers/index.socket.js"
import errorHandler from "./src/middleware/errorHandler.js";
import pathHandler from "./src/middleware/pathHandler.js";
import __dirname from "./utils.js";

const server = express();
const port = 8080;
const nodeServer = createServer(server);
const socketServer = new Server(nodeServer);

const ready = () => console.log("Server ready on por " + port);
socketServer.on("connection", socketCb);
nodeServer.listen(port, ready);
export {socketServer}

server.engine("handlebars", engine());
server.set("view engine", "handlebars");
server.set("views", __dirname + "/src/views"); //revisar ruta de acceso

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(express.static("public"))
server.use(morgan("dev"));

server.use("/", indexRouter);
server.use(errorHandler);
server.use(pathHandler);
