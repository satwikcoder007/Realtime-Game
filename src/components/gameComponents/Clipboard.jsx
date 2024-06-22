import React from 'react'
import { FaCopy } from "react-icons/fa6";
export default function Clipboard({room}) {
    console.log("room="+room);
    const copy = async()=>{
        try{
            await navigator.clipboard.writeText(room);
            alert("text copied");
        }
        catch(err){
            alert("failed to copy");
        }
    }
  return (
    <div className=' text-foreground flex justify-center items-center gap-3'>
        <span>{room}</span>
        <span><FaCopy className=' text-foreground cursor-pointer' onClick={()=>(copy())}/></span>
    </div>
  )
}
