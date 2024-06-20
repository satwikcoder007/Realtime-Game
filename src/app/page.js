import React from 'react'
import { Button } from '@/components/ui/button'
import { ModeToggle } from '@/components/modetoggle'
export default function Home() {
  return (
    <div className=' h-screen w-screen flex  items-center bg-background flex-col mt-[100px] overflow-hidden gap-[50px]'>
      <div className=' text-foreground text-[30px] font-bold'>Tic-Tac-Toe</div>
      <div className=' flex'>
        <div className=' h-[300px] w-[700px] box-border bg-card border-2 border-card-foreground flex flex-col gap-3 justify-center items-center'>
          <Button>Quick match</Button>
          <Button>Create Room</Button>
          <Button>  Join Room  </Button>
        </div>
        <span className=' -mt-[50px]'> <ModeToggle></ModeToggle></span>
      </div>
    </div>
  )
}

