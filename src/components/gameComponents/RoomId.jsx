
import React, { useState } from 'react'
import { Input } from '../ui/input'
import { Button } from '../ui/button';
export default function RoomId({getGame}) {
    const[room,setRoom] = useState("");

  return (
    <div className=' h-[300px] w-[700px] box-border bg-card border-2 border-card-foreground flex flex-col gap-3 justify-center items-center'>
        <Input type="text" className="w-[300px]" placeholder="Enter Room ID" onChange={(event)=>{setRoom(event.target.value)}}></Input>
        <Button onClick={()=>{getGame(room)}}>JOIN</Button>
    </div>
  )
}
