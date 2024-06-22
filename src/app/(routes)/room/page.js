"use client";
import React, { useEffect, useState, useContext, useCallback } from "react";
import { socket } from "@/socket";
import { useRouter } from "next/navigation";
import { Inputs } from "@/components/gameComponents/Inputs";
import Clipboard from "@/components/gameComponents/Clipboard";
import Loader from "@/components/gameComponents/Loader";
import RoomId from "@/components/gameComponents/RoomId";
import { StateContext } from "@/components/StateContext";
export default function Page() {
  
  const { state, setState } = useContext(StateContext);
  const route = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [loading, setLoading] = useState(1);
  const [room,setRoom] = useState(null);
  const [gamePass, setGamePass] = useState({
    room: null,
    move: null,
  });
  const [turn, setTurn] = useState(null);
  const onConnect = () => {
    console.log("Socket connected" + socket.id);
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);
    setRoom(socket.id.slice(0, Math.floor(socket.id.length / 2)));
    socket.io.engine.on("upgrade", (transport) => {
      console.log("upgraded");
      setTransport(transport.name);
    });
  };
  const getGame = (room) => {
    socket.emit("enterRoom", room);
    setState(0);
  };
  useEffect(() => {

    if (socket.connected) onConnect();

    //Event listners
    socket.on("connect", onConnect);
    socket.on("roomJoined", (data) => {
      console.log(data);
      setGamePass({ room: data.room, move: data.move });
      setTurn(data.turn);
      setLoading(0);
      setState(0);
    });
    socket.on("roomFilled",()=>{
      alert("Room is full");
      route.push("/");
    })
    socket.on("noroom",()=>{
      alert("Room not found");
      route.push("/");
    })
    socket.on("cancel", (data) => {
      alert(data);
      route.push("/");
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);
  //use effect for creating new room
  useEffect(()=>{
    if(room!=null && state===1){
      socket.emit("newroom",room);
    }
  },[room])
  return (
    <div className=" w-screen h-screen justify-center items-center flex">
      {loading && state == 1 ? (
        <div className=" flex flex-col gap-[100px]">
          <Clipboard room={room} />
          <Loader />
        </div>
      ) : loading && state == 2 ? (
        <RoomId getGame={getGame} />
      ) : loading ? (
        <Loader />
      ) : (
        <Inputs
          socket={socket}
          gamePass={gamePass}
          turn={turn}
          setTurn={setTurn}
        />
      )}
    </div>
  );
}
