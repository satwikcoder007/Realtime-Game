export const hashmap = new Map();

export const searchData = (id,io)=>{
    if(hashmap.has(id)){
        const room = hashmap.get(id);
        const roomSockets = io.sockets.adapter.rooms.get(room);
        if (roomSockets) {
            const socketIds = Array.from(roomSockets);
            for(let i = 0;i<socketIds.length;i++){
                hashmap.delete(socketIds[i])
                const socket= io.sockets.sockets.get(socketIds[i]);
                if(socket){
                    io.to(socketIds[i]).emit("cancel","oponent disconnected go back to home page")
                    socket.disconnect();
                }
            }
          }
    }
}
export const setData = (a,b)=>{
    hashmap.set(a,b);   
}