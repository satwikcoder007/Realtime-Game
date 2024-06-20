"use client"
import React,{useEffect,useState} from 'react'
import { socket } from '@/socket'
import { useRouter } from 'next/navigation'
import { Inputs } from '@/components/gameComponents/Inputs'
export default function page() {
  const route = useRouter();
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [loading,setLoading] = useState(1);
  const [gamePass,setGamePass] = useState({
    room:null,
    move:null,
  });
  const [turn,setTurn] = useState(null);

  const onConnect = () => {
    console.log("Socket connected" + socket.id);
    setIsConnected(true);
    setTransport(socket.io.engine.transport.name);

    socket.io.engine.on("upgrade", (transport) => {
      setTransport(transport.name);
    });
  };

  useEffect(() => {
    if (socket.connected) {
      onConnect();
     
    }
    socket.on("connect", onConnect);
    socket.on("roomJoined", (data) => {
     console.log(data);
     setGamePass({room:data.room,move:data.move})
     setTurn(data.turn);
     setLoading(0);
    });
    
    socket.on("cancel",(data)=>{
      console.log(data);
      route.push("/");
    })
    
    socket.emit("join");
    return () => {
      socket.disconnect();
    };
  }, []);
  
  return (
    <div className=' w-screen h-screen justify-center items-center flex'>
        {
          loading?<>Wating for your oponent</>:<Inputs socket = {socket} gamePass={gamePass} turn={turn} setTurn={setTurn} ></Inputs>
        }
    </div>
  )
}
