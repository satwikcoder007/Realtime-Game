import { setData } from "./Room.js";
const connectUser = (arr,io)=>{
    while(arr.length!=0){
        const firstIndex = Math.floor(Math.random() * arr.length);
        const firstElement = arr[firstIndex];
        arr.splice(firstIndex, 1);
        const secondIndex = Math.floor(Math.random() * arr.length);
        const secondElement = arr[secondIndex];
        arr.splice(secondIndex, 1);

        const socket1 = io.sockets.sockets.get(firstElement);
        const socket2 = io.sockets.sockets.get(secondElement);
        if(socket1 && socket2){
          const groupName = firstElement+secondElement+100;
          socket1.join(groupName);
          socket2.join(groupName);
          io.to(firstElement).emit("roomJoined",{room:groupName,move:'O',turn:1});
          io.to(secondElement).emit("roomJoined",{room:groupName,move:'X',turn:0});
          setData(firstElement,groupName);
          setData(secondElement,groupName);
        }
        else{
          const socket = socket1||socket2;
          arr.push(socket.id);
        }
    }
    console.log("returning");
}

const joinUser = (room,io,socket)=>{
  const roomSockets = io.sockets.adapter.rooms.get(room);
  if(roomSockets){
    const socketIds = Array.from(roomSockets);
    if(socketIds.length!==1){
      io.to(socket.id).emit("roomFilled");
      return;
    }
    console.log("joining");
    socket.join(room);
    setData(socket.id,room);
    io.to(socketIds[0]).emit("roomJoined",{room:room,move:'O',turn:1});
    io.to(socket.id).emit("roomJoined",{room:room,move:'X',turn:0});
  }
}
export {connectUser,joinUser};