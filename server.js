import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";
import { connectUser } from "./utils/connectUser.js";
import { searchData } from "./utils/Room.js";
import dotenv from "dotenv"
dotenv.config()

const dev = process.env.NODE_ENV !== "production";
const hostname = process.env.HOSTNAME
const port = process.env.PORT;
var arr = [];
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer);
  //server connection and event listners
  io.on("connection", (socket) => {
    console.log("new socket joined" + socket.id);
    socket.on("move", (data) => {
      console.log(data);
      socket.to(data.room).emit("movereceive", data.index);
    });

    socket.on("join", () => {
      arr.push(socket.id);
      console.log(arr);
    });

    socket.on("disconnect", () => {
      const index = arr.indexOf(socket.id);

      // If the element is found, remove it
      if (index !== -1) {
        arr.splice(index, 1);
      }
      searchData(socket.id, io);
      console.log("disconnected " + socket.id);
    });
  });
  //function for random matchmaking
  setInterval(() => {
    let n = arr.length;
    console.log("n=" + n);
    if (n != 0 && n % 2 == 0) {
      let temparr = arr.slice(0, n);
      arr.splice(0, n);
      connectUser(temparr, io);
    } else if (n - 1 != 0) {
      let temparr = arr.slice(0, n - 1);
      arr.splice(0, n - 1);
      connectUser(temparr, io);
    }
  }, 1000);

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
