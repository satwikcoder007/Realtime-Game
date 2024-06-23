"use client"

import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/modetoggle'
import { useRouter } from 'next/navigation'
import { StateContext } from '@/components/StateContext'
import { useContext,useEffect } from 'react'
export default function Home() {
  console.log("inside home")
  const{setState} = useContext(StateContext);
  const route = useRouter();
  
  return (
    <div className=' h-screen w-screen flex  items-center bg-background flex-col mt-[100px] overflow-hidden gap-[50px]'>
      <div className=' text-foreground text-[30px] font-bold'>Tic-Tac-Toe</div>
      <div className=' flex'>
        <div className=' h-[300px] w-[700px] box-border bg-card border-2 border-card-foreground flex flex-col gap-3 justify-center items-center'>
          <Button onClick = {()=>{
            setState(0);
            route.push("/game")}}>Quick match</Button>
          <Button onClick = {()=>{
            setState(1);
            route.push("/room");
          }}>Create Room</Button>
          <Button onClick ={()=>{
            setState(2);
            route.push("/room");
          }}>  Join Room  </Button>
        </div>
        <span className=' -mt-[50px]'> <ModeToggle></ModeToggle></span>
      </div>
    </div>
  )
}

